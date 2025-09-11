import { useEffect, useState } from 'react'

function ToDoList() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (tasks.length > 10) {
      alert('У вас более 10 задач для выполнения')
    }
  }, [tasks])

  const handleAddTask = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setTasks(prev => [...prev, trimmed])
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'left' }}>
      <h2>ToDo List</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Новая задача"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleAddTask}>Добавить задачу</button>
      </div>
      <ul style={{ marginTop: 16 }}>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList


