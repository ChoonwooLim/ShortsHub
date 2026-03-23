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

Your output must be STRICTLY in JSON format with the following keys:
{
  "title": "A catchy, click-worthy title",
  "hook": "The first 3 seconds spoken text, designed to retain 90%+ viewers based on the analysis",
  "bodyText": "The entire spoken script after the hook",
  "callToAction": "The final 5 seconds spoken text prompting engagement",
  "storyboard": [
    {
      "timestamp": "0:00-0:03",
      "visualDescription": "Describe what is on screen (B-roll, text overlay, emotion)",
      "voiceoverText": "The exact words spoken here"
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
      title: "How to Build a $10K/mo AI Agency (Viral Template)",
      hook: "Stop doing cold outreach. Nobody is reading your DMs anyway.",
      bodyText: "If you want to build a 10K a month AI agency in 2026, here is the exact 3-step blueprint. First, don't sell generic chatbots. Sell automated workflows. Find local businesses that still use paper forms or manual scheduling and automate their entire un-boarding using n8n and OpenAI. Second, use the 'Trojan Horse' strategy. Build a small, free automation tool for them first. Show them it works to build trust. Third, charge a setup fee and a monthly retainer for maintenance.",
      callToAction: "I put together a free guide with 5 templates you can copy and paste today. Comment 'AGENCY' and I'll dm it to you.",
      storyboard: [
         { timestamp: "0:00-0:03", visualDescription: "Fast zoom into camera, aggressive text 'STOP COLD OUTREACH' in red.", voiceoverText: "Stop doing cold outreach. Nobody is reading your DMs anyway." }
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
