import { YoutubeTranscript } from 'youtube-transcript';

// Note: Ensure YOUTUBE_API_KEY is defined in .env
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface VideoSnippet {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: any;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

export interface YouTubeVideoData extends VideoSnippet, VideoStatistics {
  duration: string;
  tags?: string[];
  transcript?: string;
}

function parseDuration(durationString: string): number {
  const match = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  return hours * 3600 + minutes * 60 + seconds;
}

export async function fetchDailyTopShorts(maxResults: number = 30): Promise<YouTubeVideoData[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YOUTUBE_API_KEY is not set. Returning mock data instead.");
    return getMockShortsData();
  }

  try {
    const searchUrl = new URL(`${YOUTUBE_API_BASE_URL}/search`);
    searchUrl.searchParams.append('part', 'id');
    searchUrl.searchParams.append('q', '#shorts');
    searchUrl.searchParams.append('type', 'video');
    searchUrl.searchParams.append('videoDuration', 'short');
    searchUrl.searchParams.append('order', 'viewCount');
    searchUrl.searchParams.append('maxResults', '50');
    searchUrl.searchParams.append('key', YOUTUBE_API_KEY);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2);
    searchUrl.searchParams.append('publishedAfter', yesterday.toISOString());

    const searchResponse = await fetch(searchUrl.toString());
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    const videoUrl = new URL(`${YOUTUBE_API_BASE_URL}/videos`);
    videoUrl.searchParams.append('part', 'snippet,statistics,contentDetails');
    videoUrl.searchParams.append('id', videoIds);
    videoUrl.searchParams.append('key', YOUTUBE_API_KEY);

    const videoResponse = await fetch(videoUrl.toString());
    const videoData = await videoResponse.json();

    const shorts: YouTubeVideoData[] = [];

    for (const item of videoData.items) {
      const durationSecs = parseDuration(item.contentDetails.duration);
      
      if (durationSecs <= 65) {
        let transcriptText = "";
        try {
           const transcript = await YoutubeTranscript.fetchTranscript(item.id);
           transcriptText = transcript.map(t => t.text).join(" ");
        } catch(e) {
           console.log(`Could not fetch transcript for ${item.id}`);
        }
        
        shorts.push({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          thumbnails: item.snippet.thumbnails,
          tags: item.snippet.tags || [],
          duration: item.contentDetails.duration,
          viewCount: item.statistics.viewCount || '0',
          likeCount: item.statistics.likeCount || '0',
          commentCount: item.statistics.commentCount || '0',
          transcript: transcriptText
        });
      }

      if (shorts.length >= maxResults) {
        break;
      }
    }

    return shorts;
  } catch (error) {
    console.error('Error fetching global top shorts:', error);
    throw error;
  }
}

function getMockShortsData(): YouTubeVideoData[] {
  return [
    {
      id: "mock-1",
      title: "월 1천만원 버는 AI 에이전시 구축하기",
      description: "AI 자동화에 대한 단계별 가이드.",
      channelId: "UC123",
      channelTitle: "AI 사업가",
      publishedAt: new Date().toISOString(),
      thumbnails: {},
      duration: "PT58S",
      viewCount: "12400000",
      likeCount: "840000",
      commentCount: "12000",
      tags: ["ai", "agency", "business", "에이전시", "비즈니스"],
      transcript: "콜드 아웃리치는 그만하세요. 아무도 당신의 DM을 읽지 않습니다. 2026년에 월 1천만원 규모의 AI 에이전시를 구축하고 싶다면, 여기 정확한 3단계 청사진이 있습니다. 첫째..."
    }
  ];
}
