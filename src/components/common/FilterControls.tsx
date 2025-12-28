import React from 'react'
import type { FilterOption, SortOption } from '../../types/task'

interface FilterControlsProps {
  filter: FilterOption
  sortBy: SortOption
  onFilterChange: (filter: FilterOption) => void
  onSortChange: (sortBy: SortOption) => void
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
        {(['all', 'pending', 'in-progress', 'done'] as FilterOption[]).map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(option)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === option
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {option === 'all' ? 'All' : 
             option === 'in-progress' ? 'In Progress' : 
             option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
      
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 
                 focus:ring-blue-500 focus:border-transparent outline-none"
      >
        <option value="date">Sort by Date</option>
        <option value="name">Sort by Name</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
  )
}

export default FilterControls