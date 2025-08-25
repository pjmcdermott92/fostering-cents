import { search } from '@/app/_data/search';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const keyword = new URL(req.url).searchParams.get('s');

  try {
    const results = await search(keyword!);
    return NextResponse.json({ success: true, data: results }, { status: 200 });
  } catch (err: any) {
    console.error('Search error: ', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
