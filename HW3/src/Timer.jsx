import React, { useEffect, useState } from 'react'

export default function Timer() {
  const [inputSeconds, setInputSeconds] = useState('')
  const [timeLeft, setTimeLeft] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    if (timeLeft === 0) {
      setIsRunning(false)
      alert('Время вышло!')
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return prev
        return prev > 0 ? prev - 1 : 0
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [isRunning, timeLeft])

  const handleStart = () => {
    const parsed = parseInt(inputSeconds, 10)
    if (Number.isNaN(parsed) || parsed < 0) {
      alert('Пожалуйста, введите неотрицательное целое число секунд.')
      return
    }
    setTimeLeft(parsed)
    setIsRunning(true)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8, maxWidth : 260}}>
      <label>
        Введите время в секундах:
        <input 
          type="number"
          min={0}
          value={inputSeconds}
          onChange={e => setInputSeconds(e.target.value)}
          disabled={isRunning}
          style={{marginLeft: 8}}
        />
        </label>
        <button onClick ={handleStart} disabled={isRunning}>Старт</button>
        <div>
          Текущее значение : {timeLeft===null?'-':timeLeft}
        </div>
    </div>
  )
}