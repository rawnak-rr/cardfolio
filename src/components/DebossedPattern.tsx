import { useId } from 'react';

export default function DebossedPattern({
  className = '',
}: {
  className?: string;
}) {
  const debossFilterId = useId();

  const combinedClassName = ['pointer-events-none', className]
    .filter(Boolean)
    .join(' ');

  // Create 6 diamond petals in a snowflake pattern
  const createPetal = (rotation: number) => {
    const centerX = 160;
    const centerY = 240;

    // Diamond shape points (relative to center)
    const petalPath = `
      M ${centerX},${centerY - 15}
      L ${centerX + 35},${centerY - 50}
      L ${centerX},${centerY - 85}
      L ${centerX - 35},${centerY - 50}
      Z
    `;

    return (
      <path
        key={rotation}
        d={petalPath}
        transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
      />
    );
  };

  return (
    <svg
      aria-hidden='true'
      role='presentation'
      viewBox='0 0 320 480'
      className={combinedClassName}>
      <defs>
        {/* Advanced deboss filter for realistic 3D indented effect */}
        <filter
          id={debossFilterId}
          x='-50%'
          y='-50%'
          width='200%'
          height='200%'
          colorInterpolationFilters='sRGB'>
          {/* Create the base for lighting effects */}
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='0'
            result='blur'
          />
          <feOffset
            in='blur'
            dx='0'
            dy='0'
            result='offsetBlur'
          />

          {/* Create depth map for lighting */}
          <feSpecularLighting
            in='blur'
            surfaceScale='5'
            specularConstant='0.75'
            specularExponent='20'
            lightingColor='#ffffff'
            result='specOut'>
            <fePointLight
              x='75'
              y='100'
              z='200'
            />
          </feSpecularLighting>

          <feComposite
            in='specOut'
            in2='SourceAlpha'
            operator='in'
            result='specOut'
          />

          {/* Create dark inner shadow (gives depth) */}
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='2'
            result='shadowBlur'
          />
          <feOffset
            in='shadowBlur'
            dx='2'
            dy='2'
            result='offsetDark'
          />
          <feFlood
            floodColor='rgba(0, 0, 0, 0.8)'
            result='colorDark'
          />
          <feComposite
            in='colorDark'
            in2='offsetDark'
            operator='in'
            result='innerDark'
          />

          {/* Create light highlight (top-left edge) */}
          <feOffset
            in='shadowBlur'
            dx='-2'
            dy='-2'
            result='offsetLight'
          />
          <feFlood
            floodColor='rgba(255, 255, 255, 0.8)'
            result='colorLight'
          />
          <feComposite
            in='colorLight'
            in2='offsetLight'
            operator='in'
            result='innerLight'
          />

          {/* Combine all shadow layers */}
          <feMerge result='shadows'>
            <feMergeNode in='innerDark' />
            <feMergeNode in='innerLight' />
            <feMergeNode in='specOut' />
          </feMerge>

          {/* Final composite */}
          <feMerge>
            <feMergeNode in='shadows' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      {/* Snowflake pattern with 6 diamond petals */}
      <g
        filter={`url(#${debossFilterId})`}
        fill='currentColor'
        fillOpacity='0.05'
        stroke='none'>
        {[0, 60, 120, 180, 240, 300].map((rotation) => createPetal(rotation))}
      </g>
    </svg>
  );
}
