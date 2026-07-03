import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  const accentColor = '#ff6b35';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          borderRadius: '20px',
        }}
      >
        {/* Accent background circle */}
        <div
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `rgba(255, 107, 53, 0.15)`,
          }}
        />
        {/* Monogram */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: accentColor,
            letterSpacing: '-2px',
            fontFamily: 'sans-serif',
          }}
        >
          LI
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
