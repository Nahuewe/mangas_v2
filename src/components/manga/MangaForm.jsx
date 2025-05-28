import { useState, useEffect } from 'react'
import { useSearchAutores, useSearchDibujantes, useCreateAutor, useCreateDibujante } from '../../hooks/useMangas'
import { ImageUpload } from '../ui/ImageUpload'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { SearchInput } from '../ui/SearchInput'

export function MangaForm ({ manga, onSubmit, onCancel, isLoading = false, title }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    dibujante: '',
    tomos: 0,
    tomosLeidos: 0,
    tomosComprados: 0,
    estado: 'Plan de lectura',
    sinopsis: '',
    imagen: '',
    editorial: '',
    tamañoTomo: ''
  })

  const [tomosType, setTomosType] = useState('numero')
  const [autorQuery, setAutorQuery] = useState('')
  const [dibujanteQuery, setDibujanteQuery] = useState('')
  const [autorEsDibujante, setAutorEsDibujante] = useState(false)

  // Queries y mutations
  const { data: autoresSuggestions = [], isLoading: isLoadingAutores } = useSearchAutores(autorQuery)
  const { data: dibujantesSuggestions = [], isLoading: isLoadingDibujantes } = useSearchDibujantes(dibujanteQuery)
  const createAutorMutation = useCreateAutor()
  const createDibujanteMutation = useCreateDibujante()

  useEffect(() => {
    if (manga) {
      setFormData({
        titulo: manga.titulo,
        autor: manga.autor,
        dibujante: manga.dibujante,
        tomos: manga.tomos === 'en_emision' ? 0 : manga.tomos,
        tomosLeidos: manga.tomosLeidos,
        tomosComprados: manga.tomosComprados || 0,
        estado: manga.estado,
        sinopsis: manga.sinopsis || '',
        imagen: manga.imagen || '',
        editorial: manga.editorial || '',
        tamañoTomo: manga.tamañoTomo || ''
      })
      setTomosType(manga.tomos === 'en_emision' ? 'en_emision' : 'numero')
      setAutorQuery(manga.autor)
      setDibujanteQuery(manga.dibujante)
      setAutorEsDibujante(manga.autor === manga.dibujante)
    }
  }, [manga])

  // Sincronizar dibujante con autor cuando está marcado
  useEffect(() => {
    if (autorEsDibujante && formData.autor) {
      setFormData((prev) => ({ ...prev, dibujante: prev.autor }))
      setDibujanteQuery(formData.autor)
    }
  }, [autorEsDibujante, formData.autor])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      ...formData,
      tomos: tomosType === 'en_emision' ? 'en_emision' : formData.tomos
    }

    await onSubmit(submitData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'tomos' || name === 'tomosLeidos' || name === 'tomosComprados' ? Number.parseInt(value) || 0 : value
    }))
  }

  const handleTomosTypeChange = (type) => {
    setTomosType(type)
    if (type === 'en_emision') {
      setFormData((prev) => ({ ...prev, tomos: 0 }))
    }
  }

  const handleAutorChange = (value) => {
    setAutorQuery(value)
    setFormData((prev) => ({ ...prev, autor: value }))
  }

  const handleAutorSelect = (autor) => {
    setFormData((prev) => ({ ...prev, autor }))
    setAutorQuery(autor)
  }

  const handleDibujanteChange = (value) => {
    if (!autorEsDibujante) {
      setDibujanteQuery(value)
      setFormData((prev) => ({ ...prev, dibujante: value }))
    }
  }

  const handleDibujanteSelect = (dibujante) => {
    if (!autorEsDibujante) {
      setFormData((prev) => ({ ...prev, dibujante }))
      setDibujanteQuery(dibujante)
    }
  }

  const handleAddNewAutor = async (nombre) => {
    try {
      await createAutorMutation.mutateAsync({ nombre, biografia: '' })
      setFormData((prev) => ({ ...prev, autor: nombre }))
      setAutorQuery(nombre)
    } catch (error) {
      console.error('Error creating autor:', error)
    }
  }

  const handleAddNewDibujante = async (nombre) => {
    try {
      await createDibujanteMutation.mutateAsync({ nombre, biografia: '' })
      setFormData((prev) => ({ ...prev, dibujante: nombre }))
      setDibujanteQuery(nombre)
    } catch (error) {
      console.error('Error creating dibujante:', error)
    }
  }

  const handleAutorEsDibujanteChange = (e) => {
    const checked = e.target.checked
    setAutorEsDibujante(checked)

    if (checked && formData.autor) {
      setFormData((prev) => ({ ...prev, dibujante: prev.autor }))
      setDibujanteQuery(formData.autor)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-soft p-6 border border-gray-200 animate-fadeIn'>
      <h3 className='text-lg font-semibold text-gray-900 mb-6'>{title}</h3>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <ImageUpload
          value={formData.imagen}
          onChange={(imageUrl) => setFormData((prev) => ({ ...prev, imagen: imageUrl }))}
          onRemove={() => setFormData((prev) => ({ ...prev, imagen: '' }))}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='titulo' className='block text-sm font-medium text-gray-700 mb-2'>
              Título *
            </label>
            <input
              type='text'
              id='titulo'
              name='titulo'
              value={formData.titulo}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='Nombre del manga'
            />
          </div>

          <div>
            <label htmlFor='estado' className='block text-sm font-medium text-gray-700 mb-2'>
              Estado
            </label>
            <select
              id='estado'
              name='estado'
              value={formData.estado}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            >
              <option value='Plan de lectura'>Plan de lectura</option>
              <option value='Leyendo'>Leyendo</option>
              <option value='Completado'>Completado</option>
              <option value='En pausa'>En pausa</option>
              <option value='Abandonado'>Abandonado</option>
            </select>
          </div>
        </div>

        <div className='space-y-4'>
          <SearchInput
            label='Autor'
            value={formData.autor}
            onChange={handleAutorChange}
            onSelect={handleAutorSelect}
            onAddNew={handleAddNewAutor}
            suggestions={autoresSuggestions}
            isLoading={isLoadingAutores}
            placeholder='Buscar autor...'
            addNewText='Agregar nuevo autor'
            required
          />

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='autorEsDibujante'
              checked={autorEsDibujante}
              onChange={handleAutorEsDibujanteChange}
              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors'
            />
            <label htmlFor='autorEsDibujante' className='text-sm font-medium text-gray-700'>
              El autor es también el dibujante
            </label>
          </div>

          <div className={autorEsDibujante ? 'opacity-50 pointer-events-none' : ''}>
            <SearchInput
              label='Dibujante'
              value={formData.dibujante}
              onChange={handleDibujanteChange}
              onSelect={handleDibujanteSelect}
              onAddNew={!autorEsDibujante ? handleAddNewDibujante : undefined}
              suggestions={dibujantesSuggestions}
              isLoading={isLoadingDibujantes}
              placeholder={autorEsDibujante ? 'Se usará el mismo autor' : 'Buscar dibujante...'}
              addNewText='Agregar nuevo dibujante'
              required
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Tomos Totales</label>
            <div className='space-y-2'>
              <div className='flex gap-4'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    checked={tomosType === 'numero'}
                    onChange={() => handleTomosTypeChange('numero')}
                    className='mr-2 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='text-sm'>Número específico</span>
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    checked={tomosType === 'en_emision'}
                    onChange={() => handleTomosTypeChange('en_emision')}
                    className='mr-2 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='text-sm'>En emisión</span>
                </label>
              </div>
              {tomosType === 'numero' && (
                <input
                  type='number'
                  name='tomos'
                  value={formData.tomos}
                  onChange={handleChange}
                  min='0'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                />
              )}
              {tomosType === 'en_emision' && (
                <div className='px-3 py-2 bg-orange-50 border border-orange-200 rounded-md text-sm text-orange-700'>
                  Manga en emisión
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor='tomosComprados' className='block text-sm font-medium text-gray-700 mb-2'>
              Tomos Comprados
            </label>
            <input
              type='number'
              id='tomosComprados'
              name='tomosComprados'
              value={formData.tomosComprados}
              onChange={handleChange}
              min='0'
              max={tomosType === 'numero' ? formData.tomos : undefined}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            />
          </div>

          <div>
            <label htmlFor='tomosLeidos' className='block text-sm font-medium text-gray-700 mb-2'>
              Tomos Leídos
            </label>
            <input
              type='number'
              id='tomosLeidos'
              name='tomosLeidos'
              value={formData.tomosLeidos}
              onChange={handleChange}
              min='0'
              max={formData.tomosComprados}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            />
            <p className='text-xs text-gray-500 mt-1'>Máximo: {formData.tomosComprados} (comprados)</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='editorial' className='block text-sm font-medium text-gray-700 mb-2'>
              Editorial
            </label>
            <input
              type='text'
              id='editorial'
              name='editorial'
              value={formData.editorial}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Ivrea, Panini, Kemuri...'
            />
          </div>

          <div>
            <label htmlFor='tamañoTomo' className='block text-sm font-medium text-gray-700 mb-2'>
              Tamaño del Tomo
            </label>
            <select
              id='tamañoTomo'
              name='tamañoTomo'
              value={formData.tamañoTomo}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Seleccionar tamaño</option>
              <option value='C6'>C6</option>
              <option value='B6'>B6</option>
              <option value='A5'>A5</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor='sinopsis' className='block text-sm font-medium text-gray-700 mb-2'>
            Sinopsis
          </label>
          <textarea
            id='sinopsis'
            name='sinopsis'
            value={formData.sinopsis}
            onChange={handleChange}
            rows={4}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            placeholder='Descripción del manga...'
          />
        </div>

        <div className='flex gap-3 pt-4'>
          <button
            type='submit'
            disabled={isLoading}
            className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors'
          >
            {isLoading && <LoadingSpinner size='sm' />}
            {isLoading ? (manga ? 'Actualizando...' : 'Agregando...') : manga ? 'Actualizar Manga' : 'Agregar Manga'}
          </button>

          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
