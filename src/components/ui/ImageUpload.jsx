import { Upload, X, ImageIcon } from 'lucide-react'
import { useState, useRef } from 'react'

export function ImageUpload ({ value, onChange, onRemove }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB')
      return
    }

    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        onChange(result)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>Imagen de Portada</label>

      {value
        ? (
          <div className='relative group'>
            <img
              src={value}
              alt='Portada del manga'
              className='w-full h-48 object-cover rounded-lg border-2 border-gray-200 transition-transform group-hover:scale-[1.02]'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center'>
              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={handleClick}
                  className='bg-white text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center gap-1 transition-colors'
                >
                  <Upload className='h-4 w-4' />
                  Cambiar
                </button>
                <button
                  type='button'
                  onClick={onRemove}
                  className='bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center gap-1 transition-colors'
                >
                  <X className='h-4 w-4' />
                  Quitar
                </button>
              </div>
            </div>
          </div>
          )
        : (
          <div
            onClick={handleClick}
            className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 cursor-pointer transition-colors'
          >
            {isUploading
              ? (
                <div className='flex flex-col items-center'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2' />
                  <p className='text-sm text-gray-600'>Subiendo imagen...</p>
                </div>
                )
              : (
                <div className='flex flex-col items-center'>
                  <ImageIcon className='h-12 w-12 text-gray-400 mb-2' />
                  <p className='text-sm font-medium text-gray-900'>Subir imagen de portada</p>
                  <p className='text-xs text-gray-500 mt-1'>PNG, JPG, WEBP hasta 5MB</p>
                </div>
                )}
          </div>
          )}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileSelect}
        className='hidden'
        disabled={isUploading}
      />
    </div>
  )
}
