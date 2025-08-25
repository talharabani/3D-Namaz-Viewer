import React, { useState, useEffect } from 'react';
import { Progress, ProgressLabel, ProgressTrack, ProgressValue } from './animate-ui/base/progress';
import { useTranslation } from '../utils/translations';

export const BaseProgressDemo = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 25;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setProgress(0), 4000);
    }
  }, [progress]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-amber-200 dark:border-amber-700">
      <Progress value={progress} className="w-[300px] space-y-2">
        <div className="flex items-center justify-between gap-1">
          <ProgressLabel className="text-sm font-medium text-amber-800 dark:text-amber-200">
            {t('exportData')}
          </ProgressLabel>
          <span className="text-sm text-amber-700 dark:text-amber-300">
            <ProgressValue />
            %
          </span>
        </div>
        <ProgressTrack value={progress} />
      </Progress>
    </div>
  );
};

export default BaseProgressDemo;
