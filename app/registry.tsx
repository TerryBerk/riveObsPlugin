'use client'

import { useState } from 'react'
import { useRive } from '@rive-app/react-canvas'

interface RiveAnimationProps {
  src: string
  stateMachines?: string
  autoplay?: boolean
  className?: string
}

export function RiveAnimation({ 
  src, 
  stateMachines = 'State Machine 1', 
  autoplay = true, 
  className = '' 
}: RiveAnimationProps) {
  const { RiveComponent } = useRive({
    src,
    stateMachines,
    autoplay,
    onLoad: () => {
      console.log('Rive animation loaded:', src)
    },
  })

  return (
    <div className={`w-full h-full ${className}`}>
      <RiveComponent />
    </div>
  )
}

export function AnimationControls({ 
  onStateChange 
}: { 
  onStateChange: (state: string) => void 
}) {
  const [currentState, setCurrentState] = useState('idle')

  const handleStateChange = (state: string) => {
    setCurrentState(state)
    onStateChange(state)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Animation Controls</h3>
      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={() => handleStateChange('idle')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentState === 'idle' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Idle State
        </button>
        <button
          onClick={() => handleStateChange('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentState === 'active' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active State
        </button>
        <button
          onClick={() => handleStateChange('hover')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentState === 'hover' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Hover State
        </button>
      </div>
    </div>
  )
} 