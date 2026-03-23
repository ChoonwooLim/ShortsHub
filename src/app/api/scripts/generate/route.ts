import { NextResponse } from 'next/server';
import { generateViralScript } from '@/lib/services/script-generator';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const script = await generateViralScript(topic);
    if (!script) {
      return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
    }

    return NextResponse.json({ success: true, script });
  } catch (error: any) {
    console.error('[API] Script Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
