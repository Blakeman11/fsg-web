'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { href: '/joshandsk', label: 'Market' },
    { href: '/joshandsk/submissions', label: 'Submissions' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-4 border-b pb-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`text-sm font-medium pb-1 border-b-2 ${
              pathname === tab.href
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}