import Link from 'next/link'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { BiWallet } from 'react-icons/bi'
import LayoutDashboard from '../../../components/DashboardPage/LayoutDashboard/LayoutDashboard'
import WalletSingle from '../../../components/DashboardPage/WalletSingle/WalletSingle'
import Message from '../../../components/Message/Message'
import { AuthContext } from '../../../contexts/AuthContext'
import { api } from '../../../services/api'

interface WalletsData {
  id: string,
  name: string,
  description: string
  createdAt: Date
}

interface MessageProps {
  type: string,
  message: string
}


export default function Wallets() {
  const {user} = useContext(AuthContext)
  const [wallets, setWallets] = useState<WalletsData[]>([])
  const [idDeleted, setIdDeleted] = useState<string>('')
  const [message, setMessage] = useState<MessageProps>({type: '', message: ''})
  useEffect(() => {
    if(user?.id) {
      console.log(user?.id)
      api.get(`/api/wallets/get-all/${user?.id}`).then(({data}) => {
        setWallets(data)
      })
    }
  }, [user?.id])
  
  useEffect(() => {
    if(idDeleted !== '') {
      setWallets(wallets.filter(wallet => wallet.id !== idDeleted))
      setIdDeleted('')
    }
  }, [idDeleted, wallets])

  return (
    <div className="bg-white rounded-lg p-3 shadow-lg">
      <div className="flex items-center justify-between gap-1 pb-2 border-b border-b-gray-light mb-1">
        <div className="flex items-center gap-1">
        <span><BiWallet fontSize="1.7rem" /></span>
        <h1 className="text-2xl text-blackColor font-bold">Carteiras</h1>
        </div>
        <button className="rounded-lg bg-actionColor text-white font-bold px-2 py-1 transition duration-300 hover:bg-baseColor">
          <Link passHref href="/dashboard/wallets/create">Adicionar</Link>
        </button>
      </div>
      {message.type !== '' ? <Message type={message.type} message={message.message} /> : ''}
        <div className="py-5">
          <div className="grid text-center grid-cols-5 text-blackColor font-medium px-3 mb-3">
            <p>Nome</p>
            <p>Receita (R$)</p>
            <p>Despesa (R$)</p>
            <p>Criada em</p>
            <p>Acões</p>
          </div>
          <>
            {
              wallets?.map(wallet => (
                <WalletSingle key={wallet.id} id={wallet.id} name={wallet.name} createdAt={wallet.createdAt} setMessage={setMessage} setIdDeleted={setIdDeleted} />
              ))
            }
          </>
          
        </div>
    </div>
  )
}

Wallets.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}