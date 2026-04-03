import React, { useMemo } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, useSensor, useSensors, PointerSensor, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../../types';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { useStore } from '../../store/useStore';
import { COLUMNS } from '../../utils/helpers';

export function KanbanBoard() {
  const { tasks, moveTask, reorderTasks, setSelectedTask } = useStore();
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const tasksByStatus = useMemo(() => {
    return {
      backlog: tasks.filter((t) => t.status === 'backlog'),
      todo: tasks.filter((t) => t.status === 'todo'),
      'in-progress': tasks.filter((t) => t.status === 'in-progress'),
      review: tasks.filter((t) => t.status === 'review'),
      done: tasks.filter((t) => t.status === 'done'),
    };
  }, [tasks]);

  const handleDragStart = (event: DragOverEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as TaskStatus;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask || activeTask.status === overId) return;

    const newTasks = tasks.map((t) =>
      t.id === activeId ? { ...t, status: overId } : t
    );
    reorderTasks(newTasks as Task[]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as TaskStatus;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (activeTask && activeTask.status !== overId) {
      moveTask(activeId, overId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id as TaskStatus}
            title={column.label}
            tasks={tasksByStatus[column.id as TaskStatus]}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
}
