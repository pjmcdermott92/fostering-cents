import { NextResponse } from 'next/server';
import { subscribeFormSchema } from '@/components/SubscribeForm/schemas';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { success, data } = subscribeFormSchema.safeParse(body);

    if (!success == true) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 },
      );
    }

    // @TODO: SET UP FETCH REQUEST TO MAILERLITE API

    await new Promise((resolve, _) => setTimeout(resolve, 1000));
    console.log(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        message: 'Could not process submission. Please try again alter.',
      },
      { status: 500 },
    );
  }
}
