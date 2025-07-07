'use client'

import { useState } from 'react'
import { useRive } from '@rive-app/react-canvas'
import RiveFileUploader from './components/RiveFileUploader'

export default function Home() {
  const [animationState, setAnimationState] = useState('idle')
  const [currentFile, setCurrentFile] = useState('/animations/radioculturashowcase.riv')
  const [currentFileName, setCurrentFileName] = useState('radioculturashowcase.riv')
  
  const { RiveComponent, rive } = useRive({
    src: currentFile,
    stateMachines: 'State Machine 1',
    autoplay: true,
    onLoad: () => {
      console.log('Rive animation loaded:', currentFile)
    },
    onLoadError: (error) => {
      console.error('Rive animation load error:', error)
    },
  })

  const handleStateChange = (state: string) => {
    setAnimationState(state)
    
    // Отправляем состояние в API для синхронизации с OBS страницей
    fetch('/api/animation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: state, animation: currentFile }),
    }).catch(error => console.error('Error updating animation state:', error))
    
    // Пытаемся изменить состояние в Rive
    if (rive) {
      try {
        const stateMachine = rive.stateMachineInputs('State Machine 1')
        if (stateMachine) {
          // Пытаемся найти триггер с именем состояния
          const trigger = stateMachine.find((input) => input.name === state)
          if (trigger && 'fire' in trigger) {
            (trigger as any).fire()
          }
          
          // Или пытаемся найти входной параметр state
          const stateInput = stateMachine.find((input) => input.name === 'state' || input.name === 'State')
          if (stateInput) {
            // Попробуем установить значение в зависимости от типа
            const stateMap: { [key: string]: number } = {
              'idle': 0,
              'active': 1,
              'hover': 2
            }
            stateInput.value = stateMap[state] || 0
          }
        }
      } catch (error) {
        console.warn('Could not set animation state:', error)
      }
    }
  }

  const handleFileSelect = (src: string, name: string) => {
    setCurrentFile(src)
    setCurrentFileName(name)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rive OBS Plugin</h1>
          <p className="text-gray-600">Интерактивные анимации для OBS Studio</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Загрузка файлов */}
          <div className="xl:col-span-1">
            <RiveFileUploader 
              onFileSelect={handleFileSelect}
              currentFile={currentFileName}
            />
          </div>

          {/* Анимация и контроллы */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Rive Анимация</h2>
              <div className="aspect-video bg-transparent rounded-lg overflow-hidden">
                <RiveComponent />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Контроллы анимации</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleStateChange('idle')}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      animationState === 'idle' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Idle State
                  </button>
                  <button
                    onClick={() => handleStateChange('active')}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      animationState === 'active' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Active State
                  </button>
                  <button
                    onClick={() => handleStateChange('hover')}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      animationState === 'hover' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Hover State
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Статус анимации</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Текущее состояние:</span>{' '}
                    <span className="font-bold text-blue-600">{animationState}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Файл:</span>{' '}
                    <span className="font-mono text-sm">{currentFileName}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Путь:</span>{' '}
                    <span className="font-mono text-sm">{currentFile}</span>
                  </p>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Для OBS Studio:</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Главная страница:</span>{' '}
                      <span className="font-mono">http://localhost:3000</span>
                    </p>
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Только анимация:</span>{' '}
                      <a 
                        href="/obs" 
                        target="_blank"
                        className="font-mono text-blue-600 hover:text-blue-800 underline"
                      >
                        http://localhost:3000/obs
                      </a>
                    </p>
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Размер:</span> 1920x1080
                    </p>
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Горячие клавиши:</span> 1, 2, 3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 