import { useRouter } from 'next/router'
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react'
import { BiWallet } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import LayoutDashboard from '../../../../components/DashboardPage/LayoutDashboard/LayoutDashboard'
import Message from '../../../../components/Message/Message'
import { AuthContext } from '../../../../contexts/AuthContext'
import { api } from '../../../../services/api'

interface MessageProps {
  type: string,
  message: string
}


export default function Wallet() {
  const router = useRouter()
  const [name, setName] = useState('');
  const [message, setMessage] = useState<MessageProps>({type: '', message: ''})
  const {user} = useContext(AuthContext)

  useEffect(() => {
    if(!router.query.id) {
      router.push('/dashboard/wallets')
    }
  })
  useEffect(() => {
    if(router.query.id) {
      api.get(`/api/wallets/get-one/${router.query.id}`).then(({data}) => {
         setName(data.name)
      })
    }
  }, [router.query.id])

  function sendUpdateRequest(e: FormEvent) {
    e.preventDefault()

    api.put(`/api/wallets/update/${router.query.id}`, {
      userId: user?.id,
      name
    }).then(({data}) => {
        setMessage({type: data.type, message: data.message})
    })

  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-1 pb-2 border-b border-b-gray-light mb-1">
        <span><BiWallet fontSize="1.7rem" /></span>
        <h1 className="text-2xl text-blackColor font-bold">Carteira - {name}</h1>
      </div>
      {message.type !== '' ? <Message type={message.type} message={message.message} /> : ''}
      <div className="mt-2">
        <form onSubmit={(e) => sendUpdateRequest(e)} className="grid xs:grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg shadow-lg bg-secondaryColor">
            <div className="xs:col-span-1 md:col-span-2">
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="name">Nome:</label>
              <input className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" type="text" name="name" id="name" placeholder="Nome da carteira" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mt-1 xs:col-span-1 md:col-span-2">
              <button className="flex items-center gap-1 px-4 py-2 text-white font-bold bg-actionColor rounded-md cursor-pointer transition duration-300 hover:brightness-75" type="submit">
                <FaEdit fontSize="1.2rem"/>
                Editar
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

Wallet.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}