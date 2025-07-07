import { NextRequest, NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const animationsDir = path.join(process.cwd(), 'public', 'animations')
    
    // Читаем содержимое папки
    const files = await readdir(animationsDir)
    
    // Фильтруем только .riv файлы
    const rivFiles = files.filter(file => file.endsWith('.riv'))
    
    return NextResponse.json(rivFiles)
    
  } catch (error) {
    console.error('Error reading files:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении списка файлов' },
      { status: 500 }
    )
  }
} 