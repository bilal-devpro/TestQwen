import React from 'react';
import { Task } from '../types';
import { useStore } from '../store/useStore';
import { Calendar, Clock, User as UserIcon, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500'
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { users } = useStore();
  const assignee = users.find(user => user.id === task.assigneeId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className="task-card bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3 border-l-4 border-blue-500"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
        <span className={`w-3 h-3 rounded-full ${priorityColors[task.priority]} ml-2 flex-shrink-0`} />
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
        {task.description}
      </p>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {assignee && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <UserIcon className="w-3 h-3 mr-1" />
            {assignee.name}
          </div>
        )}
        
        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3 mr-1" />
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
        
        {task.comments.length > 0 && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-3 h-3 mr-1" />
            {task.comments.length}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
