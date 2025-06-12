'use client';

import Link from 'next/link';

export default function GradingInfoPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">🏆 Freedom Service Grading Criteria</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📐 Centering (Front)</h2>
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">Tolerance</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">10+ (Gem)</td><td className="border px-4 py-2">50/50 to 52/48</td></tr>
            <tr><td className="border px-4 py-2">10</td><td className="border px-4 py-2">50/50 to 55/45</td></tr>
            <tr><td className="border px-4 py-2">9</td><td className="border px-4 py-2">56/44 to 60/40</td></tr>
            <tr><td className="border px-4 py-2">8</td><td className="border px-4 py-2">61/39 to 65/35</td></tr>
            <tr><td className="border px-4 py-2">7</td><td className="border px-4 py-2">66/34 to 70/30</td></tr>
            <tr><td className="border px-4 py-2">6</td><td className="border px-4 py-2">71/29 to 75/25</td></tr>
            <tr><td className="border px-4 py-2">5</td><td className="border px-4 py-2">76/24 to 80/20</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📦 Centering (Back)</h2>
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">Tolerance</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">10</td><td className="border px-4 py-2">Up to 70/30</td></tr>
            <tr><td className="border px-4 py-2">9</td><td className="border px-4 py-2">Up to 80/20</td></tr>
            <tr><td className="border px-4 py-2">8</td><td className="border px-4 py-2">Up to 85/15</td></tr>
            <tr><td className="border px-4 py-2">7</td><td className="border px-4 py-2">Up to 90/10</td></tr>
            <tr><td className="border px-4 py-2">6 or lower</td><td className="border px-4 py-2">Over 90/10</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">✂️ Corners</h2>
        <ul className="list-disc pl-6 text-sm">
          <li><strong>10+:</strong> Perfect corners under magnification</li>
          <li><strong>9:</strong> One tiny imperfection (e.g., micro nick)</li>
          <li><strong>8:</strong> Slightly rounded or minor wear</li>
          <li><strong>7:</strong> Multiple flaws or visible wear</li>
          <li><strong>6 or lower:</strong> Major dings or crushed corners</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">✨ Surface</h2>
        <ul className="list-disc pl-6 text-sm">
          <li><strong>10:</strong> Flawless</li>
          <li><strong>9:</strong> Tiny print dot or faint scratch</li>
          <li><strong>8:</strong> Minor surface wear or light print lines</li>
          <li><strong>7:</strong> Surface scratch, print defect, or dimpling</li>
          <li><strong>6 or lower:</strong> Significant issues like creases or surface loss</li>
        </ul>
      </section>

      <p className="text-center text-gray-500 text-sm pt-10">
        Want to see this in action? Try our Self-Grading Tool or visit the Submission page to begin.
      </p>
    </main>
  );
}