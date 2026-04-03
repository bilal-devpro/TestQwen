import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
};

export function NotificationContainer() {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface NotificationItemProps {
  notification: { id: string; type: string; message: string };
  onClose: () => void;
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const Icon = icons[notification.type as keyof typeof icons];
  const color = colors[notification.type as keyof typeof colors];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 min-w-[300px] max-w-md"
      style={{ borderLeftColor: color.replace('bg-', '') }}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      <p className="flex-1 text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </motion.div>
  );
}
