import { memo, useCallback } from 'react'

function TaskItemComponent({ task, onToggle, onDelete }) {
  const handleToggle = useCallback(() => {
    onToggle(task.id)
  }, [onToggle, task.id])

  const handleDelete = useCallback(() => {
    onDelete(task.id)
  }, [onDelete, task.id])

  return (
    <li className="task-item">
      <label className="task-item__label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
        <span className={task.completed ? 'task-item__text task-item__text--done' : 'task-item__text'}>
          {task.title}
        </span>
      </label>
      <button className="task-item__delete" onClick={handleDelete} aria-label="Удалить задачу">
        Удалить
      </button>
    </li>
  )
}

const TaskItem = memo(TaskItemComponent)

export default TaskItem


