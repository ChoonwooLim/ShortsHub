import { NextResponse } from 'next/server';
import { fetchDailyTopShorts } from '@/lib/services/youtube';
import { analyzeShortsVideo } from '@/lib/services/ai';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  // 1. Verify Vercel Cron secret for security
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log("[CRON] Starting daily global Shorts fetch...");
    
    // Fetch top 30 trending global shorts
    const shorts = await fetchDailyTopShorts(30);
    console.log(`[CRON] Fetched ${shorts.length} top shorts mapping via YouTube API.`);

    let savedCount = 0;

    for (const short of shorts) {
      // Safely parse counts
      const viewCountParse = BigInt(short.viewCount || '0');
      const likeCountParse = short.likeCount ? BigInt(short.likeCount) : null;
      const commentCountParse = short.commentCount ? BigInt(short.commentCount) : null;

      try {
        // Upsert into DB to avoid duplicates
        const upsertedShorts = await prisma.shortsVideo.upsert({
          where: { youtubeId: short.id },
          update: {
            viewCount: viewCountParse, // If changed to bigint, wrap in BigInt()
            likeCount: likeCountParse,
            commentCount: commentCountParse,
            crawledAt: new Date(),
          },
          create: {
            youtubeId: short.id,
            title: short.title,
            description: short.description,
            channelId: short.channelId,
            channelTitle: short.channelTitle,
            publishedAt: new Date(short.publishedAt),
            viewCount: viewCountParse,
            likeCount: likeCountParse,
            commentCount: commentCountParse,
            duration: short.duration,
            tags: short.tags || [],
            transcript: short.transcript,
            thumbnailUrl: short.thumbnails?.high?.url || null,
          }
        });
        savedCount++;
        
        // Phase 3 integration hook (AI Analysis) -> PASS INTERNAL UUID, NOT YOUTUBE ID
        await analyzeShortsVideo(upsertedShorts.id, short, short.transcript || '');

      } catch (dbError) {
        console.error(`[CRON] Database error saving shorts [${short.id}]:`, dbError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      fetchedCount: shorts.length,
      savedCount
    });

  } catch (error: any) {
    console.error("[CRON] Fatal error gathering daily shorts:", error);
    return NextResponse.json({ error: error.message || "Unknown Error" }, { status: 500 });
  }
}
