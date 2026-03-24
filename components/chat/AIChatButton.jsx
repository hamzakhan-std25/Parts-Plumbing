'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, RefreshCw, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ChatMessage from './ChatMessage';

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // For new chat confirmation

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);







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

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (question) => {
    // const finalQuestion = question || inputValue.trim();

    // console.log("final question :", finalQuestion);

    // 1. Check if 'question' is an object (like a Click Event) and ignore it
    const textFromButton = typeof question === 'string' ? question : null;

    const finalQuestion = textFromButton || inputValue.trim();

    console.log("final question:", finalQuestion);

    if (!finalQuestion || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: finalQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    // console.log("Total messages :", messages);



    const historyForAI = messages
      .slice(-6)
      .map(({ role, content }) => ({ role, content }));

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        userQuestion: finalQuestion,
        history: historyForAI, // Array of {role, content}
      }),
    });
    const data = await res.json();
    const assistantMessage = {
      id: Date.now(),
      role: 'assistant',
      content: data.content,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);

    // AUTO-FOCUS BACK TO INPUT
    inputRef.current?.focus();

  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setShowConfirm(true); // Show inline confirmation
    } else {
      setMessages([]);
    }
  };

  const confirmNewChat = () => {
    setMessages([]);
    setShowConfirm(false);
  };

  const cancelNewChat = () => {
    setShowConfirm(false);
  };

  const handleClose = () => setIsOpen(false);

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
            onClick={toggleChat}
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
            className={`bg-white shadow-lg border border-gray-200 flex flex-col overflow-hidden ${isMobile ? 'w-full h-full rounded-none' : 'w-[360px] h-[70vh] rounded-xl'
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
                  onClick={handleNewChat}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Start New Chat"
                  title="Start New Chat"
                >
                  <RefreshCw size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={handleClose}
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
                        onClick={confirmNewChat}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={cancelNewChat}
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
                        onClick={() => handleSendMessage(item.query)}
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
                    <ChatMessage key={msg.id} message={msg} />
                    // <ChatMessage key={msg.id} message={msg} showWhatsApp={msg.role === 'assistant' && msg.content.includes
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
                  onClick={handleSendMessage}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}