import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Send the email to your backend or third-party service
    // const response = await axios.post('https://your-backend-endpoint.com/subscribe', { email });

    // if (response.status === 200) {
    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
    // } else {
    //   return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    // }
  } catch (error) {
    console.error('Error in subscription route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
