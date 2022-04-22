import { useRouter } from 'next/router'
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react'
import { BiCalendarMinus } from 'react-icons/bi'
import { BsPatchPlusFill } from 'react-icons/bs'
import LayoutDashboard from '../../../components/DashboardPage/LayoutDashboard/LayoutDashboard'
import Message from '../../../components/Message/Message'
import { AuthContext } from '../../../contexts/AuthContext'
import { api } from '../../../services/api'

interface WalletsData {
  id: string,
  name: string,
  description: string
}

interface MessageProps {
  type: string,
  message: string
}

export default function CreateExpenditure() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [typeExpenditure, setTypeExpenditure] = useState('')
  const [parcels, setParcels] = useState(0)
  const [valueExpenditure, setValueExpenditure] = useState('')
  const [wallet, setWallet] = useState('')
  const {user} = useContext(AuthContext)
  const [wallets, setWallets] = useState<WalletsData[]>([])
  const [message, setMessage] = useState<MessageProps>({type: '', message: ''})

  useEffect(() => {
      api.get(`/api/wallets/get-all/${user?.id}`).then(({data}) => {
        setWallets(data)
      })

  }, [user?.id])

  function handleCreateExpenditures(e: FormEvent) {
    e.preventDefault()
    api.post('/api/expenditures/create', {
      name, 
      category, 
      typeExpenditure, 
      userId: user?.id, 
      walletsId: wallet, 
      parcels, 
      expenditureValue: valueExpenditure
    }).then(({data}) => {
      setMessage({type: data.type, message: data.message})
    })
  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-1 pb-2 border-b border-b-gray-light mb-1">
        <span><BiCalendarMinus fontSize="1.7rem" /></span>
        <h1 className="text-2xl text-blackColor font-bold">Adicionar Despesa</h1>
      </div>
      {message.type !== '' ? <Message type={message.type} message={message.message} /> : ''}
      <div className="mt-2">
        <form onSubmit={(e) => handleCreateExpenditures(e)} className="grid xs:grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg shadow-lg bg-secondaryColor">
            <div className="">
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="name">Nome:</label>
              <input className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" type="text" name="name" id="name" placeholder="Nome da despesa" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div>
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="category">Categoria:</label>
              <select  value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" name="category" id="category">
              <option disabled value="" selected>Selecione a categoria</option>
                <option value="salario">Salário</option>
                <option value="aluguel">Aluguel</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="typeReceipt">Tipo de Despesa:</label>
              <select value={typeExpenditure} onChange={(e) => setTypeExpenditure(e.target.value)} className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" name="typeReceipt" id="typeReceipt">
                <option disabled value="" selected>Selecione o tipo</option>
                <option value="unica">Ùnica</option>
                <option value="fixa">Fixa</option>
                <option value="parcela">Parcela</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="typeReceipt">Carteira:</label>
              <select value={wallet} onChange={(e) => setWallet(e.target.value)} className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" name="typeReceipt" id="typeReceipt">
                <option disabled value="" selected>Selecione a carteira</option>
                {
                  wallets?.map(walletSingle => (
                    <option key={walletSingle.id} value={walletSingle.id}>{walletSingle.name}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="parcels">Parcelas:</label>
              <input disabled={typeExpenditure === 'parcela' ? false : true} className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" type="number" name="parcels" id="parcels" placeholder="Ex: 12" value={parcels} onChange={(e) => setParcels(Number(e.target.value))} />
            </div>
            

            <div className="xs:col-span-1 md:col-span-2">
              <label className="block font-medium text-lg mb-1 text-blackColor" htmlFor="name">Valor da Despesa:</label>
              <input className="border border-gray-light w-full px-1 h-[2.5rem] outline-0 rounded-md" type="text" name="name" id="name" placeholder="Valor da despesa (R$)" value={valueExpenditure} onChange={(e) => setValueExpenditure(e.target.value)} />
            </div>

            <div className="mt-1">
              <button className="flex items-center gap-1 px-4 py-2 text-white font-bold bg-actionColor rounded-md cursor-pointer transition duration-300 hover:brightness-75" type="submit">
                <BsPatchPlusFill fontSize="1.2rem"/>
                Criar
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

CreateExpenditure.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}