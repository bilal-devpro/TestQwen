import { User, Task, Project, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=0ea5e9&color=fff'
  },
  {
    id: 'user2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=ec4899&color=fff'
  },
  {
    id: 'user3',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Sam+Wilson&background=f97316&color=fff'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'project1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-03-20T14:30:00Z'
  },
  {
    id: 'project2',
    name: 'Mobile App Launch',
    description: 'Launch new mobile application',
    createdAt: '2025-02-01T09:00:00Z',
    updatedAt: '2025-03-25T11:15:00Z'
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment1',
    taskId: 'task1',
    userId: 'user1',
    content: 'This looks great! Just need to adjust the header alignment.',
    createdAt: '2025-03-20T10:30:00Z'
  },
  {
    id: 'comment2',
    taskId: 'task1',
    userId: 'user2',
    content: 'I can take care of that tomorrow morning.',
    createdAt: '2025-03-20T11:15:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'Design homepage layout',
    description: 'Create wireframes and high-fidelity mockups for the new homepage',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'user1',
    projectId: 'project1',
    dueDate: '2025-04-10',
    createdAt: '2025-03-15T09:00:00Z',
    updatedAt: '2025-03-20T14:30:00Z',
    comments: [mockComments[0], mockComments[1]]
  },
  {
    id: 'task2',
    title: 'Implement authentication',
    description: 'Set up login and registration functionality with JWT tokens',
    status: 'todo',
    priority: 'critical',
    assigneeId: 'user2',
    projectId: 'project2',
    dueDate: '2025-04-15',
    createdAt: '2025-03-18T10:15:00Z',
    updatedAt: '2025-03-18T10:15:00Z',
    comments: []
  },
  {
    id: 'task3',
    title: 'Write API documentation',
    description: 'Document all endpoints with examples and usage instructions',
    status: 'review',
    priority: 'medium',
    assigneeId: 'user3',
    projectId: 'project1',
    dueDate: '2025-04-05',
    createdAt: '2025-03-10T13:45:00Z',
    updatedAt: '2025-03-22T09:20:00Z',
    comments: []
  },
  {
    id: 'task4',
    title: 'Fix responsive issues',
    description: 'Resolve layout problems on mobile devices',
    status: 'done',
    priority: 'high',
    assigneeId: 'user1',
    projectId: 'project1',
    dueDate: '2025-03-25',
    createdAt: '2025-03-05T11:30:00Z',
    updatedAt: '2025-03-24T16:45:00Z',
    comments: []
  },
  {
    id: 'task5',
    title: 'Add push notifications',
    description: 'Implement push notification functionality for important updates',
    status: 'backlog',
    priority: 'low',
    assigneeId: null,
    projectId: 'project2',
    createdAt: '2025-03-22T14:20:00Z',
    updatedAt: '2025-03-22T14:20:00Z',
    comments: []
  }
];
