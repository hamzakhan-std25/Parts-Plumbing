import { supabase } from '@/lib/supabase';

export async function logChatMetric(
  conversationId,
  userQuestion,
  answer,
  retrievedDocs,
  responseTimeMs,
  totalTokens,
  costUsd,
  model
) {
  try {
    // Validate required parameters
    if (!userQuestion || !answer || !model) {
      console.warn('logChatMetric: Missing required parameters (userQuestion, answer, or model)');
      return {
        success: false,
        error: 'Missing required parameters',
      };
    }

    // Ensure retrieved_docs is properly formatted as JSON
    const docsData = typeof retrievedDocs === 'string'
      ? JSON.parse(retrievedDocs)
      : retrievedDocs || null;

    const { data, error } = await supabase
      .from('chatbot_logs')
      .insert([
        {
          conversation_id: conversationId,
          user_query: userQuestion,
          ai_response: answer,
          retrieved_docs: retrievedDocs,
          response_time_ms: responseTimeMs,
          total_tokens: totalTokens,
          cost_usd: costUsd,
          model: model,
          // The following fields are left NULL for now (will be filled later by evaluation)
          retrieval_precision: null,
          answer_correctness_score: null,
          answer_groundedness: null,
          hallucination_flag: null,
          user_feedback: null,
          feedback_comment: null,
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
