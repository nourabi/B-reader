"use client";

import { useState } from 'react';
import ArticleLinkInput from './components/ArticleLinkInput';

export default function Home() {
  const [flashcards, setFlashcards] = useState<any[]>([]);

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Braille Generator</h1>
      <ArticleLinkInput onFlashcards={setFlashcards} />
     
    </main>
  );
}