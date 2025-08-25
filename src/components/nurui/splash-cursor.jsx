import React, { useEffect, useState } from 'react';

const SplashCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          transform: isVisible ? 'scale(1)' : 'scale(0)',
        }}
      >
        <div className="w-2 h-2 bg-amber-500 rounded-full shadow-lg" />
      </div>

      {/* Splash effect */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transform: isVisible ? 'scale(1) opacity-100' : 'scale(0) opacity-0',
        }}
      >
        <div className="w-10 h-10 bg-amber-400/30 rounded-full animate-ping" />
      </div>

      {/* Trailing effect */}
      <div
        className="fixed pointer-events-none z-30 transition-all duration-500 ease-out"
        style={{
          left: position.x - 30,
          top: position.y - 30,
          transform: isVisible ? 'scale(1) opacity-60' : 'scale(0) opacity-0',
        }}
      >
        <div className="w-16 h-16 bg-amber-300/20 rounded-full animate-pulse" />
      </div>

      {/* Outer glow */}
      <div
        className="fixed pointer-events-none z-20 transition-all duration-700 ease-out"
        style={{
          left: position.x - 40,
          top: position.y - 40,
          transform: isVisible ? 'scale(1) opacity-40' : 'scale(0) opacity-0',
        }}
      >
        <div className="w-20 h-20 bg-amber-200/10 rounded-full" />
      </div>
    </>
  );
};

export default SplashCursor;
