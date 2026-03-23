import { NextResponse } from 'next/server';
import axios from 'axios';

const PINECONE_HOST = "https://plumbing-knowledge-oit34d7.svc.aped-4627-b74a.pinecone.io";
const GEMINI_API_KEY = "AIzaSyCpBjMJ3l7iFv064b41wEPjQqYUETo_jSs"
const PINECONE_API_KEY = "pcsk_uTg61_AQ9g8NkQwZ4vtwuMcev4cHYNARj57JgchorD3kb1VyyDQKPfjy2nXrdgiRcBn4j";


async function getEmbedding(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`;

  const res = await axios.post(url, {
    model: "models/gemini-embedding-001",
    content: { parts: [{ text }] },
    // This line is the fix!
    outputDimensionality: 768
  });

  return res.data.embedding.values;
}



export async function POST(req) {

  console.log("Received request at /api/chat");


  try {
    const { userQuestion, history } = await req.json();
    // console.log("User Question:", userQuestion);
    console.log("Chat History:", history);

    // 1. EMBED the user's question (Match your seeding dimension!)
    const queryVector = await getEmbedding(userQuestion);

    // const queryVector = embedRes.data.embedding.values;

    // console.log("------------------------------ query embadded :", queryVector)


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

    // Combine the text from all relevant matches into one string
    const retrievedContext = relevantMatches.length > 0
      ? relevantMatches.map(m => m.metadata.text).join("\n\n")
      : "No specific business policy found for this query.";

    console.log(`Found ${relevantMatches.length} relevant context snippets.`);
    console.log("relevantMatch : ", retrievedContext)




    // 1. Define your Static Context (or fetch from WordPress here)
    const systemPrompt = `You are the Al-Saqar Plumbing Support Bot.
                    RULES: 
                    1. Use this KNOWLEDGE to answer: "${retrievedContext}"
                    2. If the knowledge doesn't answer the user, suggest WhatsApp: https://wa.me/+923118688410
                    3. Be polite and concise.`;
    // const systemPrompt = `You are the Al-Parts Plumbing Support Bot. 
    // Use the following knowledge base to answer user questions about plumbing parts.RULES: 
    //                 1. Use this KNOWLEDGE to answer: "${retrievedContext}"
    //                 2. If the knowledge doesn't answer the user, suggest WhatsApp: https://wa.me/03118688410
    //                 3. Be polite and concise.`;

    // 2. Build the messages array (System + History + New Question)
    const messages = [
      { role: "system", content: systemPrompt },
      ...history, // Previous messages from the UI
      { role: "user", content: userQuestion }
    ];

    // 3. Call Groq
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Keep key in .env
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Use a valid Groq model name
        messages: messages,
        temperature: 0.2,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data.choices[0].message);

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
