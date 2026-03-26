import { NextResponse } from 'next/server';
import axios from 'axios';
import { logChatMetric } from '@/utils/logger';

const GEN_AI_URL = process.env.GEN_AI_URL
const GEN_AI_API_KEY = process.env.GEN_AI_API_KEY
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL
const EMBEDDING_MODEL_API_KEY = process.env.EMBEDDING_MODEL_API_KEY
const EMBEDDING_DIMENSION = 768; // Ensure this matches your model's output
const PINECONE_HOST = process.env.PINECONE_HOST
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;


async function getEmbedding(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${EMBEDDING_MODEL_API_KEY}`;

  const res = await axios.post(url, {
    model: EMBEDDING_MODEL,
    content: { parts: [{ text }] },
    // This line is the fix!
    outputDimensionality: EMBEDDING_DIMENSION
  });

  return res.data.embedding.values;
}



export async function POST(req) {
  const requestStartTime = Date.now();

  console.log("Received request at /api/chat");


  try {
    const { userQuestion, history } = await req.json();
    console.log("User Question:", userQuestion);
    console.log("Chat History:", history.slice(-4));

    // 1. EMBED the user's question (Match your seeding dimension!)
    const queryVector = await getEmbedding(userQuestion);

    // 2. QUERY Pinecone via REST API (Bypassing SDK issues)
    const pineconeRes = await axios.post(`${PINECONE_HOST}/query`, {
      vector: queryVector,
      topK: 3,
      includeMetadata: true
    }, {
      headers: { 'Api-Key': PINECONE_API_KEY }
    });

    // 2. FILTER and JOIN the results
    // Only keep matches with a score > 0.5
    const relevantMatches = pineconeRes.data.matches.filter(match => match.score > 0.6);

    console.log("Relevant findings:", relevantMatches.length);
    console.log("Relevant documents:", relevantMatches);

    const retrievedContext = relevantMatches.length > 0
      ? relevantMatches.map(m => {
        // We combine the text and the URL into a single "fact" for the AI
        const text = m.metadata.text;
        const url = m.metadata.url || "";
        return `CONTENT: ${text}\nSOURCE URL: ${url}`;
      }).join("\n\n---\n\n")
      : "No relevant information found in the knowledge base.";

    // 1. Define your Static Context (or fetch from WordPress here)
    const systemPrompt = `You are the Al-Saqar Plumbing Support Bot.
                    RULES: 
                    1. Use this KNOWLEDGE to answer: "${retrievedContext}"
                    2. If the knowledge doesn't answer the user, suggest WhatsApp contact.
                    3. Be polite and concise.`;


    // 2. Build the messages array (System + History + New Question)
    const messages = [
      { role: "system", content: systemPrompt },
      ...history, // Previous messages from the UI
      { role: "user", content: userQuestion }
    ];

    // 3. Call Groq
    const response = await fetch(GEN_AI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEN_AI_API_KEY}`, // Keep key in .env
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Use a valid Groq model name
        messages: messages,
        temperature: 0.2,
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    const assistantMessage = data?.choices?.[0]?.message || { role: 'assistant', content: '' };
    const assistantResponseText = assistantMessage?.content || '';
    const responseTime = Date.now() - requestStartTime;
    const tokensUsed = data?.usage?.total_tokens ?? null;

    const metricResult = await logChatMetric(
      userQuestion,
      assistantResponseText,
      relevantMatches,
      responseTime,
      tokensUsed,
      'groq-llama-3'
    );

    if (!metricResult.success) {
      console.warn('Metric logging failed:', metricResult.error);
    }

    return NextResponse.json(assistantMessage);

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
