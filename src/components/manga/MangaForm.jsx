import { useState, useEffect } from 'react'
import { useSearchAutores, useSearchDibujantes, useCreateAutor, useCreateDibujante } from '../../hooks/useMangas'
import { ImageUpload } from '../ui/ImageUpload'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { SearchInput } from '../ui/SearchInput'

const editoriales = [
  'Ivrea', 'Panini', 'Kemuri', 'Distrito Manga', 'Ovni Press',
  'Planeta Cómic', 'Utopia', 'Merci', 'Milky Way', 'Moztroz',
  'Random Comics', 'Hotel de las Ideas', 'Kibook Ediciones'
]

const tamaños = ['Tanko', 'B6', 'A5', 'B6x2', 'C6x2', 'A5 color']

const estados = ['Leído', 'Completado', 'Leyendo', 'En pausa', 'Abandonado']

export function MangaForm ({ manga, onSubmit, onCancel, isLoading = false, title }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    dibujante: '',
    tomos: 0,
    tomosLeidos: 0,
    tomosComprados: 0,
    estado: 'Leido',
    sinopsis: '',
    imagen: '',
    editorial: '',
    tamañoTomo: ''
  })

  const [tomosType, setTomosType] = useState('numero')
  const [autorQuery, setAutorQuery] = useState('')
  const [dibujanteQuery, setDibujanteQuery] = useState('')
  const [autorEsDibujante, setAutorEsDibujante] = useState(false)

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
      setTomosType(
        manga.tomos === 'en_emision'
          ? 'en_emision'
          : manga.tomos === 'unico'
            ? 'unico'
            : 'numero'
      )
      setAutorQuery(manga.autor)
      setDibujanteQuery(manga.dibujante)
      setAutorEsDibujante(manga.autor === manga.dibujante)
    }
  }, [manga])

  useEffect(() => {
    if (autorEsDibujante && formData.autor) {
      setFormData(prev => ({ ...prev, dibujante: prev.autor }))
      setDibujanteQuery(formData.autor)
    }
  }, [autorEsDibujante, formData.autor])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : ['tomos', 'tomosLeidos', 'tomosComprados'].includes(name)
              ? parseInt(value) || 0
              : value
    }))
  }

  const handleTomosTypeChange = type => {
    setTomosType(type)
    if (type === 'en_emision' || type === 'unico') {
      setFormData(prev => ({
        ...prev,
        tomos: 0,
        tomosLeidos: 0,
        tomosComprados: 0
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const submitData = {
      ...formData,
      tomos:
        tomosType === 'en_emision'
          ? 'en_emision'
          : tomosType === 'unico'
            ? 'unico'
            : formData.tomos
    }
    await onSubmit(submitData)
    console.log(submitData)
  }

  return (
    <div className='bg-white rounded-lg shadow-soft p-6 border border-gray-200 animate-fadeIn'>
      <h3 className='text-lg font-semibold text-gray-900 mb-6'>{title}</h3>
      <form onSubmit={handleSubmit} className='space-y-6'>

        <ImageUpload
          value={formData.imagen}
          onChange={url => setFormData(prev => ({ ...prev, imagen: url }))}
          onRemove={() => setFormData(prev => ({ ...prev, imagen: '' }))}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='titulo' className='block text-sm font-medium text-gray-700 mb-2'>
              Título *
            </label>
            <input
              id='titulo'
              name='titulo'
              value={formData.titulo}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
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
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
            >
              <option value=''>Seleccionar estado</option>
              {estados.map(ed => <option key={ed} value={ed}>{ed}</option>)}
            </select>
          </div>
        </div>

        <div className='space-y-4'>
          <SearchInput
            label='Autor'
            value={formData.autor}
            onChange={val => setFormData(prev => ({ ...prev, autor: val }))}
            onSelect={val => setFormData(prev => ({ ...prev, autor: val }))}
            onAddNew={async val => { await createAutorMutation.mutateAsync({ nombre: val }); setFormData(prev => ({ ...prev, autor: val })) }}
            suggestions={autoresSuggestions}
            isLoading={isLoadingAutores}
            required
          />

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='autorEsDibujante'
              checked={autorEsDibujante}
              onChange={e => setAutorEsDibujante(e.target.checked)}
              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
            />
            <label htmlFor='autorEsDibujante' className='text-sm font-medium text-gray-700'>
              El autor es también el dibujante
            </label>
          </div>

          <div className={autorEsDibujante ? 'opacity-50 pointer-events-none' : ''}>
            <SearchInput
              label='Dibujante'
              value={formData.dibujante}
              onChange={val => setFormData(prev => ({ ...prev, dibujante: val }))}
              onSelect={val => setFormData(prev => ({ ...prev, dibujante: val }))}
              onAddNew={async val => { await createDibujanteMutation.mutateAsync({ nombre: val }); setFormData(prev => ({ ...prev, dibujante: val })) }}
              suggestions={dibujantesSuggestions}
              isLoading={isLoadingDibujantes}
              required
            />
          </div>

        </div>

        {/* Tomos */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Tomos Totales</label>
          <div className='space-y-2'>

            <div className='flex gap-4'>
              {['numero', 'en_emision', 'unico'].map(type => (
                <label key={type} className='flex items-center'>
                  <input
                    type='radio'
                    checked={tomosType === type}
                    onChange={() => handleTomosTypeChange(type)}
                    className='mr-2 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='text-sm'>
                    {type === 'numero' ? 'Número específico' : type === 'en_emision' ? 'En emisión' : 'Tomo único'}
                  </span>
                </label>
              ))}
            </div>

            {tomosType === 'numero' && (
              <input
                type='number'
                name='tomos'
                value={formData.tomos}
                onChange={handleChange}
                min='0'
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
              />
            )}

            {tomosType === 'en_emision' && (
              <div className='px-3 py-2 bg-orange-50 border border-orange-200 rounded-md text-sm text-orange-700'>
                Manga en emisión
              </div>
            )}

            {tomosType === 'unico' && (
              <div className='px-3 py-2 bg-green-50 border border-green-200 rounded-md text-sm text-green-700'>
                Tomo único
              </div>
            )}

          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='tomosComprados' className='block text-sm font-medium text-gray-700 mb-2'>
              Tomos Comprados
            </label>
            <input
              id='tomosComprados'
              name='tomosComprados'
              type='number'
              value={formData.tomosComprados}
              onChange={handleChange}
              min='0'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
            />
          </div>

          <div>
            <label htmlFor='tomosLeidos' className='block text-sm font-medium text-gray-700 mb-2'>
              Tomos Leídos
            </label>
            <input
              id='tomosLeidos'
              name='tomosLeidos'
              type='number'
              value={formData.tomosLeidos}
              onChange={handleChange}
              min='0'
              max={formData.tomosComprados}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
            />
            <p className='text-xs text-gray-500 mt-1'>Máx: {formData.tomosComprados}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          <div>
            <label htmlFor='editorial' className='block text-sm font-medium text-gray-700 mb-2'>
              Editorial
            </label>
            <select
              id='editorial'
              name='editorial'
              value={formData.editorial}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
            >
              <option value=''>Seleccionar editorial</option>
              {editoriales.map(ed => <option key={ed} value={ed}>{ed}</option>)}
            </select>
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
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
            >
              <option value=''>Seleccionar tamaño</option>
              {tamaños.map(t => <option key={t} value={t}>{t}</option>)}
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
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition'
          />
        </div>

        <div className='flex gap-3 pt-4'>
          <button
            type='submit'
            disabled={isLoading}
            className='flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition'
          >
            {isLoading && <LoadingSpinner size='sm' />}
            {isLoading ? (manga ? 'Actualizando...' : 'Agregando...') : manga ? 'Actualizar Manga' : 'Agregar Manga'}
          </button>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition'
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
