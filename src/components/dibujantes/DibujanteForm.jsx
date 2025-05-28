"use client"

import { useState, useEffect } from "react"
import { LoadingSpinner } from "../ui/LoadingSpinner"

export function DibujanteForm({ dibujante, onSubmit, onCancel, isLoading = false, title }) {
  const [formData, setFormData] = useState({
    nombre: "",
    biografia: "",
  })

  useEffect(() => {
    if (dibujante) {
      setFormData({
        nombre: dibujante.nombre,
        biografia: dibujante.biografia || "",
      })
    }
  }, [dibujante])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-200 animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Nombre del dibujante"
          />
        </div>

        <div>
          <label htmlFor="biografia" className="block text-sm font-medium text-gray-700 mb-2">
            Biografía
          </label>
          <textarea
            id="biografia"
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Información sobre el dibujante..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading && <LoadingSpinner size="sm" />}
            {isLoading
              ? dibujante
                ? "Actualizando..."
                : "Agregando..."
              : dibujante
                ? "Actualizar Dibujante"
                : "Agregar Dibujante"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
