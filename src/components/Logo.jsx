import React from 'react';

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  className = '',
  variant = 'full' // 'full', 'icon', 'text'
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xl: 'text-3xl'
  };

  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Circle */}
          <circle cx="32" cy="32" r="30" fill="url(#bgGradient)" stroke="url(#borderGradient)" stroke-width="2"/>
          
          {/* Crescent Moon */}
          <path d="M 20 32 A 12 12 0 1 1 44 32 A 12 12 0 1 1 20 32" fill="url(#moonGradient)" opacity="0.9"/>
          <path d="M 24 32 A 8 8 0 1 1 40 32 A 8 8 0 1 1 24 32" fill="url(#bgGradient)"/>
          
          {/* Star */}
          <path d="M 32 12 L 34 20 L 42 20 L 36 25 L 38 33 L 32 28 L 26 33 L 28 25 L 22 20 L 30 20 Z" fill="url(#starGradient)"/>
          
          {/* Central Islamic Symbol */}
          <g transform="translate(32, 32)">
            <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="none" stroke="url(#accentGradient)" stroke-width="1.5" opacity="0.8"/>
            <path d="M 0,-5 L 1.5,-2.5 L 4.5,-2.5 L 2,-1 L 3,2 L 0,0.5 L -3,2 L -2,-1 L -4.5,-2.5 L -1.5,-2.5 Z" fill="url(#starGradient)" opacity="0.9"/>
          </g>
          
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{stopColor:'#10B981',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#059669',stopOpacity:1}} />
            </radialGradient>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#34D399',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#10B981',stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:'#FCD34D',stopOpacity:0.9}} />
              <stop offset="100%" style={{stopColor:'#F59E0B',stopOpacity:0.9}} />
            </linearGradient>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#FCD34D',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#F59E0B',stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#6EE7B7',stopOpacity:0.8}} />
              <stop offset="100%" style={{stopColor:'#34D399',stopOpacity:0.8}} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent`}>
          NAMAZ
        </div>
        <div className={`${textSizeClasses[size]} font-normal text-gray-500`}>
          WEB
        </div>
      </div>
    );
  }

  // Full logo with icon and text
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]}`}>
        <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="url(#bgGradient)" stroke="url(#borderGradient)" stroke-width="2"/>
          <path d="M 20 32 A 12 12 0 1 1 44 32 A 12 12 0 1 1 20 32" fill="url(#moonGradient)" opacity="0.9"/>
          <path d="M 24 32 A 8 8 0 1 1 40 32 A 8 8 0 1 1 24 32" fill="url(#bgGradient)"/>
          <path d="M 32 12 L 34 20 L 42 20 L 36 25 L 38 33 L 32 28 L 26 33 L 28 25 L 22 20 L 30 20 Z" fill="url(#starGradient)"/>
          <g transform="translate(32, 32)">
            <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="none" stroke="url(#accentGradient)" stroke-width="1.5" opacity="0.8"/>
            <path d="M 0,-5 L 1.5,-2.5 L 4.5,-2.5 L 2,-1 L 3,2 L 0,0.5 L -3,2 L -2,-1 L -4.5,-2.5 L -1.5,-2.5 Z" fill="url(#starGradient)" opacity="0.9"/>
          </g>
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{stopColor:'#10B981',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#059669',stopOpacity:1}} />
            </radialGradient>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#34D399',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#10B981',stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:'#FCD34D',stopOpacity:0.9}} />
              <stop offset="100%" style={{stopColor:'#F59E0B',stopOpacity:0.9}} />
            </linearGradient>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#FCD34D',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#F59E0B',stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#6EE7B7',stopOpacity:0.8}} />
              <stop offset="100%" style={{stopColor:'#34D399',stopOpacity:0.8}} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent`}>
            NAMAZ
          </div>
          <div className={`${textSizeClasses[size]} font-normal text-gray-500 -mt-1`}>
            WEB
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
