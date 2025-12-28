import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatsCard from '../components/common/StatsCard'
import TaskList from '../components/tasks/TaskList'
import TaskStats from '../components/tasks/TaskStats'
import type { Task } from '../types/task'
import { mockAPI } from '../services/mockAPI'

const Dashboard: React.FC = () => {
  const [recentTasks, setRecentTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecentTasks()
  }, [])

  const loadRecentTasks = async () => {
    try {
      setLoading(true)
      const tasks = await mockAPI.getTasks()
      const recent = tasks
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
      setRecentTasks(recent)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: recentTasks.length,
    pending: recentTasks.filter(t => t.status === 'pending').length,
    inProgress: recentTasks.filter(t => t.status === 'in-progress').length,
    done: recentTasks.filter(t => t.status === 'done').length,
  }

  return (
    <div className="space-y-8">
      {/* main page welcome section */}
      <div className="rounded-2xl bg-white p-6 text-black">
        <h2 className="text-5xl font-bold">Welcome back, Sanjeet Mijar! </h2>
        <p className="mt-2 opacity-90">Here's what's happening with your tasks today.</p>
        <div className="mt-4 flex gap-3">
          <Link
            to="/tasks"
            className="rounded-lg bg-blue-200 px-4 py-2 text-sm font-medium hover:bg-white/30"
          >
            View All Tasks
          </Link>
          <Link
            to="/tasks?action=create"
            className="rounded-lg bg-blue-200 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-100"
          >
            + New Task
          </Link>
        </div>
      </div>




      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          color="blue"
          description="All active tasks"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          color="yellow"
          description="Awaiting action"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}

          color="purple"
          description="Currently working"
        />
        <StatsCard
          title="Completed"
          value={stats.done}
          color="green"
          description="Finished tasks"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Tasks</h3>
              <Link
                to="/tasks"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View all →
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : recentTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
                <p className="text-gray-500">Create your first task to get started</p>
                <Link
                  to="/tasks?action=create"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Task
                </Link>
              </div>
            ) : (
              <TaskList
                tasks={recentTasks}
                showActions={false}
              />
            )}
          </div>
        </div>

        <div>
          <TaskStats tasks={recentTasks} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard