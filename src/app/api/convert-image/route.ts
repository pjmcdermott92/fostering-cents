import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const webpBuffer = await sharp(buffer).webp({ quality: 90 }).toBuffer();

    // @ts-expect-error webpbuffer error - this is actually correct?
    return new NextResponse(webpBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Content-Length': webpBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('Image processing failed:', err);
    return NextResponse.json({ error: 'Image processing failed' }, { status: 500 });
  }
}
