import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

const Calendar: React.FC = () => {
  const currentDate = new Date()
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Mock events for demonstration
  const events = [
    { date: new Date(2024, 0, 15), title: 'Team Meeting', color: 'bg-blue-500' },
    { date: new Date(2024, 0, 20), title: 'Project Deadline', color: 'bg-red-500' },
    { date: new Date(2024, 0, 25), title: 'Client Review', color: 'bg-green-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
          <p className="mt-1 text-sm text-gray-600">Schedule and manage your tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Today
          </button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            {format(currentDate, 'MMMM yyyy')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekdays.map((day) => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-gray-900">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="min-h-32 border-r border-b border-gray-200 p-2" />
          ))}
          
          {days.map((day) => {
            const dayEvents = events.filter(event => 
              format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            )
            
            return (
              <div
                key={day.toString()}
                className={`min-h-32 border-r border-b border-gray-200 p-2 ${
                  !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex justify-between">
                  <span className={`text-sm font-medium ${
                      isToday(day) 
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white'
                      : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {isSameMonth(day, currentDate) && (
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="mt-2 space-y-1">
                  {dayEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`${event.color} rounded px-2 py-1 text-xs text-white truncate`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className={`h-10 w-10 ${event.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold">{format(event.date, 'd')}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                <p className="text-sm text-gray-600">{format(event.date, 'EEEE, MMMM d, yyyy')}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar