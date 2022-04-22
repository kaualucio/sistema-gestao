import React, {useContext} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { destroyCookie } from 'nookies'
import { MdOutlineSpaceDashboard, MdLogout } from 'react-icons/md'
import { BiWallet, BiCalendarMinus, BiCalendarPlus } from 'react-icons/bi' 

import placeholderImg from '../../../public/assets/images/placeholder.svg'

import { AuthContext } from '../../../contexts/AuthContext'
import Router from 'next/router'


export default function Sidebar() {
  function handleLoggout() {
    destroyCookie(null, 'beru.access_token')
    destroyCookie(null, 'beru.refresh_token')
    Router.push('/')
  }

  const { user } = useContext(AuthContext)
  return (
    <div>
      <div className="h-11 text-center border-b border-b-gray-light mb-3">
        <h1 className="font-bold text-2xl text-white">
          <Link href="/dashboard">Logo</Link>
        </h1>
      </div>
      <div className="flex items-center gap-2 mb-4 bg-white rounded-lg p-2 shadow-lg">
        <div>
          <div className="w-11 h-11 rounded-full">
            <Image src={placeholderImg} alt="user img" />
          </div>
        </div>
        <div>
          <p className="md:text-lg xl:text-sm text-blackColor font-medium">{user?.name}</p>
          <span 
            className={`inline-block rounded-md px-1 py-[3px] text-xs text-white font-bold 
            ${user?.plan === "PRO" ? 'bg-[#06d6a0]' : 'bg-[#207bff]'}`}>
              {user?.plan ? user.plan : 'PRO'}
          </span>
        </div>
      </div>
      <nav className="bg-white rounded-lg p-2 shadow-lg">
        <div className="rounded-lg transition duration-300 hover:bg-baseColor bg-secondaryColor py-1 px-2 cursor-pointer mb-2">
            <div className="flex items center text-md font-medium text-white gap-1">
              <MdOutlineSpaceDashboard fontSize="1.5rem" />
              <Link passHref href="/dashboard">
                Home
              </Link>
            </div>
        </div>

        <div className="rounded-lg transition duration-300 hover:bg-baseColor bg-secondaryColor py-1 px-2 cursor-pointer mb-2">
            <div className="flex items center text-md font-medium text-white gap-1">
              <BiWallet fontSize="1.5rem" />
              <Link passHref href="/dashboard/wallets">
                Cateiras
              </Link>
            </div>
        </div>

        <div className="rounded-lg transition duration-300 hover:bg-baseColor bg-secondaryColor py-1 px-2 cursor-pointer mb-2">
            <div className="flex items center text-md font-medium text-white gap-1">
              <BiCalendarPlus fontSize="1.5rem" />
              <Link passHref href="/dashboard/receipts">
                Receitas
              </Link>
            </div>
        </div>
          
        <div className="rounded-lg transition duration-300 hover:bg-baseColor bg-secondaryColor py-1 px-2 cursor-pointer mb-2">
            <div className="flex items center text-md font-medium text-white gap-1">
              <BiCalendarMinus fontSize="1.5rem" />
              <Link passHref href="/dashboard/expenditures">
                Despesas
              </Link>
            </div>
        </div>

        <div className="rounded-lg transition duration-300 hover:bg-baseColor bg-secondaryColor py-1 px-2 cursor-pointer mb-2">
            <div className="flex items center text-md font-medium text-white gap-1" onClick={handleLoggout}>
              <MdLogout fontSize="1.5rem" />
              Sair
            </div>
        </div>
      </nav>
    </div>
  )
}
