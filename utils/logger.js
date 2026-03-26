import { supabase } from '@/lib/supabase';

/**
 * Logs chat metrics to the chatbot_logs table
 * @param {string} query - The user's query/question
 * @param {string} response - The AI assistant's response
 * @param {object} retrieved_docs - Retrieved documents as JSON
 * @param {number} response_time - Response time in milliseconds
 * @param {number} tokens_used - Total tokens used for the request
 * @param {string} model - The AI model used (e.g., "gpt-4", "gpt-3.5-turbo")
 * @returns {Promise<object>} The inserted record or error object
 */
export async function logChatMetric(
  query,
  response,
  retrieved_docs,
  response_time,
  tokens_used,
  model
) {
  try {
    // Validate required parameters
    if (!query || !response || !model) {
      console.warn('logChatMetric: Missing required parameters (query, response, or model)');
      return {
        success: false,
        error: 'Missing required parameters',
      };
    }

    // Ensure retrieved_docs is properly formatted as JSON
    const docsData = typeof retrieved_docs === 'string' 
      ? JSON.parse(retrieved_docs) 
      : retrieved_docs || null;

    const { data, error } = await supabase
      .from('chatbot_logs')
      .insert([
        {
          query,
          response,
          retrieved_docs: docsData,
          response_time: response_time || null,
          tokens_used: tokens_used || null,
          model,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Error logging chat metric:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error('Unexpected error in logChatMetric:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    };
  }
}
