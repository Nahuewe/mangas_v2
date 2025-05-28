import { Search, User, Plus, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { DibujanteForm } from './DibujanteForm'
import { useDibujantes, useCreateDibujante, useUpdateDibujante, useDeleteDibujante } from '../../hooks/useMangas'
import { LoadingSpinner } from '../ui/LoadingSpinner'

export function DibujantesSection () {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDibujante, setEditingDibujante] = useState(null)

  const { data: dibujantes = [], isLoading, error } = useDibujantes()
  const createDibujanteMutation = useCreateDibujante()
  const updateDibujanteMutation = useUpdateDibujante()
  const deleteDibujanteMutation = useDeleteDibujante()

  const filteredDibujantes = dibujantes.filter((dibujante) =>
    dibujante.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateDibujante = async (data) => {
    await createDibujanteMutation.mutateAsync(data)
    setShowAddForm(false)
  }

  const handleUpdateDibujante = async (data) => {
    if (!editingDibujante) return
    const updateData = { id: editingDibujante.id, ...data }
    await updateDibujanteMutation.mutateAsync(updateData)
    setEditingDibujante(null)
  }

  const handleDeleteDibujante = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este dibujante?')) {
      await deleteDibujanteMutation.mutateAsync(id)
    }
  }

  const handleEditDibujante = (dibujante) => {
    setEditingDibujante(dibujante)
    setShowAddForm(false)
  }

  const handleCancelEdit = () => {
    setEditingDibujante(null)
  }

  const handleCancelAdd = () => {
    setShowAddForm(false)
  }

  if (error) {
    return (
      <div className='bg-white rounded-lg shadow-soft p-8 border border-gray-200'>
        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Dibujantes</h2>
        <p className='text-red-600'>Error al cargar los dibujantes</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h2 className='text-2xl font-semibold text-gray-900'>Gestión de Dibujantes</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm)
            setEditingDibujante(null)
          }}
          className='inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
        >
          <Plus className='h-4 w-4' />
          {showAddForm ? 'Cancelar' : 'Agregar Dibujante'}
        </button>
      </div>

      {showAddForm && (
        <DibujanteForm
          title='Agregar Nuevo Dibujante'
          onSubmit={handleCreateDibujante}
          onCancel={handleCancelAdd}
          isLoading={createDibujanteMutation.isPending}
        />
      )}

      {editingDibujante && (
        <DibujanteForm
          title='Editar Dibujante'
          dibujante={editingDibujante}
          onSubmit={handleUpdateDibujante}
          onCancel={handleCancelEdit}
          isLoading={updateDibujanteMutation.isPending}
        />
      )}

      <div className='bg-white rounded-lg shadow-soft p-6 border border-gray-200'>
        <div className='relative mb-6'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          <input
            type='text'
            placeholder='Buscar dibujantes...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
          />
        </div>

        {isLoading
          ? (
            <div className='flex items-center justify-center py-8'>
              <LoadingSpinner size='lg' />
              <span className='ml-2 text-gray-600'>Cargando dibujantes...</span>
            </div>
            )
          : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredDibujantes.length > 0
                ? (
                    filteredDibujantes.map((dibujante) => (
                      <div
                        key={dibujante.id}
                        className='flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group'
                      >
                        <div className='flex-shrink-0'>
                          <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                            <User className='h-5 w-5 text-green-600' />
                          </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-gray-900 truncate'>{dibujante.nombre}</p>
                          <p className='text-xs text-gray-500 mt-1 line-clamp-2'>{dibujante.biografia || 'Sin biografía'}</p>
                        </div>
                        <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <button
                            onClick={() => handleEditDibujante(dibujante)}
                            className='p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors'
                            title='Editar dibujante'
                          >
                            <Edit className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteDibujante(dibujante.id)}
                            className='p-1 text-red-600 hover:bg-red-100 rounded transition-colors'
                            title='Eliminar dibujante'
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
                      {searchQuery ? 'No se encontraron dibujantes' : 'No hay dibujantes disponibles'}
                    </h3>
                    <p className='text-gray-500'>
                      {searchQuery
                        ? `No hay dibujantes que coincidan con "${searchQuery}"`
                        : 'Comienza agregando tu primer dibujante'}
                    </p>
                  </div>
                  )}
            </div>
            )}
      </div>
    </div>
  )
}
