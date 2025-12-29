import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Harry Barnish';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #ffe2c5 0%, #fed7aa 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <h1
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '24px',
              textAlign: 'center',
              lineHeight: '1.1',
            }}
          >
            Hi, I'm Harry
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#1f2937',
              opacity: 0.8,
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: '1.5',
            }}
          >
            Computer Science and Management student at Queen Mary University of London
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            fontSize: '24px',
            color: '#ea580c',
            opacity: 0.6,
          }}
        >
          harrybarnish.co.uk
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

