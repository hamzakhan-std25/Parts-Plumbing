import Link from "next/link";
import { SITE_NAME } from "@/constants/config";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900">
          {SITE_NAME}
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}