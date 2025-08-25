import React from 'react';
import { useTranslation } from '../utils/translations';

const LanguageIndicator = () => {
  const { currentLang, setLanguage, isRTL } = useTranslation();

  const handleLanguageToggle = () => {
    setLanguage(currentLang === 'en' ? 'ur' : 'en');
  };

  return (
    <div className={`fixed top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
      <button
        onClick={handleLanguageToggle}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105
          ${isRTL 
            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:from-amber-700 hover:to-orange-700' 
            : 'bg-white dark:bg-gray-800 text-amber-800 dark:text-amber-200 border-2 border-amber-300 dark:border-amber-600 shadow-lg hover:bg-amber-50 dark:hover:bg-gray-700'
          }
        `}
        title={currentLang === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">🌐</span>
          <span className="font-bold">{currentLang === 'en' ? 'اردو' : 'EN'}</span>
        </span>
      </button>
    </div>
  );
};

export default LanguageIndicator;
