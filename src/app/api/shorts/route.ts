import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');

    // Fetch shorts with their associated analysis
    const shorts = await prisma.shortsVideo.findMany({
      orderBy: { viewCount: 'desc' },
      take: limit,
      include: {
        analysis: true,
      }
    });

    // BigInt fields must be converted to strings before returning JSON
    const serializedShorts = shorts.map(short => ({
       ...short,
       viewCount: short.viewCount.toString(),
       likeCount: short.likeCount?.toString() || null,
       commentCount: short.commentCount?.toString() || null,
    }));

    return NextResponse.json({ success: true, shorts: serializedShorts });
  } catch (error: any) {
    console.error('[API] Fetch Shorts Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
