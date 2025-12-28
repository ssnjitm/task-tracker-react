import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { format } from 'date-fns'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation()
  
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1]
    switch (path) {
      case 'dashboard': return 'Dashboard'
      case 'tasks': return 'Task Tracker'
      case 'calendar': return 'Calendar'
      case 'reports': return 'Reports'
      case 'projects': return 'Projects'
      default: return 'Dashboard'
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center 
    gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-sm text-gray-600">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:text-gray-900">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>

          <div className="relative">
            <button className="flex items-center gap-x-3 rounded-lg p-1 hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="font-semibold text-blue-600">SM</span>
              </div>
              <span className="hidden text-sm font-medium text-gray-900 lg:block">Sanjeet Mijar</span>
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header