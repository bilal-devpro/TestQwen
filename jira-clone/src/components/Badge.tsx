import React from 'react';
import { cn, getPriorityColor, getStatusColor } from '../utils/helpers';

interface BadgeProps {
  variant: 'priority' | 'status';
  value: string;
  className?: string;
}

export function Badge({ variant, value, className }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize min-w-[60px] justify-center';
  
  let colorClasses = '';
  
  if (variant === 'priority') {
    colorClasses = getPriorityColor(value);
  } else {
    colorClasses = getStatusColor(value);
  }

  return (
    <span className={cn(baseClasses, colorClasses, className)}>
      {value}
    </span>
  );
}
