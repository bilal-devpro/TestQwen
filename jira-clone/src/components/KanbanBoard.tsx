import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useStore } from '../store/useStore';
import { BoardColumn } from '../types';
import { KanbanColumn } from './KanbanColumn';
import { KanbanTask } from './KanbanTask';

const columns: BoardColumn[] = [
  { id: 'backlog', title: 'Backlog', status: 'backlog' },
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
  { id: 'review', title: 'Review', status: 'review' },
  { id: 'done', title: 'Done', status: 'done' }
];

export const KanbanBoard: React.FC = () => {
  const { tasks, updateTask } = useStore();
  const [activeTask, setActiveTask] = useState<any>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      updateTask(active.id as string, {
        status: over.id as any
      });
    }
    
    setActiveTask(null);
  };

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SortableContext items={columns.map(col => col.id)} strategy={verticalListSortingStrategy}>
          {columns.map(column => (
            <KanbanColumn 
              key={column.id} 
              column={column} 
              tasks={tasks.filter(task => task.status === column.status)} 
            />
          ))}
        </SortableContext>
      </div>
      
      <DragOverlay>
        {activeTask ? <KanbanTask task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
