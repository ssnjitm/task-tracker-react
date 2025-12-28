import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import type { Task, TaskFormData, TaskStatus, PriorityLevel } from '../../types/task'

interface TaskFormModalProps {
  task?: Task
  onClose: () => void
 onSubmit: (data: TaskFormData) => void 
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    status: 'pending' as TaskStatus,
    priority: 'medium' as PriorityLevel,
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate.split('T')[0],
        status: task.status,
        priority: task.priority,
      })
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Enter task description (optional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="input-field"
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as PriorityLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: level }))}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                      formData.priority === level
                        ? level === 'high' ? 'bg-red-100 border-red-300 text-red-800' :
                          level === 'medium' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                          'bg-green-100 border-green-300 text-green-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {level === 'high' && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                      {level === 'medium' && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      )}
                      {level === 'low' && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskFormModal