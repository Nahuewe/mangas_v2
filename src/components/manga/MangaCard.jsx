"use client"

import { Edit, Trash2 } from "lucide-react"

export function MangaCard({ manga, onEdit, onDelete }) {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Leyendo":
        return "bg-blue-500"
      case "Completado":
        return "bg-green-500"
      case "En pausa":
        return "bg-yellow-500"
      case "Abandonado":
        return "bg-red-500"
      case "Plan de lectura":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProgressInfo = () => {
    if (manga.tomos === "en_emision") {
      return {
        textLeidos: `${manga.tomosLeidos} leídos`,
        textComprados: `${manga.tomosComprados} comprados`,
        percentageLeidos: 0,
        percentageComprados: 0,
        showBar: false,
      }
    }

    const percentageLeidos = manga.tomos > 0 ? (manga.tomosLeidos / manga.tomos) * 100 : 0
    const percentageComprados = manga.tomos > 0 ? (manga.tomosComprados / manga.tomos) * 100 : 0

    return {
      textLeidos: `${manga.tomosLeidos}/${manga.tomos} leídos`,
      textComprados: `${manga.tomosComprados}/${manga.tomos} comprados`,
      percentageLeidos,
      percentageComprados,
      showBar: true,
    }
  }

  const progressInfo = getProgressInfo()

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 group animate-fadeIn">
      <div className="relative">
        <img
          src={manga.imagen || "https://via.placeholder.com/200x300"}
          alt={manga.titulo}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
        <span
          className={`absolute top-2 right-2 ${getEstadoColor(manga.estado)} text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm`}
        >
          {manga.estado}
        </span>

        {manga.tomos === "en_emision" && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            En Emisión
          </span>
        )}

        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(manga)}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:scale-110"
              title="Editar manga"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(manga.id)}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg hover:scale-110"
              title="Eliminar manga"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-1">{manga.titulo}</h3>

        <div className="space-y-1 mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Autor:</span> {manga.autor}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Arte:</span> {manga.dibujante}
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-700">
              <span className="font-medium">Leídos:</span>
              <span className="font-semibold">{progressInfo.textLeidos}</span>
            </div>

            {progressInfo.showBar && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressInfo.percentageLeidos}%` }}
                />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-700">
              <span className="font-medium">Comprados:</span>
              <span className="font-semibold">{progressInfo.textComprados}</span>
            </div>

            {progressInfo.showBar && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressInfo.percentageComprados}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {manga.sinopsis && <p className="text-sm text-gray-600 mt-3 line-clamp-2">{manga.sinopsis}</p>}
      </div>
    </div>
  )
}
