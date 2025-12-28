import React from 'react'
import { format } from 'date-fns'
import type { Task, TaskStatus } from '../../types/task'

interface TaskItemProps {
  task: Task
  showActions?: boolean
  onEdit?: (task: Task) => void  
  onDelete?: (id: string) => void
  onUpdateStatus?: (id: string, status: TaskStatus) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  showActions = true,
  onEdit,
  onDelete,
  onUpdateStatus 
}) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'done': return 'bg-green-100 text-green-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'

  return (
    <div className={`bg-white border rounded-xl p-5 hover:shadow-md transition-all 
                    ${isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {onUpdateStatus && (
              <input
                type="checkbox"
                checked={task.status === 'done'}
                onChange={(e) => onUpdateStatus(task.id, e.target.checked ? 'done' : 'pending')}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
            )}
            <h3 className={`font-semibold ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
              {task.status === 'in-progress' ? 'In Progress' : task.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority} priority
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
              {isOverdue && <span className="text-red-500 ml-1">(Overdue)</span>}
            </span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex items-center gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskItem