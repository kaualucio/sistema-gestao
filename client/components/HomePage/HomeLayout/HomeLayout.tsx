import React, { ReactNode } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'


interface LayoutProps {
  children: ReactNode
}

export default function HomeLayout({children}: LayoutProps) {
  return (
    <div>
      <Header />
      <main className="mt-9">
        {children}
      </main>
      <Footer />
    </div>
  )
}
