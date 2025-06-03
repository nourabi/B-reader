"use client"; // Add this directive at the top


import axios from "axios";
import { useState } from "react";

interface ArticleLinkInputProps {
  onFlashcards: (flashcards: any[]) => void; // Explicitly type the onFlashcards prop
}


export default function ArticleLinkInput({ onFlashcards }: ArticleLinkInputProps) {
  const [link, setLink] = useState('');
  
  const fetchFromLink = async () => {
    const res = await axios.post('/api/url', { link });
    onFlashcards(res.data.flashcards);
  };

  return (
    <div className="mt-4">
      <input
        className="border p-2 w-full"
        placeholder="Paste article URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={fetchFromLink} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Generate</button>
    </div>
  );
}
