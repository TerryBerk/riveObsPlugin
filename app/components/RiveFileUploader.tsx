'use client'

import { useState, useCallback } from 'react'

interface RiveFileUploaderProps {
  onFileSelect: (src: string, name: string) => void
  currentFile?: string
}

export default function RiveFileUploader({ onFileSelect, currentFile }: RiveFileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [availableFiles, setAvailableFiles] = useState<string[]>([])

  // Загрузка списка доступных файлов
  const loadAvailableFiles = useCallback(async () => {
    try {
      const response = await fetch('/api/files')
      if (response.ok) {
        const files = await response.json()
        setAvailableFiles(files.filter((file: string) => file.endsWith('.riv')))
      }
    } catch (error) {
      console.error('Error loading files:', error)
    }
  }, [])

  // Обработка drag & drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setUploading(true)

    const files = Array.from(e.dataTransfer.files)
    const rivFiles = files.filter(file => file.name.endsWith('.riv'))

    if (rivFiles.length === 0) {
      alert('Пожалуйста, выберите .riv файл')
      setUploading(false)
      return
    }

    const file = rivFiles[0]
    
    try {
      // Создаем FormData для отправки файла
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        onFileSelect(result.url, file.name)
        loadAvailableFiles()
      } else {
        alert('Ошибка при загрузке файла')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Ошибка при загрузке файла')
    } finally {
      setUploading(false)
    }
  }, [onFileSelect, loadAvailableFiles])

  // Обработка URL
  const handleUrlSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      const fileName = urlInput.split('/').pop() || 'external.riv'
      onFileSelect(urlInput.trim(), fileName)
      setUrlInput('')
    }
  }, [urlInput, onFileSelect])

  // Обработка выбора файла из списка
  const handleFileSelect = useCallback((fileName: string) => {
    onFileSelect(`/animations/${fileName}`, fileName)
  }, [onFileSelect])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Загрузка Rive файлов</h3>
        
        {/* Текущий файл */}
        {currentFile && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <span className="font-medium">Текущий файл:</span> {currentFile}
            </p>
          </div>
        )}

        {/* Drag & Drop зона */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {uploading ? (
            <div className="text-blue-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p>Загрузка файла...</p>
            </div>
          ) : (
            <div className="text-gray-600">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2">Перетащите .riv файл сюда</p>
              <p className="text-sm text-gray-500">или загрузите с помощью кнопки</p>
            </div>
          )}
        </div>

        {/* Загрузка по URL */}
        <form onSubmit={handleUrlSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Введите URL к .riv файлу"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!urlInput.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Загрузить
            </button>
          </div>
        </form>

        {/* Список доступных файлов */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3">Доступные файлы:</h4>
          <div className="space-y-2">
            <button
              onClick={() => handleFileSelect('radioculturashowcase.riv')}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              <span className="font-medium">radioculturashowcase.riv</span>
              <span className="text-sm text-gray-500 ml-2">(локальный файл)</span>
            </button>
            
            {availableFiles.map((file) => (
              <button
                key={file}
                onClick={() => handleFileSelect(file)}
                className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                <span className="font-medium">{file}</span>
                <span className="text-sm text-gray-500 ml-2">(локальный файл)</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 