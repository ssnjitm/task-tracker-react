import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { SiTask } from "react-icons/si";
import { IoPieChartSharp } from "react-icons/io5";




interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: <FaHome />
 },
    { name: 'Task Tracker', href: '/tasks', icon: <SiTask />
 },
    { name: 'Calendar', href: '/calendar', icon: <SlCalender />
 },
    { name: 'Reports', href: '/reports', icon:<IoPieChartSharp />
 },

  ]

  return (
    <>
      
      <div className={`lg:hidden ${isOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={onClose} />
        <div className="fixed inset-y-0 left-0 flex w-72 max-w-xs">
          <div className="relative flex w-full flex-col bg-white px-6 pb-4 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <img src="/logo_task_patro.png" alt="logo" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">Task Paatro</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-8 flex-1 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                        isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <img src="/logo_task_patro.png" alt="logo" />
            </div>
                <span className="ml-3 text-xl font-bold text-gray-900">Task Paatro</span>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li className="mt-auto">
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-semibold text-blue-600">SM</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Sanjeet Mijar</p>
                      <p className="text-xs text-gray-500">Software Developer</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar