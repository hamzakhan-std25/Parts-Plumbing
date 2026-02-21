// components/search/SearchOverlay.jsx
'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearch } from '@/hooks/useSearch';

export default function SearchOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const inputRef = useRef(null);
  const { query, setQuery, suggestions, isLoading, submitSearch } = useSearch();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Search Panel (slides from top) */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 bg-white shadow-xl z-50 rounded-b-2xl border-b"
            ref={overlayRef}
          >
            <div className="container mx-auto px-4 py-6">
              {/* Search Form */}
              <form onSubmit={submitSearch} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for pipes, fittings, valves..."
                  className="w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-50"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                {isLoading && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin" />
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 border-t pt-4"
                >
                  <p className="text-xs text-gray-500 mb-2">Suggestions</p>
                  <ul className="space-y-2">
                    {suggestions.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={onClose}
                          className="block px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}