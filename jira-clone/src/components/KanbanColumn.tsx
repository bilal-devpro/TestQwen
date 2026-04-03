import React from 'react';
import { BoardColumn, Task } from '../types';
import { SortableContext, useDroppable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanTask } from './KanbanTask';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface KanbanColumnProps {
  column: BoardColumn;
  tasks: Task[];
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.status
  });

  return (
    <Card ref={setNodeRef} className="h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
        <span className="text-xs text-gray-500 dark:text-gray-400">{tasks.length} tasks</span>
      </CardHeader>
      <CardContent>
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map(task => (
              <KanbanTask key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
};
