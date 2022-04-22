import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import React from 'react'

import { FaBars, FaTimes } from 'react-icons/fa'

const show = {
  mobile: "absolute top-0 left-0 w-full h-[100vh] bg-[#fff] flex-col gap-7",
  desktop: "flex-row gap-4"
}

const hidden = {
  className: "invisible opacity-0 absolute top-[-1.5rem] right-[1.5rem]"
}

const linkItemMenu = {
  mobile: "font-bold text-3xl",
  desktop: "font-medium text-lg"
}

const buttonItemMenu = {
  mobile: "mt-5 text-xl px-5 py-1",
  desktop: "text-sm px-2 py-1"
}

const menuButtons = {
  className: "text-[1.5rem] cursor-pointer text-baseColor"
}

export default function Navbar() {
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const openMenuRef = useRef<HTMLDivElement>(null)
  const closeMenuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)

  const showMenu = () => {
    openMenuRef?.current?.classList.add('hidden')
    setIsDisplayed(true)
  }

  const closeMenu = () => {
    openMenuRef?.current?.classList.remove('hidden')
    setIsDisplayed(false)
  }

  if(typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      if(window.innerWidth > 768) {
        openMenuRef?.current?.classList.add('hidden')
        setIsDisplayed(true)
        setIsDesktop(true)
      }else {
        openMenuRef?.current?.classList.remove('hidden')
        setIsDisplayed(false)
        setIsDesktop(false)
      }
    })
  }

  useEffect(() => {
    if(window.innerWidth > 768) {
      setIsDisplayed(true)
      setIsDesktop(true)
      openMenuRef?.current?.classList.add('hidden')
      closeMenuRef?.current?.classList.add('hidden')
    }
  }, [])

  return (
    <nav className="">
      <div ref={menuItemsRef} className={`flex items-center ${!isDisplayed ? "hidden" : !isDesktop ? show.mobile : show.desktop }`}>
        <span className={`hover:text-actionColor transition duration-300 text-baseColor  ${!isDesktop ? `${linkItemMenu.mobile} mt-7` : linkItemMenu.desktop}`}>
          <Link passHref href="#">
            Home
          </Link>
        </span>
        <span className={`hover:text-actionColor transition duration-300 text-baseColor ${!isDesktop ? linkItemMenu.mobile : linkItemMenu.desktop}`}>
          <Link passHref href="#">
            Testemunhos
          </Link>
        </span>
        <span className={`hover:text-actionColor transition duration-300 text-baseColor ${!isDesktop ? linkItemMenu.mobile : linkItemMenu.desktop}`}>
          <Link passHref href="#">
            Sobre
          </Link>
        </span>
        <span className={`hover:text-actionColor transition duration-300 text-baseColor ${!isDesktop ? linkItemMenu.mobile : linkItemMenu.desktop}`}>
          <Link passHref href="#">
            Contato
          </Link>
        </span>
        <button className={`text-[#fff] bg-actionColor hover:bg-baseColor transition duration-300 rounded-lg ${!isDesktop ? buttonItemMenu.mobile : buttonItemMenu.desktop}`}>
          <Link href="/login">Entrar</Link>
        </button>
      </div>
      <div ref={openMenuRef} onClick={showMenu} className={`${menuButtons.className} `}>
        <FaBars />
      </div>
      <div ref={closeMenuRef} onClick={closeMenu} className={`${!isDisplayed ? hidden.className : !isDesktop ? "relative z-30" : hidden.className} ${menuButtons.className}`}>
        <FaTimes />
      </div>
    </nav>
  )
}
