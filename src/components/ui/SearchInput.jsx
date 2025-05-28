import { Search, ChevronDown, Plus } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export function SearchInput ({
  value,
  onChange,
  onSelect,
  onAddNew,
  suggestions = [],
  isLoading = false,
  placeholder = 'Buscar...',
  label,
  required = false,
  addNewText = 'Agregar nuevo'
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue)
    setIsOpen(true)
  }

  const handleSuggestionClick = (suggestion) => {
    const name = typeof suggestion === 'string' ? suggestion : suggestion.nombre
    setInputValue(name)
    onSelect(name)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0 || onAddNew) {
      setIsOpen(true)
    }
  }

  const handleAddNew = () => {
    onAddNew(inputValue)
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          {label} {required && '*'}
        </label>
      )}

      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          required={required}
          className='w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
        />

        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />

        {(suggestions.length > 0 || onAddNew) && (
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 transition-colors'
          >
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {isOpen && (suggestions.length > 0 || isLoading || onAddNew) && (
        <div
          ref={dropdownRef}
          className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto animate-fadeIn'
        >
          {isLoading
            ? (
              <div className='px-3 py-2 text-sm text-gray-500 flex items-center gap-2'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600' />
                Buscando...
              </div>
              )
            : (
              <>
                {suggestions.length > 0 &&
                suggestions.map((suggestion, index) => {
                  const name = typeof suggestion === 'string' ? suggestion : suggestion.nombre
                  return (
                    <button
                      key={index}
                      type='button'
                      onClick={() => handleSuggestionClick(suggestion)}
                      className='w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors'
                    >
                      {name}
                    </button>
                  )
                })}

                {onAddNew && inputValue.trim() && (
                  <button
                    type='button'
                    onClick={handleAddNew}
                    className='w-full px-3 py-2 text-left text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-t border-gray-200 text-blue-600 flex items-center gap-2 transition-colors'
                  >
                    <Plus className='h-4 w-4' />
                    {addNewText}: "{inputValue}"
                  </button>
                )}

                {suggestions.length === 0 && !onAddNew && (
                  <div className='px-3 py-2 text-sm text-gray-500'>No se encontraron resultados</div>
                )}
              </>
              )}
        </div>
      )}
    </div>
  )
}
