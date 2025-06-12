'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cart = [] } = useCart(); // ✅ fallback to empty array

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-black hover:opacity-80">
        <Image src="/flag-icon.png" alt="Flag" width={24} height={24} />
        Freedom Service Grading
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        <Link href="/market" className="hover:text-blue-600">Marketplace</Link>
        <Link href="/submit" className="hover:text-blue-600">Submit a Card</Link>
        <Link href="/mailing" className="hover:text-blue-600">Mailing Details</Link>
        <Link href="/grading" className="hover:text-blue-600">Grading Info</Link>
        <Link href="/comps" className="hover:text-blue-600">Comps</Link>
        <Link href="/checkout" className="relative hover:text-blue-600">
          View Cart
          {cart.length > 0 && (
            <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}