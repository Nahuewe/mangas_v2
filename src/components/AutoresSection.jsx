"use client"

import { useState } from "react"
import { useAutores } from "../hooks/useMangas"
import { LoadingSpinner } from "./ui/LoadingSpinner"
import { Search, User } from "lucide-react"

export function AutoresSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: autores = [], isLoading, error } = useAutores()

  const filteredAutores = autores.filter((autor) => autor.toLowerCase().includes(searchQuery.toLowerCase()))

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Autores y Dibujantes</h2>
        <p className="text-red-600">Error al cargar los autores</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Autores y Dibujantes</h2>

        {/* Buscador */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar autores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Lista de autores */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
            <span className="ml-2 text-gray-600">Cargando autores...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAutores.length > 0 ? (
              filteredAutores.map((autor, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{autor}</p>
                    <p className="text-xs text-gray-500">Autor/Dibujante</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery ? "No se encontraron autores" : "No hay autores disponibles"}
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? `No hay autores que coincidan con "${searchQuery}"`
                    : "Los autores aparecerán aquí cuando agregues mangas"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
