import { NextRequest, NextResponse } from 'next/server'

// Временное хранение состояния (в продакшене лучше использовать Redis или БД)
let currentState = {
  state: 'idle',
  animation: '/animations/radioculturashowcase.riv',
  timestamp: new Date().toISOString()
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const requestedState = searchParams.get('state')
  
  if (requestedState) {
    currentState.state = requestedState
    currentState.timestamp = new Date().toISOString()
  }
  
  return NextResponse.json({
    ...currentState,
    message: 'Animation state retrieved'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { state, animation } = body
    
    if (state) {
      currentState.state = state
      currentState.timestamp = new Date().toISOString()
    }
    
    if (animation) {
      currentState.animation = animation
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Animation state updated',
      ...currentState
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
} 