import React from 'react';

/**
 * Custom Toggle Component
 * A simple, reliable toggle switch that works without external dependencies
 * 
 * @param {boolean} isActive - Current state of the toggle
 * @param {function} onChange - Callback function when toggle state changes
 * @param {string} size - Size of the toggle ('small', 'medium', 'large')
 * @param {boolean} disabled - Whether the toggle is disabled
 * @param {string} stroke - Color for the toggle (kept for compatibility)
 * @param {object} props - Additional props to pass to the button
 */
const ToggleLeft = ({
  isActive = false,
  onChange,
  size = 'medium',
  disabled = false,
  stroke = "#956D37", // Keep stroke prop for compatibility
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!isActive);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const sizeClasses = {
    small: 'w-10 h-6',
    medium: 'w-12 h-7',
    large: 'w-14 h-8'
  };

  const circleSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const circlePositions = {
    small: isActive ? 'translate-x-4' : 'translate-x-0.5',
    medium: isActive ? 'translate-x-5' : 'translate-x-0.5',
    large: isActive ? 'translate-x-6' : 'translate-x-0.5'
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-label={isActive ? 'Enabled' : 'Disabled'}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2
        ${sizeClasses[size]}
        ${isActive 
          ? 'bg-brass shadow-inner' 
          : 'bg-gray-300 dark:bg-gray-600'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:shadow-md active:scale-95'
        }
      `}
      {...props}
    >
      <span
        className={`
          inline-block rounded-full bg-white shadow-lg transform transition-all duration-300 ease-in-out
          ${circleSizes[size]}
          ${circlePositions[size]}
        `}
      />
    </button>
  );
};

export { ToggleLeft }; 