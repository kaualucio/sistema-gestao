import React, {useState, useEffect, useRef, ReactNode } from 'react'
import Sidebar from '../Sidebar/Sidebar'

import {FaBars} from 'react-icons/fa'

interface LayoutDashboardProps {
  children: ReactNode
}

const TableWidthClassName = {
  show: 'h-[100vh] fixed top-0 left-0 min-w-[320px]',
  hidden: 'h-[1px] absolute top-[-1px] left-[-320px] w-80'
}

export default function LayoutDashboard({children}: LayoutDashboardProps) {
  const [isTabletWidth, setIsTabletWidth] = useState(false)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  useEffect(() => {
    if(window.innerWidth <= 768) {
      setIsTabletWidth(true)
      setSidebarIsOpen(false)
    }
  }, [])

  if(typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      if(window.innerWidth <= 768) {
        setIsTabletWidth(true)
        setSidebarIsOpen(false)
      }else {
        setIsTabletWidth(false)
        setSidebarIsOpen(true)
      }
    })
  }

  return (
    <div>
      <div className={`flex justify-end  ${!isTabletWidth ? 'hidden' : 'z-30 px-3 py-2 text-xl text-actionColor cursor-pointer bg-white shadow-lg fixed top-0 left-0 w-full '}`}>
        <FaBars onClick={() => setSidebarIsOpen(!sidebarIsOpen)} />
      </div>
      <div className="flex relative">
        <div className={`z-40 h-[100vh] min-w-sm p-3 bg-baseColor ${isTabletWidth ? !sidebarIsOpen ? TableWidthClassName.hidden : TableWidthClassName.show : 'sticky top-0 left-0' }` }>
          <Sidebar />
        </div>
        <main className={`${!isTabletWidth ? 'min-w-md' : 'w-full mt-6'} p-4` }>
          {children}
        </main>
      </div>
    </div>
  )
}
