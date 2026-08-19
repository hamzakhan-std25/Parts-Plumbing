'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Subscribe() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Account created successfully!');
      } else {
        toast.error('Failed to save changes.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setEmail(''); // Clear the input field after submission
    }
  };
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
      action={handleSubscribe}
    >
      <input
        type="email"
        required
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 bg-slate-800 border border-slate-600 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
