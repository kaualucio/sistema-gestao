import { useRouter } from 'next/router'
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react'
import { BiCalendarPlus } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import LayoutDashboard from '../../../../components/DashboardPage/LayoutDashboard/LayoutDashboard'
import Message from '../../../../components/Message/Message'
import { AuthContext } from '../../../../contexts/AuthContext'
import { api } from '../../../../services/api'

interface MessageProps {
  type: string,
  message: string
}

export default function Receipt() {
  const router = useRouter()
  const {user} = useContext(AuthContext)
  const [message, setMessage] = useState<MessageProps>({type: '', message: ''})
  const [receiptOriginalName, setReceiptOriginalName] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [typeReceipt, setTypeReceipt] = useState('')
  const [parcels, setParcels] = useState(0)
  const [valueReceipt, setValueReceipt] = useState('')
  console.log(router.query.id)
  useEffect(() => {
    if(router.query.id) {
      api.get(`/api/receipts/get-one/${router.query.id}`).then(({data}) => {
        if(data.type === 'success') {
          setReceiptOriginalName(data.receipt.name)
          setName(data.receipt.name)
          setCategory(data.receipt.category)
          if(data.receipt.typeReceipt === 'parcela') setParcels(data.receipt.parcels)
          setTypeReceipt(data.receipt.typeReceipt)
          setValueReceipt(data.receipt.receiptValue)
        }
      })
    }
  }, [router.query.id])
  useEffect(() => {
    if(!router.query.id) {
      router.push('/dashboard/receipts')
    }
  })
  function sendUpdateRequest(e: FormEvent) {
      e.preventDefault()

      api.put(`/api/receipt/update/${router.query.id}`, {
        userId: user?.id,
        name,
        category,
        typeReceipt,
        parcels,
        receiptValue: valueReceipt
      }).then(({data}) => {
          setMessage({type: data.type, message: data.message})
      })

    }
  return (
    <div className="bg-white rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-1 pb-2 border-b border-b-gray-light mb-1">
        <span><BiCalendarPlus fontSize="1.7rem" /></span>
        <h1 className="text-2xl text-blackColor font-bold">Receita - {receiptOriginalName}</h1>
      </div>
      {message.type !== '' ? <Message type={message.type} message={message.message} /> : ''}
      <div className="mt-2">
        <form onSubmit={(e) => sendUpdateRequest(e)} className="grid xs:grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg shadow-lg bg-secondaryColor">
            <div className="">
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="name">Nome:</label>
              <input className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" type="text" name="name" id="name" placeholder="Nome da receita" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div>
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="category">Categoria:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" name="category" id="category" >
              <option selected disabled value="">Selecione a categoria</option>
                <option value="">Salário</option>
                <option value="">Aluguel</option>
                <option value="">Outros</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="typeReceipt">Tipo de Receita:</label>
              <select value={typeReceipt} onChange={(e) => setTypeReceipt(e.target.value)} className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" name="typeReceipt" id="typeReceipt">
                <option selected disabled value="">Selecione o tipo</option>
                <option value="">Ùnica</option>
                <option value="">Fixa</option>
                <option value="">Parcela</option>
              </select>
            </div>


            <div>
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="parcels">Parcelas:</label>
              <input disabled={parcels === 0 ? true : false} className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" type="number" name="parcels" id="parcels" placeholder="Ex: 12" value={parcels} onChange={(e) => setParcels(Number(e.target.value))} />
            </div>

            <div className="xs:col-span-1 md:col-span-2">
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="name">Valor da receita:</label>
              <input className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" type="text" name="name" id="name" placeholder="Valor da receita (R$)" value={valueReceipt} onChange={(e) => setValueReceipt(e.target.value)} />
            </div>

            <div className="mt-1">
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

Receipt.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}