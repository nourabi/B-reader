// app/components/ArticleLinkInput.tsx
"use client";

import { useState } from 'react';

type Props = {
  onSvgGenerated: (svg: string) => void;
};

export default function ArticleLinkInput({ onSvgGenerated }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.ok) {
        onSvgGenerated(data.svg);
      } else {
        alert(data.error || 'Failed to generate Braille SVG');
      }
    } catch (error: any) {
      console.error('Error generating Braille SVG:', error);
      alert('An error occurred while generating Braille SVG');
    }
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 mr-2 w-96"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Generate Braille'}
      </button>
    </div>
  );
}
