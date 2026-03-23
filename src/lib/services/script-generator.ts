import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});
const prisma = new PrismaClient();

export interface GeneratedStoryboardScene {
  timestamp: string;
  visualDescription: string;
  voiceoverText: string;
}

export interface GeneratedScriptResult {
  title: string;
  hook: string;
  bodyText: string;
  callToAction: string;
  storyboard: GeneratedStoryboardScene[];
}

const SCRIPT_GEN_PROMPT = `
You are a master YouTube Shorts scriptwriter and director.
Your goal is to generate a highly engaging, viral 60-second structural script and storyboard.
Base your style, pacing, and hooks on the provided viral analysis factors of a successful video, but apply it to the requested topic.
All generated text MUST be in Korean (한국어).

Your output must be STRICTLY in JSON format with the following keys:
{
  "title": "A catchy, click-worthy title in Korean",
  "hook": "The first 3 seconds spoken text in Korean, designed to retain 90%+ viewers based on the analysis",
  "bodyText": "The entire spoken script in Korean after the hook",
  "callToAction": "The final 5 seconds spoken text in Korean prompting engagement",
  "storyboard": [
    {
      "timestamp": "0:00-0:03",
      "visualDescription": "Describe what is on screen in Korean (B-roll, text overlay, emotion)",
      "voiceoverText": "The exact words spoken here in Korean"
    }
  ]
}
`;

export async function generateViralScript(
  topic: string, 
  referenceAnalysisMetadata?: any
): Promise<GeneratedScriptResult | null> {
  console.log(`[Script Generator] Generating script for topic: ${topic}`);

  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY is not set. Returning mock generated script.");
    return {
      title: "월 1천만원 버는 AI 에이전시 구축하기 (바이럴 템플릿)",
      hook: "콜드 아웃리치는 그만하세요. 아무도 당신의 DM을 읽지 않습니다.",
      bodyText: "2026년에 월 1천만원 규모의 AI 에이전시를 구축하고 싶다면, 여기 정확한 3단계 청사진이 있습니다. 첫째, 일반적인 챗봇을 팔지 마세요. 자동화된 워크플로우를 파세요. 아직도 종이 문서나 수동 예약을 사용하는 지역 비즈니스를 찾아 n8n과 OpenAI를 사용하여 온보딩 전체를 자동화해 주세요. 둘째, '트로이 목마' 전략을 사용하세요. 먼저 작고 무료인 자동화 도구를 만들어 주세요. 그것이 효과가 있다는 것을 보여주어 신뢰를 쌓으세요. 셋째, 설정 비용과 유지보수를 위한 월간 구독료를 받으세요.",
      callToAction: "오늘 바로 복사해서 붙여넣을 수 있는 5가지 템플릿이 담긴 무료 가이드를 준비했습니다. '에이전시'라고 댓글을 남겨주시면 DM으로 보내드릴게요.",
      storyboard: [
         { timestamp: "0:00-0:03", visualDescription: "카메라로 빠르게 줌인, 빨간색으로 공격적인 텍스트 '콜드 아웃리치는 그만' 표시.", voiceoverText: "콜드 아웃리치는 그만하세요. 아무도 당신의 DM을 읽지 않습니다." }
      ]
    };
  }

  try {
    const userPrompt = `
    Target Topic: ${topic}
    Reference Viral Factors (Emulate this pacing and hook style): 
    ${referenceAnalysisMetadata ? JSON.stringify(referenceAnalysisMetadata, null, 2) : "Use standard high-retention fast-paced Shorts formula."}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SCRIPT_GEN_PROMPT },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7, // slightly higher for creativity
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) throw new Error("No response from GPT-4o");

    const parsedData = JSON.parse(responseContent) as GeneratedScriptResult;

    // Save generated script to database
    await prisma.generatedScript.create({
      data: {
        title: parsedData.title,
        hook: parsedData.hook,
        bodyText: parsedData.bodyText,
        callToAction: parsedData.callToAction,
        storyboard: parsedData.storyboard as any,
        status: 'DRAFT',
      }
    });

    console.log(`[Script Generator] Script generated and saved for topic: ${topic}`);
    return parsedData;

  } catch (error) {
    console.error(`[Script Generator] Error generating script for ${topic}:`, error);
    return null;
  }
}
