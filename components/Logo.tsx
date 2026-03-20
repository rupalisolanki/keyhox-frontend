import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = 'dark' }) => {
  const uniqueId = useId().replace(/:/g, ''); // Remove colons for safer SVG ID usage
  const gradientId = `cardGradient-${uniqueId}`;

  // Exact colors sampled from the reference image
  const colors = {
    cardGradientStart: '#1E6F3B', // Medium Green
    cardGradientEnd: '#0D4426',   // Dark Forest Green
    pixelGreen: '#5BC254',        // Bright Green for pixels
    textKey: '#022B42',           // Dark Navy for "Key"
    textHoxStart: '#5BC254',      // Green Gradient Start
    textHoxEnd: '#2E7D32',        // Green Gradient End
    white: '#FFFFFF'
  };

  const keyTextColor = variant === 'light' ? colors.white : colors.textKey;

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {/* Icon Container */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 90 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor={colors.cardGradientStart} />
              <stop offset="100%" stopColor={colors.cardGradientEnd} />
            </linearGradient>
          </defs>

          {/* Card Background */}
          <rect x="0" y="10" width="80" height="55" rx="8" fill={`url(#${gradientId})`} />

          {/* Key Shape (White) */}
          <g fill={colors.white}>
            {/* Head */}
            <circle cx="28" cy="37" r="14" />
            {/* Shaft */}
            <rect x="38" y="33" width="30" height="9" />
            {/* Teeth */}
            <rect x="52" y="42" width="6" height="8" />
            <rect x="62" y="42" width="6" height="8" />
          </g>

          {/* Keyhole (Dark Green Cutout) */}
          <path 
            d="M28 31 C 26.5 31 25.5 32 25.5 33.5 C 25.5 34.5 26 35.5 27 36 L 26 42 L 30 42 L 29 36 C 30 35.5 30.5 34.5 30.5 33.5 C 30.5 32 29.5 31 28 31 Z" 
            fill={colors.cardGradientEnd} 
          />

          {/* Floating Pixels (Bright Green) */}
          <g fill={colors.pixelGreen}>
             <rect x="55" y="0" width="10" height="10" />
             <rect x="68" y="-5" width="9" height="9" opacity="0.9" />
             <rect x="68" y="7" width="10" height="10" />
             <rect x="80" y="2" width="8" height="8" opacity="0.8" />
             <rect x="45" y="5" width="8" height="8" opacity="0.9" />
          </g>
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex items-center tracking-tighter leading-none select-none">
        <span className="font-black text-3xl" style={{ color: keyTextColor, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em' }}>Key</span>
        <span 
            className="font-black text-3xl" 
            style={{ 
                background: `linear-gradient(135deg, ${colors.textHoxStart}, ${colors.textHoxEnd})`, 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.04em'
            }}
        >
            hox
        </span>
      </div>
    </div>
  );
};

export default Logo;