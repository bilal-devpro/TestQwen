import React from 'react';
import { User } from '../types';

interface AvatarProps {
  user: User | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export function Avatar({ user, size = 'md', showName = false }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  if (!user) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center`}
        aria-label="Unassigned"
      >
        <span className="text-gray-600 dark:text-gray-400">?</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full ring-2 ring-white dark:ring-gray-800 object-cover`}
        loading="lazy"
      />
      {showName && (
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user.name}
        </span>
      )}
    </div>
  );
}
