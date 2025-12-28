import React from 'react'
import TaskItem from './TaskItem'
import type{ Task, TaskStatus } from '../../types/task'

// interface TaskListProps {
//   tasks: Task[]
//   onEdit: (task: Task) => void
//   onDelete: (id: string) => void
//   onUpdateStatus: (id: string, status: TaskStatus) => void
// }
interface TaskListProps {
  tasks: Task[]
  showActions?: boolean
  onEdit?: (task: Task) => void
  onDelete?: (id: string) => void
  onUpdateStatus?: (id: string, status: TaskStatus) => void
}


const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onUpdateStatus }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  )
}

export default TaskList