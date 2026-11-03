import React from 'react';

export interface HangingBallConfig {
  id: string;
  leftPercent: number; // 0 to 100%
  stringHeight: number; // in pixels
  ballRadius: number; // in pixels
  swayClass: 'xmas-bauble-sway-1' | 'xmas-bauble-sway-2' | 'xmas-bauble-sway-3';
  colorType: 'ruby' | 'emerald' | 'gold' | 'amethyst' | 'sapphire' | 'rosegold' | 'turquoise' | 'amber';
  patternType: 'snowflake' | 'star' | 'stripes' | 'dots' | 'sparkle';
  hideOnMobile?: boolean;
}

// Preset distribution for top bar banner (compact & graceful)
const TOP_BAR_BALLS: HangingBallConfig[] = [
  { id: 'tb1', leftPercent: 1.5, stringHeight: 14, ballRadius: 9, swayClass: 'xmas-bauble-sway-1', colorType: 'ruby', patternType: 'snowflake' },
  { id: 'tb2', leftPercent: 6, stringHeight: 22, ballRadius: 11, swayClass: 'xmas-bauble-sway-2', colorType: 'gold', patternType: 'star' },
  { id: 'tb3', leftPercent: 11, stringHeight: 12, ballRadius: 8, swayClass: 'xmas-bauble-sway-3', colorType: 'emerald', patternType: 'dots', hideOnMobile: true },
  { id: 'tb4', leftPercent: 16, stringHeight: 20, ballRadius: 10, swayClass: 'xmas-bauble-sway-1', colorType: 'amethyst', patternType: 'stripes' },
  { id: 'tb5', leftPercent: 21, stringHeight: 14, ballRadius: 9, swayClass: 'xmas-bauble-sway-2', colorType: 'sapphire', patternType: 'sparkle', hideOnMobile: true },
  { id: 'tb6', leftPercent: 26, stringHeight: 24, ballRadius: 11, swayClass: 'xmas-bauble-sway-3', colorType: 'ruby', patternType: 'star' },
  { id: 'tb7', leftPercent: 32, stringHeight: 12, ballRadius: 8, swayClass: 'xmas-bauble-sway-1', colorType: 'rosegold', patternType: 'snowflake', hideOnMobile: true },
  { id: 'tb8', leftPercent: 38, stringHeight: 22, ballRadius: 10, swayClass: 'xmas-bauble-sway-2', colorType: 'gold', patternType: 'sparkle', hideOnMobile: true },
  { id: 'tb9', leftPercent: 44, stringHeight: 13, ballRadius: 8, swayClass: 'xmas-bauble-sway-3', colorType: 'emerald', patternType: 'dots', hideOnMobile: true },
  { id: 'tb10', leftPercent: 50, stringHeight: 20, ballRadius: 10, swayClass: 'xmas-bauble-sway-1', colorType: 'ruby', patternType: 'stripes', hideOnMobile: true },
  { id: 'tb11', leftPercent: 56, stringHeight: 14, ballRadius: 9, swayClass: 'xmas-bauble-sway-2', colorType: 'turquoise', patternType: 'star', hideOnMobile: true },
  { id: 'tb12', leftPercent: 62, stringHeight: 22, ballRadius: 11, swayClass: 'xmas-bauble-sway-3', colorType: 'amethyst', patternType: 'sparkle', hideOnMobile: true },
  { id: 'tb13', leftPercent: 68, stringHeight: 13, ballRadius: 8, swayClass: 'xmas-bauble-sway-1', colorType: 'gold', patternType: 'snowflake', hideOnMobile: true },
  { id: 'tb14', leftPercent: 74, stringHeight: 24, ballRadius: 11, swayClass: 'xmas-bauble-sway-2', colorType: 'sapphire', patternType: 'star' },
  { id: 'tb15', leftPercent: 79, stringHeight: 14, ballRadius: 9, swayClass: 'xmas-bauble-sway-3', colorType: 'emerald', patternType: 'dots', hideOnMobile: true },
  { id: 'tb16', leftPercent: 84, stringHeight: 22, ballRadius: 10, swayClass: 'xmas-bauble-sway-1', colorType: 'ruby', patternType: 'stripes' },
  { id: 'tb17', leftPercent: 89, stringHeight: 13, ballRadius: 8, swayClass: 'xmas-bauble-sway-2', colorType: 'rosegold', patternType: 'snowflake', hideOnMobile: true },
  { id: 'tb18', leftPercent: 94, stringHeight: 23, ballRadius: 11, swayClass: 'xmas-bauble-sway-3', colorType: 'gold', patternType: 'star' },
  { id: 'tb19', leftPercent: 98.5, stringHeight: 15, ballRadius: 9, swayClass: 'xmas-bauble-sway-1', colorType: 'emerald', patternType: 'sparkle' },
];

export const ChristmasHangingBalls: React.FC<{
  className?: string;
  variant?: 'top-bar' | 'garland' | 'cluster-left' | 'cluster-right';
}> = ({ className = '', variant = 'top-bar' }) => {
  if (variant === 'cluster-left') {
    return (
      <div className={`pointer-events-none select-none z-20 ${className}`}>
        <svg
          viewBox="0 0 170 145"
          className="w-32 sm:w-44 h-28 sm:h-38 overflow-visible filter drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <BallGradients />
          </defs>
          {/* Ball 1 - Ruby Red */}
          <g className="xmas-bauble-sway-1" style={{ transformOrigin: '25px 0px' }}>
            <line x1="25" y1="0" x2="25" y2="42" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={25} y={42} />
            <circle cx="25" cy="60" r="17" fill="url(#xmas-grad-ruby)" filter="drop-shadow(0 4px 5px rgba(0,0,0,0.4))" />
            <StarPattern cx={25} cy={60} r={17} />
            <GlassGloss cx={25} cy={60} r={17} />
          </g>
          {/* Ball 2 - Imperial Gold */}
          <g className="xmas-bauble-sway-2" style={{ transformOrigin: '72px 0px' }}>
            <line x1="72" y1="0" x2="72" y2="68" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={72} y={68} />
            <circle cx="72" cy="89" r="20" fill="url(#xmas-grad-gold)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.45))" />
            <SnowflakePattern cx={72} cy={89} r={20} />
            <GlassGloss cx={72} cy={89} r={20} />
          </g>
          {/* Ball 3 - Emerald Green */}
          <g className="xmas-bauble-sway-3" style={{ transformOrigin: '118px 0px' }}>
            <line x1="118" y1="0" x2="118" y2="36" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={118} y={36} />
            <circle cx="118" cy="52" r="15" fill="url(#xmas-grad-emerald)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.35))" />
            <SparklePattern cx={118} cy={52} r={15} />
            <GlassGloss cx={118} cy={52} r={15} />
          </g>
          {/* Ball 4 - Amethyst Purple */}
          <g className="xmas-bauble-sway-1" style={{ transformOrigin: '150px 0px' }}>
            <line x1="150" y1="0" x2="150" y2="58" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={150} y={58} />
            <circle cx="150" cy="74" r="16" fill="url(#xmas-grad-amethyst)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))" />
            <StripesPattern cx={150} cy={74} r={16} />
            <GlassGloss cx={150} cy={74} r={16} />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'cluster-right') {
    return (
      <div className={`pointer-events-none select-none z-20 ${className}`}>
        <svg
          viewBox="0 0 170 145"
          className="w-32 sm:w-44 h-28 sm:h-38 overflow-visible filter drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <BallGradients />
          </defs>
          {/* Ball 1 - Sapphire Blue */}
          <g className="xmas-bauble-sway-2" style={{ transformOrigin: '18px 0px' }}>
            <line x1="18" y1="0" x2="18" y2="54" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={18} y={54} />
            <circle cx="18" cy="70" r="16" fill="url(#xmas-grad-sapphire)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))" />
            <SnowflakePattern cx={18} cy={70} r={16} />
            <GlassGloss cx={18} cy={70} r={16} />
          </g>
          {/* Ball 2 - Ruby Red */}
          <g className="xmas-bauble-sway-3" style={{ transformOrigin: '58px 0px' }}>
            <line x1="58" y1="0" x2="58" y2="34" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={58} y={34} />
            <circle cx="58" cy="49" r="15" fill="url(#xmas-grad-ruby)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.35))" />
            <SparklePattern cx={58} cy={49} r={15} />
            <GlassGloss cx={58} cy={49} r={15} />
          </g>
          {/* Ball 3 - 24K Gold */}
          <g className="xmas-bauble-sway-1" style={{ transformOrigin: '102px 0px' }}>
            <line x1="102" y1="0" x2="102" y2="70" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={102} y={70} />
            <circle cx="102" cy="90" r="20" fill="url(#xmas-grad-gold)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.45))" />
            <StarPattern cx={102} cy={90} r={20} />
            <GlassGloss cx={102} cy={90} r={20} />
          </g>
          {/* Ball 4 - Rose Gold / Magenta */}
          <g className="xmas-bauble-sway-2" style={{ transformOrigin: '146px 0px' }}>
            <line x1="146" y1="0" x2="146" y2="40" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <BallCap x={146} y={40} />
            <circle cx="146" cy="56" r="16" fill="url(#xmas-grad-rosegold)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.4))" />
            <StripesPattern cx={146} cy={56} r={16} />
            <GlassGloss cx={146} cy={56} r={16} />
          </g>
        </svg>
      </div>
    );
  }

  // Full-width Garland along the top
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none w-full absolute top-0 left-0 right-0 overflow-visible z-20 ${className}`}
      style={{ height: '36px' }}
    >
      <svg
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <BallGradients />
        </defs>
        {/* Decorative Golden Garland Wire along very top edge */}
        <line x1="0%" y1="0" x2="100%" y2="0" stroke="#D4AF37" strokeWidth="1.8" opacity="0.75" />
      </svg>

      {/* Render Each Swaying Christmas Bauble */}
      {TOP_BAR_BALLS.map((ball) => {
        const totalHeight = ball.stringHeight + ball.ballRadius * 2 + 10;
        const totalWidth = ball.ballRadius * 2 + 14;
        const cx = totalWidth / 2;
        const cy = ball.stringHeight + 5 + ball.ballRadius;

        return (
          <div
            key={ball.id}
            className={`absolute top-0 transform -translate-x-1/2 ${ball.swayClass} ${
              ball.hideOnMobile ? 'hidden md:block' : 'block'
            }`}
            style={{
              left: `${ball.leftPercent}%`,
              width: `${totalWidth}px`,
              height: `${totalHeight}px`,
              transformOrigin: 'top center',
            }}
          >
            <svg
              width={totalWidth}
              height={totalHeight}
              viewBox={`0 0 ${totalWidth} ${totalHeight}`}
              className="overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Golden hanging thread with subtle glint */}
              <line
                x1={cx}
                y1={0}
                x2={cx}
                y2={ball.stringHeight}
                stroke="#D4AF37"
                strokeWidth="1.2"
                strokeDasharray="2 1"
              />

              {/* Metallic Brass/Gold Cap with Ring */}
              <BallCap x={cx} y={ball.stringHeight} />

              {/* Glowing Colorful Sphere */}
              <circle
                cx={cx}
                cy={cy}
                r={ball.ballRadius}
                fill={`url(#xmas-grad-${ball.colorType})`}
                filter="drop-shadow(0 2.5px 4px rgba(0,0,0,0.5))"
              />

              {/* Inner Decorative Patterns based on type */}
              {ball.patternType === 'snowflake' && (
                <SnowflakePattern cx={cx} cy={cy} r={ball.ballRadius} />
              )}
              {ball.patternType === 'star' && (
                <StarPattern cx={cx} cy={cy} r={ball.ballRadius} />
              )}
              {ball.patternType === 'stripes' && (
                <StripesPattern cx={cx} cy={cy} r={ball.ballRadius} />
              )}
              {ball.patternType === 'dots' && (
                <DotsPattern cx={cx} cy={cy} r={ball.ballRadius} />
              )}
              {ball.patternType === 'sparkle' && (
                <SparklePattern cx={cx} cy={cy} r={ball.ballRadius} />
              )}

              {/* Realistic Curved Glass Specular Highlight */}
              <GlassGloss cx={cx} cy={cy} r={ball.ballRadius} />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

// SVG Definitions for Rich, Vibrant 3D Bauble Gradients
const BallGradients: React.FC = () => (
  <>
    {/* Ruby Red Velvet */}
    <radialGradient id="xmas-grad-ruby" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stopColor="#FF6B6B" />
      <stop offset="35%" stopColor="#E53935" />
      <stop offset="75%" stopColor="#B71C1C" />
      <stop offset="100%" stopColor="#4A0000" />
    </radialGradient>

    {/* Imperial 24K Gold */}
    <radialGradient id="xmas-grad-gold" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#FFF9C4" />
      <stop offset="30%" stopColor="#FACC15" />
      <stop offset="70%" stopColor="#CA8A04" />
      <stop offset="100%" stopColor="#713F12" />
    </radialGradient>

    {/* Emerald Pine Green */}
    <radialGradient id="xmas-grad-emerald" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#86EFAC" />
      <stop offset="30%" stopColor="#22C55E" />
      <stop offset="70%" stopColor="#15803D" />
      <stop offset="100%" stopColor="#064E3B" />
    </radialGradient>

    {/* Amethyst Royal Purple */}
    <radialGradient id="xmas-grad-amethyst" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#F5D0FE" />
      <stop offset="30%" stopColor="#C084FC" />
      <stop offset="70%" stopColor="#7E22CE" />
      <stop offset="100%" stopColor="#3B0764" />
    </radialGradient>

    {/* Sapphire Ocean Blue */}
    <radialGradient id="xmas-grad-sapphire" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#BAE6FD" />
      <stop offset="30%" stopColor="#38BDF8" />
      <stop offset="70%" stopColor="#0284C7" />
      <stop offset="100%" stopColor="#082F49" />
    </radialGradient>

    {/* Rose Gold / Magenta */}
    <radialGradient id="xmas-grad-rosegold" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#FFE4E6" />
      <stop offset="35%" stopColor="#FB7185" />
      <stop offset="75%" stopColor="#E11D48" />
      <stop offset="100%" stopColor="#4C0519" />
    </radialGradient>

    {/* Turquoise Mint */}
    <radialGradient id="xmas-grad-turquoise" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#A7F3D0" />
      <stop offset="35%" stopColor="#2DD4BF" />
      <stop offset="75%" stopColor="#0F766E" />
      <stop offset="100%" stopColor="#042F2E" />
    </radialGradient>

    {/* Metallic Cap Gradient */}
    <linearGradient id="xmas-grad-cap" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFFBEB" />
      <stop offset="50%" stopColor="#F59E0B" />
      <stop offset="100%" stopColor="#B45309" />
    </linearGradient>
  </>
);

// Metallic Ornament Cap & Eyelet Loop
const BallCap: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    {/* Eyelet Ring */}
    <circle
      cx={x}
      cy={y}
      r="2"
      stroke="#D4AF37"
      strokeWidth="1.1"
      fill="none"
    />
    {/* Golden Fluted Crown */}
    <path
      d={`M ${x - 3} ${y + 0.8} L ${x + 3} ${y + 0.8} L ${x + 3.8} ${y + 4} L ${x - 3.8} ${y + 4} Z`}
      fill="url(#xmas-grad-cap)"
      stroke="#B45309"
      strokeWidth="0.5"
    />
  </g>
);

// Curved Glass Specular Highlight (Makes the sphere look like real glossy glass)
const GlassGloss: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <g opacity="0.65">
    <ellipse
      cx={cx - r * 0.32}
      cy={cy - r * 0.32}
      rx={r * 0.38}
      ry={r * 0.22}
      transform={`rotate(-35 ${cx - r * 0.32} ${cy - r * 0.32})`}
      fill="#FFFFFF"
    />
    <ellipse
      cx={cx + r * 0.35}
      cy={cy + r * 0.4}
      rx={r * 0.2}
      ry={r * 0.08}
      transform={`rotate(-25 ${cx + r * 0.35} ${cy + r * 0.4})`}
      fill="#FFFFFF"
      opacity="0.3"
    />
  </g>
);

// Snowflake Pattern
const SnowflakePattern: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const arm = r * 0.48;
  return (
    <g stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.8">
      {/* 6-arm snowflake */}
      <line x1={cx} y1={cy - arm} x2={cx} y2={cy + arm} />
      <line x1={cx - arm * 0.866} y1={cy - arm * 0.5} x2={cx + arm * 0.866} y2={cy + arm * 0.5} />
      <line x1={cx - arm * 0.866} y1={cy + arm * 0.5} x2={cx + arm * 0.866} y2={cy - arm * 0.5} />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="1.2" fill="#FFF" />
    </g>
  );
};

// Golden Starburst Pattern
const StarPattern: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const d = r * 0.45;
  return (
    <g fill="#FFE57F" opacity="0.85">
      <path
        d={`M ${cx} ${cy - d} Q ${cx} ${cy} ${cx + d} ${cy} Q ${cx} ${cy} ${cx} ${cy + d} Q ${cx} ${cy} ${cx - d} ${cy} Q ${cx} ${cy} ${cx} ${cy - d} Z`}
      />
      <circle cx={cx} cy={cy} r="1.2" fill="#FFFFFF" />
    </g>
  );
};

// Festive Chevron / Wave Stripes
const StripesPattern: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const w = r * 0.75;
  return (
    <g stroke="#FFF9C4" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" fill="none">
      <path d={`M ${cx - w} ${cy - 1.5} Q ${cx - w / 2} ${cy - 4} ${cx} ${cy - 1.5} T ${cx + w} ${cy - 1.5}`} />
      <path d={`M ${cx - w} ${cy + 2.5} Q ${cx - w / 2} ${cy} ${cx} ${cy + 2.5} T ${cx + w} ${cy + 2.5}`} />
    </g>
  );
};

// Festive Polka Dots
const DotsPattern: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const d = r * 0.4;
  return (
    <g fill="#FFFFFF" opacity="0.8">
      <circle cx={cx - d} cy={cy} r="1" />
      <circle cx={cx + d} cy={cy} r="1" />
      <circle cx={cx} cy={cy - d} r="1" />
      <circle cx={cx} cy={cy + d} r="1" />
      <circle cx={cx} cy={cy} r="1.4" fill="#FFF9C4" />
    </g>
  );
};

// Sparkle Star Cluster
const SparklePattern: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  return (
    <g fill="#FFFFFF" opacity="0.9">
      {/* 4-point diamond star */}
      <polygon points={`${cx},${cy - 4} ${cx + 1.5},${cy} ${cx},${cy + 4} ${cx - 1.5},${cy}`} />
      <polygon points={`${cx - 4},${cy} ${cx},${cy + 1.5} ${cx + 4},${cy} ${cx},${cy - 1.5}`} />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.25} r="0.8" fill="#FFE57F" />
      <circle cx={cx + r * 0.35} cy={cy + r * 0.25} r="0.8" fill="#FFE57F" />
    </g>
  );
};
