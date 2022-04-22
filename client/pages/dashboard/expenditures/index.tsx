import Link from 'next/link'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { BiCalendarMinus } from 'react-icons/bi'
import LayoutDashboard from '../../../components/DashboardPage/LayoutDashboard/LayoutDashboard'
import SingleExpRec from '../../../components/DashboardPage/SingleExpRec/SingleExpRec'
import Message from '../../../components/Message/Message'
import { AuthContext } from '../../../contexts/AuthContext'
import { api } from '../../../services/api'

interface ExpenditureData {
  id: string,
  useId: string,
  walletId: string,
  name: string,
  expenditureValue: string,
  isClosed: boolean,
  typeExpenditure: string,
}

interface MessageProps {
  type: string,
  message: string
}

export default function Expenditures() {
  
  const {user} = useContext(AuthContext)
  const [expenditures, setExpenditures] = useState<ExpenditureData[]>([])
  const [idDeleted, setIdDeleted] = useState<string>('')
  const [idChecked, setIdChecked] = useState<string>('')
  const [message, setMessage] = useState<MessageProps>({type: '', message: ''})
  console.log(user?.id)
  useEffect(() => {
    api.get(`/api/expenditures/get-all/${user?.id}`).then(({data}) => {
      console.log(data)
      if(data.type === 'success') {
        setExpenditures(data.allExpenditures)
      }
    })
  }, [user?.id])
  
  useEffect(() => {
    if(idDeleted !== '') {
      setExpenditures(expenditures.filter(expenditure => expenditure.id !== idDeleted))
      setIdDeleted('')
    }
  }, [idDeleted, expenditures])

  useEffect(() => {
    if(idChecked !== '') {
      expenditures.map(expenditure => {
        if( expenditure.id === idChecked){
          expenditure.isClosed = true
        }
      })
      setIdChecked('')
    }
  }, [idChecked, expenditures])

  return (
    <div className="bg-white rounded-lg p-3 shadow-lg">
      <div className="flex items-center justify-between gap-1 pb-2 border-b border-b-gray-light mb-2">
        <div className="flex items-center gap-1">
          <span><BiCalendarMinus fontSize="1.7rem" /></span>
          <h1 className="text-2xl text-blackColor font-bold">Despesas</h1>
        </div>
        <button className="rounded-lg bg-actionColor text-white font-bold px-2 py-1 transition duration-300 hover:bg-baseColor">
          <Link passHref href="/dashboard/expenditures/create">Adicionar</Link>
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
            expenditures?.map((expenditure) => (
              <SingleExpRec key={expenditure?.id} data={expenditure} setIdDeleted={setIdDeleted} setMessage={setMessage} setIdChecked={setIdChecked} />
            ))
          }
        </div>
    </div>
  )
}

Expenditures.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}