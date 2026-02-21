import Link from 'next/link';
import Header from '@/components/layout/Header';
import Container from '@/components/layout/Container';
import { Frown } from 'lucide-react'; // Optional icon

export default function NotFound() {
  return (
    <>
      <Container className="py-20 text-center">
        <div className="max-w-md mx-auto">
          <Frown className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 – Page Not Found</h1>
          <p className="text-lg text-white mb-8">
            Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go Home
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:shadow-sm shadow-blue-500  transition-all"
            >
              Browse Products
            </Link>
          </div>

          {/* Search bar */}
          <form action="/products" method="GET" className="flex gap-2">
            <input
              type="text"
              name="search"
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Search
            </button>
          </form>

          {/* Contact option */}
          <p className="mt-8 text-sm text-gray-500">
            Still stuck?{' '}
            <a
              href="https://wa.me/923001234567"
              className="text-green-600 shadow-2xl hover:text-green-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with us on WhatsApp
            </a>
          </p>
        </div>
      </Container>
      {/* Optionally include your footer here */}
    </>
  );
}