import React from 'react';
import { Task } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, MessageSquare } from 'lucide-react';

interface KanbanTaskProps {
  task: Task;
}

export const KanbanTask: React.FC<KanbanTaskProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const priorityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-grab border-l-4 border-blue-500"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
        <span className={`w-3 h-3 rounded-full ${priorityColors[task.priority]} ml-2 flex-shrink-0`} />
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
        {task.description}
      </p>
      
      <div className="mt-3 flex flex-wrap gap-2">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
        
        {task.comments.length > 0 && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-3 h-3 mr-1" />
            {task.comments.length}
          </div>
        )}
      </div>
    </div>
  );
};
