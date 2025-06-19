'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Header() {
  const { cart = [] } = useCart();

  return (
    <header className="w-full bg-white shadow-md px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-black hover:opacity-80">
        <Image src="/flag-icon.png" alt="Freedom Service Grading logo" width={24} height={24} />
        Freedom Service Grading
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link href="/market" className="hover:text-blue-600">Marketplace</Link>
        <Link href="/submit" className="hover:text-blue-600">Submit a Card</Link>
        <Link href="/mailing" className="hover:text-blue-600">Mailing Details</Link>
        <Link href="/grading" className="hover:text-blue-600">Grading Info</Link>
        <Link href="/comps" className="hover:text-blue-600">Comps</Link>
        <Link href="/cart" className="relative hover:text-blue-600">
          View Cart
          {cart.length > 0 && (
            <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-black" />
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-6 text-sm">
              <Link href="/market">Marketplace</Link>
              <Link href="/submit">Submit a Card</Link>
              <Link href="/mailing">Mailing Details</Link>
              <Link href="/grading">Grading Info</Link>
              <Link href="/comps">Comps</Link>
              <Link href="/cart" className="relative">
                View Cart
                {cart.length > 0 && (
                  <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                    {cart.length}
                  </span>
                )}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}