import React from 'react';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { useStore } from '../../store/useStore';

export const TaskFilters: React.FC = () => {
  const { 
    searchTerm, 
    filterStatus, 
    filterPriority, 
    filterAssignee, 
    setSearchTerm, 
    setFilterStatus, 
    setFilterPriority, 
    setFilterAssignee,
    users
  } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <Select
        value={filterStatus || ''}
        onChange={(e) => setFilterStatus(e.target.value || null)}
        options={[
          { value: '', label: 'All Statuses' },
          { value: 'backlog', label: 'Backlog' },
          { value: 'todo', label: 'To Do' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'review', label: 'Review' },
          { value: 'done', label: 'Done' }
        ]}
      />
      
      <Select
        value={filterPriority || ''}
        onChange={(e) => setFilterPriority(e.target.value || null)}
        options={[
          { value: '', label: 'All Priorities' },
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'critical', label: 'Critical' }
        ]}
      />
      
      <Select
        value={filterAssignee || ''}
        onChange={(e) => setFilterAssignee(e.target.value || null)}
        options={[
          { value: '', label: 'All Assignees' },
          ...users.map(user => ({ value: user.id, label: user.name }))
        ]}
      />
    </div>
  );
};
