'use client'

import { useEffect, useState } from 'react'
import { useRive } from '@rive-app/react-canvas'

export default function ObsPage() {
  const [animationState, setAnimationState] = useState<'idle' | 'play' | 'pause' | 'stop'>('idle')
  const [currentFile, setCurrentFile] = useState<string>('/animations/radioculturashowcase.riv')
  const { RiveComponent, rive } = useRive({
    src: currentFile,
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoadError: (error) => {
      console.error('Ошибка загрузки Rive файла:', error)
    }
  })

  // Получение текущего состояния анимации
  useEffect(() => {
    const fetchAnimationState = async () => {
      try {
        const response = await fetch('/api/animation')
        if (response.ok) {
          const data = await response.json()
          if (data.state) {
            setAnimationState(data.state)
          }
          if (data.file) {
            setCurrentFile(data.file)
          }
        }
      } catch (error) {
        console.error('Ошибка получения состояния анимации:', error)
      }
    }

    fetchAnimationState()
    const interval = setInterval(fetchAnimationState, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-screen h-screen bg-transparent flex items-center justify-center overflow-hidden">
      <div className="w-full h-full bg-transparent flex items-center justify-center">
        <div className="w-full h-full max-w-full max-h-full">
          <RiveComponent />
        </div>
      </div>
      
      {/* Скрытая информация для отладки */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-10 hover:opacity-100 transition-opacity">
        {animationState} | {currentFile ? currentFile.split('/').pop() : 'loading...'}
      </div>
    </div>
  )
} 