import { Book, Plus, User, BookOpen, BarChart3, Palette } from 'lucide-react'
import { useState } from 'react'
import { useMangas, useCreateManga, useUpdateManga, useDeleteManga } from '../hooks/useMangas'
import { AutoresSection } from './autores/AutoresSection'
import { DibujantesSection } from './dibujantes/DibujantesSection'
import { MangaForm } from './manga/MangaForm'
import { MangaGrid } from './manga/MangaGrid'
import { MangaStats } from './manga/MangaStats'

export default function MangaApp () {
  const { data: mangas = [], isLoading, error } = useMangas()
  const createMangaMutation = useCreateManga()
  const updateMangaMutation = useUpdateManga()
  const deleteMangaMutation = useDeleteManga()

  const [activeTab, setActiveTab] = useState('biblioteca')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingManga, setEditingManga] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const tabs = [
    { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen },
    { id: 'autores', label: 'Autores', icon: User },
    { id: 'dibujantes', label: 'Dibujantes', icon: Palette },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 }
  ]

  const filteredMangas = mangas
    .filter((manga) =>
      manga.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.titulo.localeCompare(b.titulo))

  const totalPages = Math.ceil(filteredMangas.length / itemsPerPage)
  const paginatedMangas = filteredMangas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleCreateManga = async (data) => {
    await createMangaMutation.mutateAsync(data)
    setShowAddForm(false)
  }

  const handleUpdateManga = async (data) => {
    if (!editingManga) return

    const updateData = {
      id: editingManga.id,
      ...data
    }

    await updateMangaMutation.mutateAsync(updateData)
    setEditingManga(null)
  }

  const handleDeleteManga = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este manga?')) {
      await deleteMangaMutation.mutateAsync(id)
    }
  }

  const handleEditManga = (manga) => {
    setEditingManga(manga)
    setShowAddForm(false)
  }

  const handleCancelEdit = () => {
    setEditingManga(null)
  }

  const handleCancelAdd = () => {
    setShowAddForm(false)
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Error al cargar los datos</h2>
          <p className='text-gray-600'>Por favor, intenta recargar la página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>

        <header className='mb-10 bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-inner'>
          <div className='flex items-center gap-3 mb-3'>
            <Book className='h-9 w-9 text-blue-600' />
            <h1 className='text-4xl font-extrabold text-gray-800 tracking-tight'>Mi Colección de Manga</h1>
          </div>
          <p className='text-base text-gray-500'>Organiza, explora y administra tus mangas favoritos con estilo.</p>
        </header>

        <div className='mb-8'>
          <nav className='flex flex-wrap bg-white p-1 rounded-xl shadow border border-gray-200 gap-2'>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-transparent'
                    }`}
                >
                  <Icon className='h-4 w-4' />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        <main>
          {activeTab === 'biblioteca' && (
            <div className='space-y-6'>
              <div className='flex flex-wrap flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                  <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Mi Biblioteca</h2>
                  <input
                    type='text'
                    placeholder='Buscar manga...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='mt-1 w-full sm:w-72 px-4 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
                  />
                </div>

                <button
                  onClick={() => {
                    setShowAddForm(!showAddForm)
                    setEditingManga(null)
                  }}
                  className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all md:mt-10'
                >
                  <Plus className='h-4 w-4' />
                  {showAddForm ? 'Cancelar' : 'Agregar Manga'}
                </button>
              </div>

              {showAddForm && (
                <MangaForm
                  title='Agregar Nuevo Manga'
                  onSubmit={handleCreateManga}
                  onCancel={handleCancelAdd}
                  isLoading={createMangaMutation.isPending}
                />
              )}

              {editingManga && (
                <MangaForm
                  title='Editar Manga'
                  manga={editingManga}
                  onSubmit={handleUpdateManga}
                  onCancel={handleCancelEdit}
                  isLoading={updateMangaMutation.isPending}
                />
              )}

              <MangaGrid
                mangas={paginatedMangas}
                isLoading={isLoading}
                onEdit={handleEditManga}
                onDelete={handleDeleteManga}
              />

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 mt-6'>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className='px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 transition'
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 text-sm rounded-md border ${currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        } transition`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className='px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 transition'
                  >
                    Siguiente
                  </button>
                </div>
              )}

            </div>
          )}

          {activeTab === 'autores' && <AutoresSection />}

          {activeTab === 'dibujantes' && <DibujantesSection />}

          {activeTab === 'estadisticas' && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold text-gray-900'>Estadísticas</h2>
              <MangaStats mangas={mangas} />

              <div className='bg-white rounded-lg shadow-soft p-6 border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Distribución por Estado</h3>
                <div className='space-y-3'>
                  {['Leyendo', 'Completado', 'En pausa', 'Abandonado', 'Plan de lectura'].map((estado) => {
                    const count = mangas.filter((manga) => manga.estado === estado).length
                    const percentage = mangas.length > 0 ? (count / mangas.length) * 100 : 0

                    return (
                      <div key={estado} className='flex items-center justify-between'>
                        <span className='text-sm font-medium text-gray-700'>{estado}</span>
                        <div className='flex items-center gap-3'>
                          <div className='w-32 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-blue-600 h-2 rounded-full transition-all duration-500'
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className='text-sm text-gray-600 w-12 text-right'>
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
