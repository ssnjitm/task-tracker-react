import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import FilterControls from '../components/common/FilterControls'
import TaskList from '../components/tasks/TaskList'
import TaskFormModal from '../components/tasks/TaskFormModal'
import type { Task, TaskFormData, FilterOption, SortOption } from '../types/task'
import { mockAPI } from '../services/mockAPI'

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterOption>('all')
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    loadTasks()
    
    // Check if we open create modal from URL
    if (searchParams.get('action') === 'create') {
      setShowForm(true)
    }
  }, [])

  useEffect(() => {
    filterAndSortTasks()
  }, [tasks, filter, sortBy])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await mockAPI.getTasks()
      setTasks(data)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortTasks = () => {
    let filtered = [...tasks]
    
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.status === filter)
    }
    
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      } else if (sortBy === 'name') {
        return a.title.localeCompare(b.title)
      } else {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
      }
    })
    
    setFilteredTasks(filtered)
  }

  const handleAddTask = async (taskData: TaskFormData) => {
    try {
      await mockAPI.createTask(taskData)
      await loadTasks()
      setShowForm(false)
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  const handleUpdateTask = async (id: string, updates: Partial<TaskFormData>) => {
    try {
      await mockAPI.updateTask(id, updates)
      await loadTasks()
      setEditingTask(null)
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await mockAPI.deleteTask(id)
      await loadTasks()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      filterAndSortTasks()
      return
    }
    const results = await mockAPI.searchTasks(query)
    setFilteredTasks(results)
  }, [tasks])

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage and track all your tasks in one place
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      <div className="space-y-4">
        <SearchBar onSearch={handleSearch} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <FilterControls
            filter={filter}
            sortBy={sortBy}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
          />
          
          <div className="text-sm text-gray-600">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-6">Try changing your filters or create a new task</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </button>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onUpdateStatus={(id, status) => handleUpdateTask(id, { status })}
          />
        )}
      </div>

      {showForm && (
        <TaskFormModal
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTask}
        />
      )}

      {editingTask && (
        <TaskFormModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
        />
      )}
    </div>
  )
}

export default Tasks