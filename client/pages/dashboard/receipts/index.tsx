import Link from 'next/link'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { BiCalendarPlus } from 'react-icons/bi'
import LayoutDashboard from '../../../components/DashboardPage/LayoutDashboard/LayoutDashboard'
import SingleExpRec from '../../../components/DashboardPage/SingleExpRec/SingleExpRec'
import Message from '../../../components/Message/Message'
import { AuthContext } from '../../../contexts/AuthContext'
import { api } from '../../../services/api'

interface ReceiptData {
  id: string,
  useId: string,
  walletId: string,
  name: string,
  receiptValue: string,
  isClosed: boolean,
  typeReceipt: string,
}

interface MessageProps {
  type: string,
  message: string
}


export default function Receipts() {
  const {user} = useContext(AuthContext)
  const [receipts, setReceipts] = useState<ReceiptData[]>([])
  const [idDeleted, setIdDeleted] = useState<string>('')
  const [idChecked, setIdChecked] = useState<string>('')
  const [message, setMessage] = useState<MessageProps>({type: '', message: ''})
  console.log(user?.id)
  useEffect(() => {
    api.get(`/api/receipts/get-all/${user?.id}`).then(({data}) => {
      console.log(data)
      if(data.type === 'success') {
        setReceipts(data.allReceipts)
      }
    })
  }, [user?.id])
  
  useEffect(() => {
    if(idDeleted !== '') {
      setReceipts(receipts.filter(expenditure => expenditure.id !== idDeleted))
      setIdDeleted('')
    }
  }, [idDeleted, receipts])

  useEffect(() => {
    if(idChecked !== '') {
      receipts.map(receipt => {
        if( receipt.id === idChecked){
          receipt.isClosed = true
        }
      })
      setIdChecked('')
    }
  }, [idChecked, receipts])


  return (
    <div className="bg-white rounded-lg p-3 shadow-lg">
      <div className="flex items-center justify-between gap-1 pb-2 border-b border-b-gray-light mb-1">
        <div className="flex items-center gap-1">
          <span><BiCalendarPlus fontSize="1.7rem" /></span>
          <h1 className="text-2xl text-blackColor font-bold">Receitas</h1>
        </div>
        <button className="rounded-lg bg-actionColor text-white font-bold px-2 py-1 transition duration-300 hover:bg-baseColor">
          <Link passHref href="/dashboard/receipts/create">Adicionar</Link>
        </button>
      </div>
      {message.type !== '' ? <Message type={message.type} message={message.message} /> : ''}
        <div className="py-5">
          <div className="grid text-center grid-cols-5 text-blackColor font-medium px-3 mb-3">
            <p>Nome</p>
            <p>Valor (R$)</p>
            <p>Status</p>
            <p>Tipo</p>
            <p>Acões</p>
          </div>
          {
            receipts?.map((receipts) => (
              <SingleExpRec key={receipts?.id} data={receipts} setIdDeleted={setIdDeleted} setMessage={setMessage} setIdChecked={setIdChecked}  />
            ))
          }
        </div>
    </div>
  )
}

Receipts.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}