'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, RefreshCw, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import SupportForm from './SupportForm';
import { useDebouncedClick } from '@/hooks/useDebouncedClick';
import { summarizeHistory } from '@/utils/ai-helpers';

const uuidv4 = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function AIChatButton() {
  const SUMMARY_TRIGGER_LENGTH = 14;
  const RECENT_HISTORY_KEEP_COUNT = 6;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(() => uuidv4());
  const [inputValue, setInputValue] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // For new chat confirmation
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportTargetMessageId, setSupportTargetMessageId] = useState(null);
  const [hasShownWhatsApp, setHasShownWhatsApp] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [lastSummary, setLastSummary] = useState(null);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const supportFormTimeoutRef = useRef(null);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout ensures the DOM is fully rendered before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }

  }, [isOpen]);

  // Refocus input after AI response completes and input is enabled again.
  useEffect(() => {
    if (isOpen && !isLoading) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoading]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const resetConversation = () => {
    if (supportFormTimeoutRef.current) {
      clearTimeout(supportFormTimeoutRef.current);
      supportFormTimeoutRef.current = null;
    }
    setMessages([]);
    setChatHistory([]);
    setLastSummary(null);
    setConversationId(uuidv4());
    setShowConfirm(false);
    setShowSupportForm(false);
    setSupportTargetMessageId(null);
    setHasShownWhatsApp(false);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const handleFeedback = async (messageId, type) => {

    // 1. Optimistically update local UI state
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, feedback: type }
          : message
      )
    );

    if (supportFormTimeoutRef.current) {
      clearTimeout(supportFormTimeoutRef.current);
      supportFormTimeoutRef.current = null;
    }

    if (type === 'dislike') {
      setSupportTargetMessageId(messageId);
      setShowSupportForm(false);
      supportFormTimeoutRef.current = setTimeout(() => {
        setShowSupportForm(true);
      }, 2000);

      if (!hasShownWhatsApp) {
        setHasShownWhatsApp(true);
      }
    }



    console.log('Feedback captured', {
      conversationId,
      messageId,
      feedback: type,
    });

    // // 2. Sync with database
    try {
      await fetch(`/api/conversations/${conversationId}/messages/${messageId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: type }),
      });
    } catch (err) {
      console.error("Feedback failed to save", err);
      // Optionally: Rollback local state if API fails
    }


  };

  useEffect(() => {
    return () => {
      if (supportFormTimeoutRef.current) {
        clearTimeout(supportFormTimeoutRef.current);
      }
    };
  }, []);

  const buildHistoryPayload = async (history, summary) => {
    let nextSummary = summary;
    let compactedRecentHistory = history;

    if (history.length > SUMMARY_TRIGGER_LENGTH) {
      const keepStartIndex = Math.max(history.length - RECENT_HISTORY_KEEP_COUNT, 0);
      const olderHistory = history.slice(0, keepStartIndex);
      compactedRecentHistory = history.slice(keepStartIndex);

      const summaryInput = nextSummary ? [nextSummary, ...olderHistory] : olderHistory;
      const summarizedHistory = await summarizeHistory(summaryInput);

      if (Array.isArray(summarizedHistory) && summarizedHistory.length > 0) {
        nextSummary = summarizedHistory[0];
      } else {
        // If summary fails, keep full history so context is not lost.
        compactedRecentHistory = history;
      }
    }

    const payload = nextSummary
      ? [nextSummary, ...compactedRecentHistory]
      : compactedRecentHistory;

    return {
      payload,
      compactedRecentHistory,
      nextSummary,
    };
  };

  const handleSendMessage = async (question) => {

    // 1. Check if 'question' is an object (like a Click Event) and ignore it
    const textFromButton = typeof question === 'string' ? question : null;

    const finalQuestion = textFromButton || inputValue.trim();

    console.log("final question:", finalQuestion);

    if (!finalQuestion || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: finalQuestion,
      feedback: null,
      conversationId,
    };

    // Updates the full message objects for your UI
    setMessages((prev) => [...prev, userMessage]);


    const {
      payload: historyForApi,
      compactedRecentHistory,
      nextSummary,
    } = await buildHistoryPayload(chatHistory, lastSummary);

    if (nextSummary && nextSummary !== lastSummary) {
      setLastSummary(nextSummary);
    }

    setInputValue('');
    setIsLoading(true);

    if (chatHistory.length > SUMMARY_TRIGGER_LENGTH) {
      console.log('chatHistory length exceeded 14. Using summarized payload.', {
        originalLength: chatHistory.length,
        payloadLength: historyForApi.length,
      });
    }

    console.log("---------------history for api :", historyForApi)
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          conversationId,
          userQuestion: finalQuestion,
          history: historyForApi,
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat request failed with status ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage = {
        id: data.id || uuidv4(),
        role: 'assistant',
        content: data.content || 'I could not generate a response right now. Please try again.',
        feedback: null,
        conversationId,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      const nextHistoryAfterAssistant = [
        ...compactedRecentHistory,
        { role: userMessage.role, content: userMessage.content },
        { role: assistantMessage.role, content: assistantMessage.content },
      ];

      setChatHistory(nextHistoryAfterAssistant);
    } catch (error) {
      console.error('Failed to send chat message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Sorry, I ran into an issue while generating a response. Please try again.',
          feedback: null,
          conversationId,
        },
      ]);
    } finally {
      setIsLoading(false);
    }

  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      debouncedSendMessage();
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setShowConfirm(true); // Show inline confirmation
    } else {
      resetConversation();
    }
  };

  const confirmNewChat = () => {
    resetConversation();
  };

  const cancelNewChat = () => {
    setShowConfirm(false);
  };

  const handleClose = () => setIsOpen(false);

  const debouncedToggleChat = useDebouncedClick(toggleChat, 250);
  const debouncedNewChat = useDebouncedClick(handleNewChat, 300);
  const debouncedCloseChat = useDebouncedClick(handleClose, 250);
  const debouncedConfirmNewChat = useDebouncedClick(confirmNewChat, 300);
  const debouncedCancelNewChat = useDebouncedClick(cancelNewChat, 250);
  const debouncedSendMessage = useDebouncedClick((question) => {
    handleSendMessage(question);
  }, 400);
  const debouncedFeedback = useDebouncedClick((messageId, type) => {
    handleFeedback(messageId, type);
  }, 400);

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 bg-gray-100 px-4 py-2 rounded-lg">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
      </div>
    </div>
  );

  // Animation variants
  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 30 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } }
  };

  const panelVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { scale: 0.8, opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  // Determine outer container classes for mobile full-screen
  const containerClasses = isOpen && isMobile
    ? 'fixed inset-0 z-50'
    : 'fixed bottom-6 right-6 z-50';


  // Define your common questions (labels only)
  const SUGGESTIONS = [
    { label: "📦 Track Order", query: "How can I track my plumbing order?" },
    { label: "🛡️ Warranty", query: "What is the warranty on electronics?" },
    { label: "🔄 Returns", query: "Can I return an item after 14 days?" },
    { label: "📜 Privacy", query: "How do you handle my personal data?" },
  ];

  return (
    <div className={containerClasses}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Floating button
          <motion.button
            key="floating-button"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={debouncedToggleChat}
            className="group relative w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 hover:scale-110 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Open AI Chat"
          >
            <Sparkles size={28} />
            {/* Optional: Tooltip that appears on hover */}
            <span className="absolute right-16 bg-white text-gray-800 text-sm p-4 font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Need help? Chat with us!
            </span>

          </motion.button>
        ) : (
          // Expanded panel
          <motion.div
            key="chat-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative bg-white shadow-lg border border-gray-200 flex flex-col overflow-hidden ${isMobile ? 'w-full h-full rounded-none' : 'w-[360px] h-[70vh] rounded-xl'
              }`}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="font-semibold text-gray-800">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={debouncedNewChat}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Start New Chat"
                  title="Start New Chat"
                >
                  <RefreshCw size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={debouncedCloseChat}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Close Chat"
                  title="Close"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Confirmation Bar */}
            <AnimatePresence>
              {showConfirm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-yellow-50 border-b border-yellow-200"
                >
                  <div className="px-4 py-2 flex items-center justify-between text-sm text-yellow-800">
                    <span>Start a new chat? Current messages will be lost.</span>
                    <div className="flex gap-2">
                      <button
                        onClick={debouncedConfirmNewChat}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={debouncedCancelNewChat}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 ? (

                <div className="flex flex-col items-center justify-center h-full text-center">
                  {/* Optional greeting */}
                  <div className="p-4 bg-blue-50 rounded-full mb-4 animate-bounce">
                    <Bot size={40} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Al-Saqar Assistant</h3>
                  <p className="text-sm text-gray-500 mb-8 px-10">
                    Hi! How can I help with your plumbing needs?
                  </p>

                  {/* INLINE SUGGESTIONS */}
                  <div className="flex flex-wrap justify-center gap-2 px-4">
                    {SUGGESTIONS.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => debouncedSendMessage(item.query)}
                        className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )




                // -------------------------
                // (
                // // Welcome message
                // <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                //   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                //     <Bot size={32} className="text-blue-600" />
                //   </div>
                //   <p className="text-gray-600 text-sm">
                //     Hi! I'm your AI Assistant.<br />
                //     Ask me about plumbing parts!
                //   </p>
                // </div>
                // )
                : (
                  messages.map((msg) => (
                    <div key={msg.id}>
                      <ChatMessage
                        message={msg}
                        onFeedback={debouncedFeedback}
                        showWhatsApp={hasShownWhatsApp && supportTargetMessageId === msg.id}
                      />
                    </div>
                  ))
                )}
              {/* Typing indicator */}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about plumbing parts..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={debouncedSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 ${inputValue.trim() && !isLoading
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  aria-label="Send Message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showSupportForm && supportTargetMessageId && (
                <SupportForm
                  messageId={supportTargetMessageId}
                  onClose={() => setShowSupportForm(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}