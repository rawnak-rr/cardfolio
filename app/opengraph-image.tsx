import { ImageResponse } from 'next/og';
import { profile } from '@/src/data';

export const alt = 'rawnak fullstack developer portfolio card';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#f7f3ed',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}>
        <div
          style={{
            background: '#ff6f00',
            border: '2px solid rgba(255, 208, 166, 0.7)',
            borderRadius: 48,
            boxShadow: '0 44px 90px rgba(17, 24, 39, 0.28)',
            color: '#111111',
            display: 'flex',
            flexDirection: 'column',
            height: 420,
            justifyContent: 'flex-end',
            padding: 64,
            width: 760,
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: 3,
                lineHeight: 1,
                textTransform: 'uppercase',
              }}>
              {profile.name}
            </div>
            <div
              style={{
                color: 'rgba(17, 17, 17, 0.62)',
                fontSize: 32,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}>
              {profile.role}
            </div>
            <div
              style={{
                color: 'rgba(17, 17, 17, 0.62)',
                fontSize: 28,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}>
              CompSci @ UNSW
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
