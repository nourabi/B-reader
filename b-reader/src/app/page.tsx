// app/page.tsx
"use client";

import { useState, useRef } from 'react';
import ArticleLinkInput from './components/ArticleLinkInput';

export default function Home() {
  const [svg, setSvg] = useState('');
  const svgRef = useRef<HTMLDivElement>(null);

  const handlePlayBraille = () => {
    const container = svgRef.current;
    if (!container) return;

    const dots = container.querySelectorAll<HTMLElement>('.braille-dot');
    let index = 0;

    const playNext = () => {
      if (index >= dots.length) return;

      // Reset all dots
      dots.forEach(dot => dot.style.fill = 'black');
      // Highlight current dot
      dots[index].style.fill = 'red';

      // Haptic feedback
      const haptics = (navigator as any).haptics;
      if (haptics?.vibrate) {
        haptics.vibrate('micro'); // Chrome on Android 13+
      } else if (navigator.vibrate) {
        navigator.vibrate(50); // Fallback for most browsers
      }

      index++;
      setTimeout(playNext, 150); // Delay between Braille dots
    };

    playNext();
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Braille Generator</h1>

      <ArticleLinkInput onSvgGenerated={setSvg} />

      {svg && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Braille SVG Output</h2>
          
          {/* SVG output */}
          <div
            ref={svgRef}
            className="border rounded p-4 bg-white"
            dangerouslySetInnerHTML={{ __html: svg }}
          />

          {/* Play button */}
          <button
            onClick={handlePlayBraille}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Play Braille Vibration
          </button>
        </div>
      )}
    </main>
  );
}
