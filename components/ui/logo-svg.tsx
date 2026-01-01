'use client';

/**
 * LogoSVG Component
 *
 * Simple, reliable logo component without animation jank.
 * Visible immediately on load - no opacity:0 initial states.
 */

interface LogoSVGProps {
  className?: string;
  showText?: boolean;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean; // Kept for API compatibility, but animation removed for reliability
}

export default function LogoSVG({
  className = '',
  showText = true,
  variant = 'dark',
  size = 'md',
}: LogoSVGProps) {
  // Size mappings
  const sizeMap = {
    sm: { width: 32, height: 32, textClass: 'text-[9px]', gap: 'gap-0', logoGap: 'gap-1.5' },
    md: { width: 40, height: 40, textClass: 'text-[11px]', gap: 'gap-0.5', logoGap: 'gap-2' },
    lg: { width: 50, height: 50, textClass: 'text-[13px]', gap: 'gap-1', logoGap: 'gap-3' },
  };

  const { width, height, textClass, gap, logoGap } = sizeMap[size];

  // Color based on variant
  const colorClass = variant === 'light'
    ? 'text-white'
    : 'text-slate-900 dark:text-white';

  const systemsColor = variant === 'light'
    ? 'text-blue-400'
    : 'text-blue-600 dark:text-blue-400';

  return (
    <div className={`flex items-center ${logoGap} ${colorClass}`}>
      {/* SVG Logo */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
      >
        {/* Gaussian Bell Curve */}
        <path
          d="M 50 550 C 80 540, 110 515, 140 470 C 170 425, 200 360, 230 270 C 260 180, 290 115, 320 75 C 350 35, 375 20, 400 20 C 425 20, 450 35, 480 75 C 510 115, 540 180, 570 270 C 600 360, 630 425, 660 470 C 690 515, 720 540, 750 550"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Base line */}
        <line
          x1="40"
          y1="550"
          x2="760"
          y2="550"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* IIS Text */}
        <text
          x="400"
          y="430"
          textAnchor="middle"
          fontSize="180"
          fontWeight="900"
          fontFamily="Georgia, serif"
          fill="currentColor"
        >
          IIS
        </text>
      </svg>

      {/* Company Name Text */}
      {showText && (
        <div className={`flex flex-col justify-center ${gap}`}>
          <div className={`${textClass} font-extrabold tracking-[0.15em] leading-none`}>
            INTEGRATED
          </div>
          <div className={`${textClass} font-extrabold tracking-[0.15em] leading-none`}>
            INSPECTION
          </div>
          <div className={`${textClass} font-extrabold tracking-[0.15em] leading-none ${systemsColor}`}>
            SYSTEMS
          </div>
        </div>
      )}
    </div>
  );
}
