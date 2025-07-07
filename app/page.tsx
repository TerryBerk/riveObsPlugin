'use client'

import { useState } from 'react'
import { useRive } from '@rive-app/react-canvas'

export default function Home() {
  const [animationState, setAnimationState] = useState('idle')
  
  const { RiveComponent } = useRive({
    src: '/animations/example.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    onLoad: () => {
      console.log('Rive animation loaded')
    },
  })

  const handleStateChange = (state: string) => {
    setAnimationState(state)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Rive Animation</h2>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <RiveComponent />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Animation Controls</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleStateChange('idle')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Idle
            </button>
            <button
              onClick={() => handleStateChange('active')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Active
            </button>
            <button
              onClick={() => handleStateChange('hover')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            >
              Hover
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Animation Status</h3>
          <p className="text-gray-600">Current State: <span className="font-bold">{animationState}</span></p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Instructions</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Upload your .riv file to the public/animations folder</li>
            <li>• Use the controls to interact with the animation</li>
            <li>• Perfect for OBS Studio browser sources</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 