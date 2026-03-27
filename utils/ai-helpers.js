
const NEXT_PUBLIC_GEN_AI_URL = process.env.NEXT_PUBLIC_GEN_AI_URL
const NEXT_PUBLIC_GEN_AI_API_KEY = process.env.NEXT_PUBLIC_GEN_AI_API_KEY


console.log("url :", NEXT_PUBLIC_GEN_AI_URL)
console.log("key :", NEXT_PUBLIC_GEN_AI_API_KEY)

//  helper function to summarize chat history if it exceeds a certain length, to keep the prompt concise for the AI. This is optional but can help with performance and relevance.
export async function summarizeHistory(messages) {
    try {
        // 3. Call Groq
        const response = await fetch(NEXT_PUBLIC_GEN_AI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${NEXT_PUBLIC_GEN_AI_API_KEY}`, // Keep key in .env
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant", // Use a valid Groq model name
                messages: [
                    {
                        role: "system",
                        content: "Summarize the following chat history. Focus on the user's intent and any key details provided."
                    },
                    {
                        role: "user",
                        content: messages.map(m => `${m.role}: ${m.content}`).join("\n")
                    }
                ],
                temperature: 0.5,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
            throw new Error(response || "Failed to summarize history");
        }

        const data = await response.json();
        console.log('Summary response:', data);

        const summary = data?.choices?.[0]?.message?.content?.trim();
        if (!summary) {
            return null;
        }

        // Return the summary as the new starting point for the AI
        return [
            { role: 'assistant', content: `Recent Conversation Summary : ${summary}` }
        ];

    }
    catch (error) {
        console.error("Summarization failed:", error);
        return null;
    }
}
