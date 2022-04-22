import React from 'react'

interface CardProps {
  bgColor: string;
  icon: JSX.Element;
  title: string;
}

export default function Card({bgColor, icon, title}: CardProps) {
  return (
    <div className={`col-span-1 h-9 p-2 flex items-center justify-center flex-col rounded-lg shadow-lg ${bgColor} text-white`}>
      <div className="flex items-center justify-center gap-1">
        <span className="xs:hidden sm:inline">{icon}</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-center text-lg font-medium mt-1">R$ 645,00</p>
    </div>
  )
}
