import React from 'react';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef(({ className, value, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  >
    {children}
  </div>
));
Progress.displayName = "Progress";

const ProgressLabel = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  >
    {children}
  </div>
));
ProgressLabel.displayName = "ProgressLabel";

const ProgressTrack = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-amber-600 transition-all duration-300 ease-in-out"
      style={{ width: `${props.value || 0}%` }}
    />
  </div>
));
ProgressTrack.displayName = "ProgressTrack";

const ProgressValue = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-sm font-medium", className)}
    {...props}
  />
));
ProgressValue.displayName = "ProgressValue";

export { Progress, ProgressLabel, ProgressTrack, ProgressValue };
