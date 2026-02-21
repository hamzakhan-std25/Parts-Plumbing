'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, RefreshCw, X, Send } from 'lucide-react';

/**
 * AIChatButton - A compact, expandable AI chat widget
 * 
 * Features:
 * - Floating button anchored at bottom-right (desktop: 56px circle, mobile: full screen when expanded)
 * - Desktop: 360x500px panel, Mobile: full viewport
 * - Smooth animations using Framer Motion
 * - Message history, send/clear functionality
 * - Escape key to close
 * - Focus management for accessibility
 */
export default function AIChatButton() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle escape key to close panel
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle panel open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response after a brief delay
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        text: "Can't answer now! I am under development.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear all messages (start new chat)
  const handleNewChat = () => {
    setMessages([]);
  };

  // Close panel
  const handleClose = () => {
    setIsOpen(false);
  };

  // Animation variants for the floating button
  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Animation variants for the panel
  const panelVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  // Desktop panel styles (fixed at bottom-right)
  const desktopPanelStyles = isMobile 
    ? 'inset-0 w-full h-full rounded-xl'
    : 'bottom-6 right-6 w-[360px] h-[70vh] rounded-xl';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Floating Button (Collapsed State)
          <motion.button
            key="floating-button"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleChat}
            className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 hover:scale-110 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Open AI Chat"
          >
            <Sparkles size={28} />
          </motion.button>
        ) : (
          // Expanded Panel
          <motion.div
            key="chat-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-white shadow-lg border border-gray-200 flex flex-col overflow-hidden ${desktopPanelStyles}`}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
              <div className="flex items-center gap-3">
                {/* AI Icon - moves to top-left when panel is open */}
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="font-semibold text-gray-800">AI Assistant</span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Refresh Button - Start New Chat */}
                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Start New Chat"
                  title="Start New Chat"
                >
                  <RefreshCw size={20} className="text-gray-600" />
                </button>
                
                {/* Close Button */}
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

            {/* Chat Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 ? (
                // Empty state / Welcome message
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot size={32} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Hi! I'm your AI Assistant.<br />
                    Ask me about plumbing parts!
                  </p>
                </div>
              ) : (
                // Message list
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'ai' && (
                      // AI Avatar
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 shrink-0">
                        <Sparkles size={16} className="text-white" />
                      </div>
                    )}
                    
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white rounded-lg'
                          : 'bg-gray-100 text-gray-800 rounded-lg'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))
              )}
              {/* Invisible element for auto-scrolling */}
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
                  disabled={false}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    inputValue.trim()
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
