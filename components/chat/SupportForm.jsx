'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SupportForm({ messageId, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        onClose();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-30 flex items-end justify-center bg-black/35 p-3 sm:items-center"
      onClick={onClose}
      aria-live="polite"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl border border-blue-100 bg-white p-4 shadow-xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-800">Need more help?</h4>
            <p className="mt-1 text-xs text-gray-500">Share your details and our support team will follow up.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close support form"
          >
            Close
          </button>
        </div>

        {submitted ? (
          <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
            {/* Thanks. Your request for message ID {messageId} has been captured. */}
            Thanks. Your support request has been captured. Our team will follow up soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query"
              rows={3}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Submit Support Request
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
