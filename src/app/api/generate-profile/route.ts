import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `Analyze the content of the website: ${url}.
    Extract the following company profile information.
    Return the response ONLY as a valid JSON object with the specified structure.

    JSON Structure:
    {
      "company_name": "string",
      "company_description": "string",
      "service_line": ["string", "string"],
      "tier1_keywords": ["string", "string"],
      "tier2_keywords": ["string", "string"],
      "emails": ["string", "string"],
      "poc": "string" 
    }

    Field Definitions:
    - company_name: Official name of the company.
    - company_description: A brief, concise description of the company's main activities and offerings.
    - service_line: The primary service or product line of the company. If multiple are present, try to summarize or pick the most prominent one.
    - tier1_keywords: 3-5 keywords that this company would typically use to search for public government opportunities. Examples: (solar would be a good keyword for a company that sells solar pannels)
    - tier2_keywords: 5-10 keywords that this company MIGHT use to search for government opportunities, broader or related terms.
    - emails: An array of contact email addresses found on the website. If multiple, list them. If none, an empty array.
    - poc: A primary point of contact name, if clearly identifiable on the website. If none, null.

    If information for a field is not explicitly found, use 'null' for string fields or '[]' (an empty array) for array fields to maintain the JSON structure.
    Ensure the response is ONLY the JSON object, without any additional text or formatting outside the JSON.`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let textResponse = response.text();

    if (textResponse.startsWith('```json')) {
      textResponse = textResponse.substring(7, textResponse.lastIndexOf('```'));
    }

    const profileData = JSON.parse(textResponse);

    return NextResponse.json({ profile: profileData });

  } catch (error: unknown) {
    console.error('Error to generate profile with Gemini:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (error instanceof SyntaxError && errorMessage.includes('JSON')) {
        return NextResponse.json(
            { error: 'Fail to process a response with Gemini (JSON invalid). Try again.', details: errorMessage },
            { status: 500 }
        );
    }
    return NextResponse.json(
      { error: 'Fail to generate profile with gemini', details: errorMessage},
      { status: 500 }
    );
  }
}