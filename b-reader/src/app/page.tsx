// app/page.tsx or app/home/page.tsx (depending on your setup)
"use client";

import { useState } from 'react';
import ArticleLinkInput from './components/ArticleLinkInput';

export default function Home() {
  const [svg, setSvg] = useState('');

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Braille Generator</h1>
      <ArticleLinkInput onSvgGenerated={setSvg} />
      {svg && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Braille SVG Output</h2>
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      )}
    </main>
  );
}
