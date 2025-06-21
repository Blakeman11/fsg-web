'use client';

import { useState } from 'react';
import Papa from 'papaparse';

export default function UploadMarketPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCards(results.data as any[]);
      },
    });
  };

  const handleUpload = async () => {
    if (!cards.length) return;
    setUploading(true);

    const cleaned = cards.map(({ available, ...rest }) => rest); // remove legacy field

    const res = await fetch('/api/admin/upload-market', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows: cleaned }), // ✅ corrected key here
    });

    setUploading(false);

    if (res.ok) {
      alert('✅ Cards uploaded!');
      setCards([]);
      setFileName(null);
    } else {
      alert('❌ Upload failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Market CSV</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="mb-4 block"
      />

      {fileName && (
        <div className="mb-4 text-sm text-gray-500">
          Loaded: {fileName} ({cards.length} cards)
        </div>
      )}

      {cards.length > 0 && (
        <>
          <div className="overflow-x-auto border rounded max-h-[400px] mb-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {Object.keys(cards[0]).map((key) => (
                    <th key={key} className="px-2 py-1 border">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cards.slice(0, 20).map((card, i) => (
                  <tr key={i}>
                    {Object.values(card).map((value, j) => (
                      <td key={j} className="px-2 py-1 border whitespace-nowrap">
                        {value as string}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            {uploading ? 'Uploading...' : 'Upload to Market'}
          </button>
        </>
      )}
    </div>
  );
}