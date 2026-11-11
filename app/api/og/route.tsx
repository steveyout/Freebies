import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'freebies Directory';
    const desc = searchParams.get('desc') || 'The Ultimate Curated Mega-Directory of Free Media, Tools & Open Source Index';
    const cat = searchParams.get('cat') || 'DIRECTORY';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#09090b',
            padding: '60px 70px',
            fontFamily: 'sans-serif',
            position: 'relative',
            border: '2px solid #27272a',
          }}
        >
          {/* Top Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '20px',
                  padding: '8px 20px',
                  borderRadius: '12px',
                  letterSpacing: '1px',
                }}
              >
                freebies HUB
              </div>
              <div
                style={{
                  backgroundColor: '#18181b',
                  color: '#fbbf24',
                  fontSize: '15px',
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: '10px',
                  border: '1px solid #3f3f46',
                  letterSpacing: '1px',
                }}
              >
                {cat.toUpperCase()}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#10b981',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              />
              100% Verified &amp; Daily Audited
            </div>
          </div>

          {/* Main Title & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-1px',
              }}
            >
              {title.length > 70 ? `${title.slice(0, 70)}...` : title}
            </div>

            <div
              style={{
                fontSize: '22px',
                color: '#a1a1aa',
                lineHeight: 1.4,
                maxWidth: '950px',
              }}
            >
              {desc.length > 140 ? `${desc.slice(0, 140)}...` : desc}
            </div>
          </div>

          {/* Bottom Highlights Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: '1px solid #27272a',
            }}
          >
            <div style={{ display: 'flex', gap: '24px', color: '#71717a', fontSize: '15px', fontWeight: 600 }}>
              <span>🚀 Zero Registration</span>
              <span>🛡️ Ad-Free &amp; FOSS</span>
              <span>⚡ Fast Cloud Mirrors</span>
            </div>

            <div style={{ color: '#ef4444', fontSize: '15px', fontWeight: 700 }}>
              freebies.directory
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
