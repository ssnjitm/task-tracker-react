export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type PriorityLevel = 'low' | 'medium' | 'high';
export type SortOption = 'date' | 'name' | 'priority';
export type FilterOption = 'all' | TaskStatus;

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: TaskStatus;
  priority: PriorityLevel;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  priority: PriorityLevel;
}

export interface SearchResult {
  tasks: Task[];
  query: string;
}