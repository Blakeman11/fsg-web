'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-center">
      <h1 className="text-4xl font-bold text-blue-700">Welcome to Freedom Service Grading</h1>
      <p className="text-lg text-gray-700">
        Fast, fair, and honest card grading from real collectors. Start by exploring our marketplace or submitting your own cards today.
      </p>

      {/* 🪴 Come Grow With Us */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🌱 Come Grow With Us</h2>
        <p className="text-gray-700 text-base">
          We’re just getting started. Freedom Service Grading is committed to becoming a trusted, transparent, and community-driven grading partner.
          As we expand, new cards will be added to the marketplace daily, and new tools will empower collectors of all kinds.
          Whether you're a seasoned investor or ripping your first pack, you’ve got a place here.
        </p>
      </section>

      <div className="flex justify-center gap-6 mt-10">
        <Link href="/market" className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
          Explore Marketplace
        </Link>
        <Link href="/submit" className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 transition">
          Submit a Card
        </Link>
      </div>

      {/* 🇺🇸 Veteran Owned */}
      <footer className="mt-20 border-t pt-6 text-sm text-gray-600">
        🇺🇸 <strong>Proudly Veteran Owned</strong> — Integrity, precision, and service. It’s more than grading, it’s a mission.
      </footer>
    </main>
  );
}