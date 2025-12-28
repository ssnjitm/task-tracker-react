import React from 'react'
import type { Task } from '../../types/task'

interface TaskStatsProps {
  tasks: Task[]
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
    mediumPriority: tasks.filter(t => t.priority === 'medium').length,
    lowPriority: tasks.filter(t => t.priority === 'low').length,
  }

  const completionRate = tasks.length > 0 ? (stats.completed / tasks.length) * 100 : 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Task Analytics</h3>
      
      <div className="space-y-6">
                <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completion Rate</span>
            <span className="text-sm font-medium text-gray-900">
              {completionRate.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Priority Distribution</h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">High Priority</span>
                </div>
                <span className="text-sm font-medium">
                  {stats.highPriority}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-red-500 h-1 rounded-full"
                  style={{ width: `${(stats.highPriority / stats.total) * 100 || 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Medium Priority</span>
                </div>
                <span className="text-sm font-medium">
                  {stats.mediumPriority}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-yellow-500 h-1 rounded-full"
                  style={{ width: `${(stats.mediumPriority / stats.total) * 100 || 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Low Priority</span>
                </div>
                <span className="text-sm font-medium">
                  {stats.lowPriority}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full"
                  style={{ width: `${(stats.lowPriority / stats.total) * 100 || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Status Breakdown</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-xs text-gray-500 mt-1">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-xs text-gray-500 mt-1">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-gray-500 mt-1">Completed</div>
            </div>
          </div>
        </div>

        {tasks.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Overdue Tasks</h4>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <span className="text-red-600 font-medium">
                {tasks.filter(task => 
                  new Date(task.dueDate) < new Date() && task.status !== 'done'
                ).length}
              </span>
              <span className="text-sm text-gray-600 ml-2">tasks overdue</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskStats