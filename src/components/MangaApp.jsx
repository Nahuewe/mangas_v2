"use client"

import { useState } from "react"
import { useMangas, useCreateManga, useUpdateManga, useDeleteManga } from "../hooks/useMangas"
import { MangaGrid } from "./manga/MangaGrid"
import { MangaForm } from "./manga/MangaForm"
import { MangaStats } from "./manga/MangaStats"
import { AutoresSection } from "./autores/AutoresSection"
import { DibujantesSection } from "./dibujantes/DibujantesSection"
import { Book, Plus, User, BookOpen, BarChart3, Palette } from "lucide-react"

export default function MangaApp() {
  const [activeTab, setActiveTab] = useState("biblioteca")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingManga, setEditingManga] = useState(null)

  const { data: mangas = [], isLoading, error } = useMangas()
  const createMangaMutation = useCreateManga()
  const updateMangaMutation = useUpdateManga()
  const deleteMangaMutation = useDeleteManga()

  const tabs = [
    { id: "biblioteca", label: "Biblioteca", icon: BookOpen },
    { id: "series", label: "Series", icon: Book },
    { id: "autores", label: "Autores", icon: User },
    { id: "dibujantes", label: "Dibujantes", icon: Palette },
    { id: "estadisticas", label: "Estadísticas", icon: BarChart3 },
  ]

  const handleCreateManga = async (data) => {
    await createMangaMutation.mutateAsync(data)
    setShowAddForm(false)
  }

  const handleUpdateManga = async (data) => {
    if (!editingManga) return

    const updateData = {
      id: editingManga.id,
      ...data,
    }

    await updateMangaMutation.mutateAsync(updateData)
    setEditingManga(null)
  }

  const handleDeleteManga = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este manga?")) {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar los datos</h2>
          <p className="text-gray-600">Por favor, intenta recargar la página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Book className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Mi Colección de Manga</h1>
          </div>
          <p className="text-lg text-gray-600">Gestiona tu biblioteca personal de manga</p>
        </header>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-soft border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <main>
          {activeTab === "biblioteca" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-semibold text-gray-900">Mi Biblioteca</h2>
                <button
                  onClick={() => {
                    setShowAddForm(!showAddForm)
                    setEditingManga(null)
                  }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  {showAddForm ? "Cancelar" : "Agregar Manga"}
                </button>
              </div>

              {showAddForm && (
                <MangaForm
                  title="Agregar Nuevo Manga"
                  onSubmit={handleCreateManga}
                  onCancel={handleCancelAdd}
                  isLoading={createMangaMutation.isPending}
                />
              )}

              {editingManga && (
                <MangaForm
                  title="Editar Manga"
                  manga={editingManga}
                  onSubmit={handleUpdateManga}
                  onCancel={handleCancelEdit}
                  isLoading={updateMangaMutation.isPending}
                />
              )}

              <MangaGrid mangas={mangas} isLoading={isLoading} onEdit={handleEditManga} onDelete={handleDeleteManga} />
            </div>
          )}

          {activeTab === "series" && (
            <div className="bg-white rounded-lg shadow-soft p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gestión de Series</h2>
              <p className="text-gray-600">Aquí podrás gestionar información detallada de cada serie de manga.</p>
            </div>
          )}

          {activeTab === "autores" && <AutoresSection />}

          {activeTab === "dibujantes" && <DibujantesSection />}

          {activeTab === "estadisticas" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Estadísticas</h2>
              <MangaStats mangas={mangas} />

              <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Estado</h3>
                <div className="space-y-3">
                  {["Leyendo", "Completado", "En pausa", "Abandonado", "Plan de lectura"].map((estado) => {
                    const count = mangas.filter((manga) => manga.estado === estado).length
                    const percentage = mangas.length > 0 ? (count / mangas.length) * 100 : 0

                    return (
                      <div key={estado} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{estado}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">
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
