import React, { useState, useEffect, useCallback } from 'react'
import { debounce } from '../../utils/debounce'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery)
    }, 500),
    [onSearch]
  )

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks by title or description..."
        className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 
           focus:ring-blue-500 focus:border-transparent outline-none"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar