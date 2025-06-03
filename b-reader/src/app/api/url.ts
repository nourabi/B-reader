import OpenAI from 'openai';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize OpenAI client with NVIDIA API
const openai = new OpenAI({
  apiKey: process.env.NVAPI_KEY || '',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function generateBrailleSvg(url: string): Promise<string> {
  // First prompt: Website processing
  const prompt1 = `VISIT WEBSITE: ${url}
  TASKS:
  1. Extract main content, ignoring ads and non-essential elements
  2. Describe any relevant images in text format
  3. Structure the information clearly
  
  RETURN FORMAT:
  Cleaned text content with image descriptions`;

  const response1 = await openai.chat.completions.create({
    model: "meta/llama3-8b-instruct",
    messages: [{ role: "user", content: prompt1 }],
    temperature: 0.1,
    max_tokens: 2000,
  });

  const extractedText = response1.choices[0].message.content || '';

  // Second prompt: Braille conversion
  const prompt2 = `CONVERT THE FOLLOWING TEXT INTO BRAILLE, RETURN THE RESULT AS A SVG FILE:\n\n${extractedText}\n\n
  REQUIREMENTS:
  1. Convert ALL the text in braille format
  2. Create valid SVG markup with <svg> tags
  3. Maintain readable line structure
  4. Set appropriate viewBox dimensions`;

  const response2 = await openai.chat.completions.create({
    model: "meta/llama3-8b-instruct",
    messages: [{ role: "user", content: prompt2 }],
    temperature: 0.1,
    max_tokens: 2000,
  });

  return response2.choices[0].message.content || '';
}

function saveSvg(svgContent: string, filename: string = "output.svg"): void {
  fs.writeFileSync(filename, svgContent, 'utf-8');
  console.log(`SVG saved as ${filename}`);
}

async function main() {
  // Verify API key is loaded
  if (!process.env.NVAPI_KEY) {
    console.error('Error: NVAPI_KEY not found in .env.local');
    process.exit(1);
  }

  const targetUrl = "https://example.com";  // Replace with your URL
  try {
    const svgOutput = await generateBrailleSvg(targetUrl);
    saveSvg(svgOutput);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

main();