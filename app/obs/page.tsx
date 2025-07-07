'use client'

import { useState, useEffect } from 'react'
import { useRive } from '@rive-app/react-canvas'

export default function OBSPage() {
  const [currentFile, setCurrentFile] = useState('/animations/radioculturashowcase.riv')
  const [animationState, setAnimationState] = useState('idle')
  
  const { RiveComponent, rive } = useRive({
    src: currentFile,
    stateMachines: 'State Machine 1',
    autoplay: true,
    onLoad: () => {
      console.log('Rive animation loaded for OBS:', currentFile)
    },
    onLoadError: (error) => {
      console.error('Rive animation load error:', error)
    },
  })

  // Слушаем изменения состояния через API
  useEffect(() => {
    const checkForStateChanges = async () => {
      try {
        const response = await fetch('/api/animation')
        if (response.ok) {
          const data = await response.json()
          if (data.state && data.state !== animationState) {
            setAnimationState(data.state)
            
            // Применяем состояние к анимации
            if (rive) {
              try {
                const stateMachine = rive.stateMachineInputs('State Machine 1')
                if (stateMachine) {
                  const trigger = stateMachine.find((input) => input.name === data.state)
                  if (trigger && 'fire' in trigger) {
                    (trigger as any).fire()
                  }
                  
                  const stateInput = stateMachine.find((input) => input.name === 'state' || input.name === 'State')
                  if (stateInput) {
                    const stateMap: { [key: string]: number } = {
                      'idle': 0,
                      'active': 1,
                      'hover': 2
                    }
                    stateInput.value = stateMap[data.state] || 0
                  }
                }
              } catch (error) {
                console.warn('Could not set animation state:', error)
              }
            }
          }
        }
      } catch (error) {
        console.error('Error checking animation state:', error)
      }
    }

    // Проверяем состояние каждые 100ms для отзывчивости
    const interval = setInterval(checkForStateChanges, 100)
    return () => clearInterval(interval)
  }, [animationState, rive])

  // Обработка горячих клавиш
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      let newState = ''
      switch(e.key) {
        case '1':
          newState = 'idle'
          break
        case '2':
          newState = 'active'
          break
        case '3':
          newState = 'hover'
          break
        default:
          return
      }
      
      if (newState && newState !== animationState) {
        setAnimationState(newState)
        
        // Отправляем состояние в API
        fetch('/api/animation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state: newState, animation: currentFile }),
        }).catch(error => console.error('Error updating animation state:', error))
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [animationState, currentFile])

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-full h-full">
        <RiveComponent />
      </div>
      
      {/* Скрытая информация для отладки */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-20 hover:opacity-100 transition-opacity">
        {animationState} | {currentFile.split('/').pop()}
      </div>
    </div>
  )
} 