import { readFileSync } from 'fs';
import { join } from 'path';
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const font = readFileSync(join(process.cwd(), 'public/fonts/JetBrainsMono-Bold.ttf'));

  const subtitle = t('title');
  const siteUrl = 'lenninibarra.com';
  const accentColor = '#ff6b35';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '80px',
          fontFamily: '"JetBrainsMono"',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: '80px',
            height: '4px',
            background: accentColor,
            marginBottom: '40px',
            borderRadius: '2px',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          Lennin Ibarra
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '36px',
            color: accentColor,
            marginBottom: '48px',
          }}
        >
          {subtitle}
        </div>

        {/* Tech tags */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: 'auto',
          }}
        >
          {['React', 'TypeScript', 'Next.js'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(255, 107, 53, 0.1)',
                border: `1px solid ${accentColor}`,
                borderRadius: '6px',
                padding: '8px 16px',
                color: accentColor,
                fontSize: '18px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Site URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '22px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {siteUrl}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'JetBrainsMono',
          data: font,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
