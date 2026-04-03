import React, { useState } from 'react';
import { KanbanBoard } from '../../components/KanbanBoard';
import { TaskFilters } from './TaskFilters';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { CreateTaskModal } from './CreateTaskModal';

export const TasksPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your team's work in progress
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <TaskFilters />
      <KanbanBoard />

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
