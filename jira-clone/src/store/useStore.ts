import { create } from 'zustand';
import { Task, User, Project } from '../types';
import { mockTasks, mockUsers, mockProjects } from '../data/mockData';

interface StoreState {
  tasks: Task[];
  users: User[];
  projects: Project[];
  selectedProjectId: string | null;
  searchTerm: string;
  filterStatus: string | null;
  filterPriority: string | null;
  filterAssignee: string | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setSelectedProjectId: (id: string | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: string | null) => void;
  setFilterPriority: (priority: string | null) => void;
  setFilterAssignee: (assigneeId: string | null) => void;
  getFilteredTasks: () => Task[];
}

export const useStore = create<StoreState>((set, get) => ({
  tasks: [...mockTasks],
  users: [...mockUsers],
  projects: [...mockProjects],
  selectedProjectId: null,
  searchTerm: '',
  filterStatus: null,
  filterPriority: null,
  filterAssignee: null,
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (newTask) => {
    const task: Task = {
      ...newTask,
      id: `task${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
      )
    }));
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  },
  
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilterStatus: (status) => set({ filterStatus: status }),
  
  setFilterPriority: (priority) => set({ filterPriority: priority }),
  
  setFilterAssignee: (assigneeId) => set({ filterAssignee: assigneeId }),
  
  getFilteredTasks: () => {
    const { tasks, searchTerm, filterStatus, filterPriority, filterAssignee } = get();
    
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filterStatus || task.status === filterStatus;
      const matchesPriority = !filterPriority || task.priority === filterPriority;
      const matchesAssignee = !filterAssignee || task.assigneeId === filterAssignee;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }
}));
