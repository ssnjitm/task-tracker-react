import React from 'react'

interface StatsCardProps {
  title: string
  value: number 
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red',
  description?:string
}



const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>

      </div>

    </div>
  )
}

export default StatsCard