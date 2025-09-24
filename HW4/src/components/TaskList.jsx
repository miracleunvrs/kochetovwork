import { memo } from 'react'
import TaskItem from './TaskItem'

function TaskListComponent({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return <p className="task-list__empty">Нет задач</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

const TaskList = memo(TaskListComponent)

export default TaskList


