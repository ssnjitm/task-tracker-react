import type { Task, TaskFormData } from '../types/task'

const STORAGE_KEY = 'task_tracker_tasks_v2'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

const getStoredTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const setStoredTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const mockAPI = {
  async getTasks(): Promise<Task[]> {
    await delay(300)
    return getStoredTasks()
  },

  async createTask(taskData: TaskFormData): Promise<Task> {
    await delay(300)
    const tasks = getStoredTasks()
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    const updatedTasks = [...tasks, newTask]
    setStoredTasks(updatedTasks)
    return newTask
  },

  async updateTask(id: string, updates: Partial<TaskFormData>): Promise<Task> {
    await delay(300)
    const tasks = getStoredTasks()
    const updatedTasks = tasks.map(task =>
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    )
    setStoredTasks(updatedTasks)
    const updatedTask = updatedTasks.find(task => task.id === id)
    if (!updatedTask) throw new Error('Task not found')
    return updatedTask
  },

  async deleteTask(id: string): Promise<void> {
    await delay(300)
    const tasks = getStoredTasks()
    const updatedTasks = tasks.filter(task => task.id !== id)
    setStoredTasks(updatedTasks)
  },

  async searchTasks(query: string): Promise<Task[]> {
    await delay(200)
    const tasks = getStoredTasks()
    if (!query.trim()) return tasks
    
    const lowerQuery = query.toLowerCase()
    return tasks.filter(task =>
      task.title.toLowerCase().includes(lowerQuery) ||
      (task.description && task.description.toLowerCase().includes(lowerQuery))
    )
  },

  async clearAllTasks(): Promise<void> {
    await delay(300)
    setStoredTasks([])
  }
}