// app/api/generate-braille/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.NVAPI_KEY || '',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

export async function POST(req: NextRequest) {
   const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

   try {
//     // --- First prompt: extract website content ---
//     const response1 = await openai.chat.completions.create({
//       model: "meta/llama3-8b-instruct",
//       messages: [{
//         role: "user",
//         content: `VISIT WEBSITE: ${url}
// TASKS:
// 1. Extract main content, ignoring ads and non-essential elements
// 2. Describe any relevant images in text format
// 3. Structure the information clearly

// RETURN FORMAT:
// Cleaned text content with image descriptions`,
//       }],
//       temperature: 0.1,
//       max_tokens: 2000,
//     });

//     const extractedText = response1.choices[0].message.content || '';

//     // --- Second prompt: convert to Braille SVG ---
//     const response2 = await openai.chat.completions.create({
//       model: "meta/llama3-8b-instruct",
//       messages: [{
//         role: "user",
//         content: `CONVERT THE FOLLOWING TEXT INTO BRAILLE, RETURN THE RESULT AS A SVG FILE:\n\n${extractedText}\n\n
// REQUIREMENTS:
// 1. Convert ALL the text in braille format
// 2. Create valid SVG markup with <svg> tags
// 3. Maintain readable line structure
// 4. Set appropriate viewBox dimensions`,
//       }],
//       temperature: 0.1,
//       max_tokens: 2000,
//     });

//     const svg = response2.choices[0].message.content || '';

      // CALLING THE MOCK FUNCTION INSTEAD of API 
      const svg = mockGenerateBrailleSvg(url);

    return NextResponse.json({ svg });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }

  // Mock function to return the SVG content
function mockGenerateBrailleSvg(url: string): string {
  console.log(`Mocking Braille SVG generation for URL: ${url}`);
  return `
    <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="50" font-size="24" font-family="braille">
        <tspan x="0" y="0">⠃⠽⠊⠎⠑⠊⠎</tspan>
        <tspan x="0" y="30">⠃⠽⠊⠎⠑⠊⠎</tspan>
      </text>
    </svg>
  `;
}
}
