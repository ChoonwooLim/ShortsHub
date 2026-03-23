import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { openai, youtube, elevenlabs } = await request.json();
    
    // valid: null = untested (empty), true = working, false = failed
    const results = {
      openai: { valid: null as boolean | null, message: '' },
      youtube: { valid: null as boolean | null, message: '' },
      elevenlabs: { valid: null as boolean | null, message: '' },
    };

    // 1. Validate OpenAI
    if (openai && openai.trim().length > 0) {
      try {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${openai}` }
        });
        if (res.ok) {
          results.openai = { valid: true, message: '연결 성공' };
        } else {
          results.openai = { valid: false, message: '유효하지 않은 API 키' };
        }
      } catch (e) {
        results.openai = { valid: false, message: '네트워크 에러' };
      }
    }

    // 2. Validate YouTube Data API v3
    if (youtube && youtube.trim().length > 0) {
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&maxResults=1&key=${youtube}`);
        if (res.ok) {
           results.youtube = { valid: true, message: '연결 성공' };
        } else {
           results.youtube = { valid: false, message: '유효하지 않은 API 키' };
        }
      } catch (e) {
        results.youtube = { valid: false, message: '네트워크 에러' };
      }
    }

    // 3. Validate ElevenLabs
    if (elevenlabs && elevenlabs.trim().length > 0) {
      try {
        const cleanKey = elevenlabs.trim();
        const res = await fetch('https://api.elevenlabs.io/v1/user', {
          headers: { 'xi-api-key': cleanKey }
        });
        if (res.ok) {
          results.elevenlabs = { valid: true, message: '연결 성공' };
        } else {
          try {
            const errBody = await res.json();
            if (errBody?.detail?.status === 'invalid_api_key') {
              results.elevenlabs = { valid: false, message: '유효하지 않은 API 키' };
            } else {
              // It's authenticated but lacks permission, so it's a valid key
              results.elevenlabs = { valid: true, message: '연결 성공 (일부 권한 제한됨)' };
            }
          } catch(e) {
            results.elevenlabs = { valid: false, message: `유효하지 않은 API 키 (${res.status})` };
          }
        }
      } catch (e) {
        results.elevenlabs = { valid: false, message: '네트워크 에러' };
      }
    }

    // 4. Save to .env and memory if valid
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    try {
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      let updated = false;
      const updateEnv = (key: string, value: string) => {
        process.env[key] = value;
        const regex = new RegExp(`^${key}=.*$`, 'm');
        if (regex.test(envContent)) {
          envContent = envContent.replace(regex, `${key}="${value}"`);
        } else {
          envContent += `\n${key}="${value}"`;
        }
        updated = true;
      };

      if (results.openai.valid) updateEnv('OPENAI_API_KEY', openai.trim());
      if (results.youtube.valid) updateEnv('YOUTUBE_API_KEY', youtube.trim());
      if (results.elevenlabs.valid) updateEnv('ELEVENLABS_API_KEY', elevenlabs.trim());

      if (updated) {
        fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');
        console.log('[Settings] Successfully saved valid API keys to .env and process.env');
      }
    } catch (fsError) {
      console.error('[Settings] Failed to save to .env (Ignore if in serverless environment):', fsError);
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
