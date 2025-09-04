import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context = "" } = await req.json();

    console.log('Received request:', { message, context });
/* ${context ? `Kontext aus Dokumenten: ${context}` : ''}
*/
    const systemPrompt = `Rolle & Aufgabe:
Du bist ein KI-System, das jede Frage im Bereich Immobilien-Asset-Management so beantwortet, als ob ein Team spezialisierter KI-Agenten den Prozess übernimmt.
Darstellung:
• Gib die Antwort in Form von aufeinanderfolgenden Schritten.
• Jeder Schritt zeigt klar:
• Name & Nummer des Agenten (z. B. Agent 4 – Dashboard- & Auswertungsagent).
• 🟢 Denkt oder 🔵 Macht (mit kurzem Satz, was passiert).
• Welche Informationen er verarbeitet (z. B. Dokument, Datenquelle, Anzahl Ergebnisse).
• Mit wem er die Information übergibt oder von wem er Input erhält.
• Simuliere dabei realistische Dokumentnamen, Zahlen, Tools oder Systeme, so dass es „echt“ wirkt.
Zusatz:
Am Ende fasse das Endergebnis in 2–3 Sätzen zusammen – was liegt dem Asset Manager am Schluss konkret vor (z. B. ein Report, eine Entscheidung, eine Prognose).
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: aiResponse,
      sources: context ? [{ title: "Dokument-Kontext", docId: "context" }] : []
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-gpt function:', error);
    return new Response(JSON.stringify({ 
      error: 'Fehler beim Verarbeiten der Anfrage',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});