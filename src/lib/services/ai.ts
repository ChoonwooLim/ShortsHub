import OpenAI from 'openai';
import prisma from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

export interface AnalysisResult {
  hookAnalysis: string;
  pacingSummary: string;
  topicAppeal: string;
  overallScore: number;
}

const SYSTEM_PROMPT = `
You are an expert YouTube Shorts algorithm analyst and high-end agency consultant.
Your job is to analyze the provided metadata and transcript of a highly-viewed YouTube Short, and deeply understand WHY it went viral.

Based on the title, description, tags, duration, and the spoken transcript, extract the following:
1. hookAnalysis: Explain what made the first 3-5 seconds engaging (curiosity gap, negative framing, visual/audio mismatch, bold claim). Maximum 3 sentences. Explain in Korean.
2. pacingSummary: Estimate the pacing and editing tempo that kept viewers watching. (e.g., "Fast cuts every 1.2s", "Slow build-up"). Maximum 2 sentences. Explain in Korean.
3. topicAppeal: Why does this topic resonate with the current global audience? Maximum 2 sentences. Explain in Korean.
4. overallScore: A virality score from 1 to 100 based on the hook, retention mechanics, and topic relevance.

Respond STRICTLY in JSON format with the following keys. All string values must be in Korean (한국어):
{
  "hookAnalysis": "string",
  "pacingSummary": "string",
  "topicAppeal": "string",
  "overallScore": number
}
`;

export async function analyzeShortsVideo(shortsId: string, metadata: any, transcript: string = ""): Promise<AnalysisResult | null> {
  console.log(`[AI Engine] Analyzing Shorts Video: ${shortsId}...`);

  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY is not set. Returning mock analysis result.");
    const mockData = {
      hookAnalysis: "처음 3초 동안의 강력한 부정적 프레이밍이 즉각적인 호기심을 유발합니다.",
      pacingSummary: "1.5초마다 예상되는 시각적 컷 전환과 함께 빠른 속도로 진행됩니다.",
      topicAppeal: "AI 자동화 도구 및 부 창출에 대한 현재의 높은 관심을 잘 활용했습니다.",
      overallScore: 92
    };
    
    await prisma.analysisReport.upsert({
      where: { shortsId },
      update: {
        ...mockData,
        fullReport: mockData as any,
      },
      create: {
        shortsId,
        ...mockData,
        fullReport: mockData as any,
      }
    });
    
    return mockData;
  }

  try {
    const userPrompt = `
    Title: ${metadata.title}
    Channel: ${metadata.channelTitle}
    Duration: ${metadata.duration}
    Views: ${metadata.viewCount}
    Transcript: ${transcript || "[No transcript available]"}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) throw new Error("No response from GPT-4o");

    const parsedData = JSON.parse(responseContent) as AnalysisResult;

    // Save report to database
    await prisma.analysisReport.upsert({
      where: { shortsId },
      update: {
        hookAnalysis: parsedData.hookAnalysis,
        pacingSummary: parsedData.pacingSummary,
        topicAppeal: parsedData.topicAppeal,
        overallScore: parsedData.overallScore,
        fullReport: parsedData as any, // Store full JSON
      },
      create: {
        shortsId,
        hookAnalysis: parsedData.hookAnalysis,
        pacingSummary: parsedData.pacingSummary,
        topicAppeal: parsedData.topicAppeal,
        overallScore: parsedData.overallScore,
        fullReport: parsedData as any,
      }
    });

    console.log(`[AI Engine] Analysis completed & saved for ${shortsId}. Score: ${parsedData.overallScore}`);
    return parsedData;

  } catch (error) {
    console.error(`[AI Engine] Error analyzing video ${shortsId}:`, error);
    return null;
  }
}
