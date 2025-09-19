import React from 'react';
import { useTranslation } from '../utils/translations';

export default function LanguageToggle({ currentLang, onLanguageChange, className = '' }) {
  const { t } = useTranslation();

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸', native: 'English' },
    { value: 'ur', label: 'اردو', flag: '🇵🇰', native: 'اردو' }
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('language')}:
      </span>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => onLanguageChange(lang.value)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${currentLang === lang.value
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
            title={`${lang.label} (${lang.native})`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
