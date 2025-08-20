import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { captchaAnswer, captchaExpected } = await req.json();

    const success = parseInt(captchaAnswer) === parseInt(captchaExpected);

    return NextResponse.json({ success });
  } catch (err) {
    console.error('Error parsing body', err);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
