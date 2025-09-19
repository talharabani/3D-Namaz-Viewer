import React from 'react';
import { useTranslation } from '../utils/translations';

export default function ThemeToggle({ theme, onThemeChange, className = '' }) {
  const { t } = useTranslation();

  const themes = [
    { value: 'auto', label: t('autoSystem'), icon: '🔄' },
    { value: 'light', label: t('light'), icon: '☀️' },
    { value: 'dark', label: t('dark'), icon: '🌙' }
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('theme')}:
      </span>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => onThemeChange(themeOption.value)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${theme === themeOption.value
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
            title={themeOption.label}
          >
            <span className="text-base">{themeOption.icon}</span>
            <span className="hidden sm:inline">{themeOption.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
