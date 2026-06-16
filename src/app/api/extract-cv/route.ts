import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { base64Data, mimeType } = await req.json();

    if (!base64Data || !mimeType) {
      return NextResponse.json({ error: 'Missing base64Data or mimeType' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Tu es un expert en recrutement. Analyse ce CV (image ou PDF) et extrait les informations suivantes au format JSON uniquement :
  {
    "firstName": "Prénom",
    "lastName": "Nom ou initiale",
    "title": "Intitulé du poste recherché ou actuel",
    "sector": "Secteur d'activité",
    "summary": "Un court résumé professionnel de 2-3 phrases",
    "availability": "Disponibilité si mentionnée (sinon 'A préciser')",
    "experience": "Nombre d'années d'expérience",
    "skills": ["Compétence 1", "Compétence 2"],
    "languages": ["Langue 1"]
  }
  Ne réponds que le JSON, rien d'autre.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Clean JSON if needed
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return NextResponse.json(parsed);
    }
    
    throw new Error('Failed to parse JSON from Gemini response');
  } catch (error: any) {
    console.error('Error in extract-cv route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
