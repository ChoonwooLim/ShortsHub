import path from 'path';
import fs from 'fs';

// Note: Ensure ELEVENLABS_API_KEY is defined in .env
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obbf5AWCGqZrmm'; // Adam as default

export async function generateTTS(text: string, outputFileName: string): Promise<string | null> {
  console.log(`[TTS Service] Generating voiceover for: "${text.substring(0, 30)}..."`);
  
  if (!ELEVENLABS_API_KEY) {
    console.warn("ELEVENLABS_API_KEY is not set. Returning mock audio path.");
    return '/mock/audio/voiceover.mp3';
  }

  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/stream`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
         throw new Error(`Failed to generate TTS: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save to local public/assets folder or temp directory
    const outputDir = path.join(process.cwd(), 'public', 'renders', 'audio');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filePath = path.join(outputDir, `${outputFileName}.mp3`);
    fs.writeFileSync(filePath, buffer);
    
    console.log(`[TTS Service] Voiceover generated successfully: ${filePath}`);
    
    // Return relative path for client consumption
    return `/renders/audio/${outputFileName}.mp3`;
    
  } catch (error) {
    console.error(`[TTS Service] Error in TTS generation:`, error);
    return null;
  }
}
