import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskStatus } from '../../types';
import { TaskCard } from './TaskCard';
import { getStatusLabel, getStatusColor } from '../../utils/helpers';

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Array<{ id: string; [key: string]: unknown }>;
}

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg min-w-[280px] max-w-[280px] max-h-full"
      role="region"
      aria-label={`${title} column`}
    >
      <div className={`p-3 rounded-t-lg border-b-2 ${getStatusColor(id).replace('text-', 'border-')}`}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm text-gray-700 dark:text-gray-200">
            {getStatusLabel(title)}
          </h2>
          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 p-2 overflow-y-auto space-y-2 transition-colors ${isOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
        style={{ minHeight: '100px' }}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task as never} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 text-gray-400 dark:text-gray-500 text-sm">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
