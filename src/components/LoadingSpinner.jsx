import React from 'react';
import { useTranslation } from '../utils/translations';

export default function LoadingSpinner({ 
  size = 'medium', 
  text = '', 
  fullScreen = false,
  className = '' 
}) {
  const { t } = useTranslation();

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  const Spinner = () => (
    <div className={`animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 ${spinnerSize}`}></div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <Spinner />
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            {text || t('loading')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="mb-2">
          <Spinner />
        </div>
        {text && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {text}
          </div>
        )}
      </div>
    </div>
  );
}
