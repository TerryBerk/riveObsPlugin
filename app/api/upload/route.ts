import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 })
    }

    if (!file.name.endsWith('.riv')) {
      return NextResponse.json({ error: 'Поддерживаются только .riv файлы' }, { status: 400 })
    }

    // Получаем байты файла
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Создаем безопасное имя файла
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filepath = path.join(process.cwd(), 'public', 'animations', filename)

    // Сохраняем файл
    await writeFile(filepath, buffer)

    return NextResponse.json({ 
      success: true, 
      url: `/animations/${filename}`,
      filename: filename,
      message: 'Файл успешно загружен' 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Ошибка при загрузке файла' },
      { status: 500 }
    )
  }
} 