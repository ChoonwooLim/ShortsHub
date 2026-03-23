import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const scripts = await prisma.generatedScript.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json({ success: true, scripts });
  } catch (error: any) {
    console.error('[API] Fetch Scripts Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
