// app/api/conversations/[conversationId]/messages/[messageId]/feedback/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request, { params }) {
  try {
    const { conversationId, messageId } = await params; // messageId is UUID
    const { feedback } = await request.json();

    // Validate
    if (!messageId || !feedback) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Update by primary key id, and optionally also check conversation_id
    const { data, error } = await supabase
      .from('chatbot_logs')
      .update({ user_feedback: feedback })
      .eq('id', messageId)   // direct match on primary key
      .eq('conversation_id', conversationId) // optional security
      .select();

    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}