import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { base64Data, mimeType } = JSON.parse(event.body || '{}');

    if (!base64Data || !mimeType) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing base64Data or mimeType' }) };
    }

    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'VOTRE_CLE_GEMINI_ICI') {
      return { statusCode: 500, body: JSON.stringify({ error: 'Gemini API key is not configured on the server.' }) };
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
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      };
    }
    
    throw new Error('Failed to parse JSON from Gemini response');
  } catch (error: any) {
    console.error('Error in extract-cv:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' })
    };
  }
};

export { handler };
