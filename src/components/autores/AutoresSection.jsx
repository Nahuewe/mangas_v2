import { Search, User, Plus, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AutorForm } from './AutorForm'
import { useAutores, useCreateAutor, useUpdateAutor, useDeleteAutor } from '../../hooks/useMangas'
import { LoadingSpinner } from '../ui/LoadingSpinner'

export function AutoresSection () {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAutor, setEditingAutor] = useState(null)

  const { data: autores = [], isLoading, error } = useAutores()
  const createAutorMutation = useCreateAutor()
  const updateAutorMutation = useUpdateAutor()
  const deleteAutorMutation = useDeleteAutor()

  const filteredAutores = autores.filter((autor) => autor.nombre.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateAutor = async (data) => {
    await createAutorMutation.mutateAsync(data)
    setShowAddForm(false)
  }

  const handleUpdateAutor = async (data) => {
    if (!editingAutor) return
    const updateData = { id: editingAutor.id, ...data }
    await updateAutorMutation.mutateAsync(updateData)
    setEditingAutor(null)
  }

  const handleDeleteAutor = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este autor?')) {
      await deleteAutorMutation.mutateAsync(id)
    }
  }

  const handleEditAutor = (autor) => {
    setEditingAutor(autor)
    setShowAddForm(false)
  }

  const handleCancelEdit = () => {
    setEditingAutor(null)
  }

  const handleCancelAdd = () => {
    setShowAddForm(false)
  }

  if (error) {
    return (
      <div className='bg-white rounded-lg shadow-soft p-8 border border-gray-200'>
        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Autores</h2>
        <p className='text-red-600'>Error al cargar los autores</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h2 className='text-2xl font-semibold text-gray-900'>Gestión de Autores</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm)
            setEditingAutor(null)
          }}
          className='inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
        >
          <Plus className='h-4 w-4' />
          {showAddForm ? 'Cancelar' : 'Agregar Autor'}
        </button>
      </div>

      {showAddForm && (
        <AutorForm
          title='Agregar Nuevo Autor'
          onSubmit={handleCreateAutor}
          onCancel={handleCancelAdd}
          isLoading={createAutorMutation.isPending}
        />
      )}

      {editingAutor && (
        <AutorForm
          title='Editar Autor'
          autor={editingAutor}
          onSubmit={handleUpdateAutor}
          onCancel={handleCancelEdit}
          isLoading={updateAutorMutation.isPending}
        />
      )}

      <div className='bg-white rounded-lg shadow-soft p-6 border border-gray-200'>
        <div className='relative mb-6'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          <input
            type='text'
            placeholder='Buscar autores...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
          />
        </div>

        {isLoading
          ? (
            <div className='flex items-center justify-center py-8'>
              <LoadingSpinner size='lg' />
              <span className='ml-2 text-gray-600'>Cargando autores...</span>
            </div>
            )
          : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredAutores.length > 0
                ? (
                    filteredAutores.map((autor) => (
                      <div
                        key={autor.id}
                        className='flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group'
                      >
                        <div className='flex-shrink-0'>
                          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                            <User className='h-5 w-5 text-blue-600' />
                          </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-gray-900 truncate'>{autor.nombre}</p>
                          <p className='text-xs text-gray-500 mt-1 line-clamp-2'>{autor.biografia || 'Sin biografía'}</p>
                        </div>
                        <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <button
                            onClick={() => handleEditAutor(autor)}
                            className='p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors'
                            title='Editar autor'
                          >
                            <Edit className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteAutor(autor.id)}
                            className='p-1 text-red-600 hover:bg-red-100 rounded transition-colors'
                            title='Eliminar autor'
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </div>
                      </div>
                    ))
                  )
                : (
                  <div className='col-span-full text-center py-8'>
                    <User className='mx-auto h-12 w-12 text-gray-400 mb-4' />
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      {searchQuery ? 'No se encontraron autores' : 'No hay autores disponibles'}
                    </h3>
                    <p className='text-gray-500'>
                      {searchQuery
                        ? `No hay autores que coincidan con "${searchQuery}"`
                        : 'Comienza agregando tu primer autor'}
                    </p>
                  </div>
                  )}
            </div>
            )}
      </div>
    </div>
  )
}
