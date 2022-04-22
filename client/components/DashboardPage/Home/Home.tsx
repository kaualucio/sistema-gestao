import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import Card from '../Card/Card'
import { FaMoneyBillAlt, FaPlus, FaSmileBeam, FaSadCry, FaTimes, FaWallet } from 'react-icons/fa' 
import { BsCheckLg  } from 'react-icons/bs'
import { AiOutlineAreaChart  } from 'react-icons/ai'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker}  from '@faker-js/faker'
import { api } from '../../../services/api';
import { AuthContext } from '../../../contexts/AuthContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};


const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];




interface ReceitpsData {
  category: string,
  createdAt: string,
  id: string,
  isClosed: boolean,
  name: string,
  parcels: number,
  receiptValue: string,
  typeReceipt: string,
  updatedAt: string,
  userId: string,
  walletsId: string,
}

interface ExpendituteData {
  category: string,
  createdAt: string,
  id: string,
  isClosed: boolean,
  name: string,
  parcels: number,
  expenditureValue: string,
  typeExpenditure: string,
  updatedAt: string,
  userId: string,
  walletsId: string,
}


export default function Home() {
  const { user } = useContext(AuthContext)
  const [receipts, setReceipts] = useState<ReceitpsData[]>([])
  const [expenditures, setExpenditures] = useState<ExpendituteData[]>([])
  const [expenditureAmount, setExpenditureAmount] = useState<number>(0)
  const [receiptAmount, setReceiptAmount] = useState<number>(0)
  console.log(user)
  useEffect(() => {
    api.get(`/api/receipts/get-all/${user?.id}`)
      .then(({data}) => {
        let amountReceipt = 0
        data.allReceipts?.map((receipt: { receiptValue: string; }) => {
          amountReceipt += Number(receipt.receiptValue)
        })
        setReceipts(data.allReceipts)
        setReceiptAmount(amountReceipt)
      })

    api.get(`/api/expenditures/get-all/${user?.id}`)
    .then(({data}) => {
      let amountExpenditure = 0
        data.allExpenditures?.map((expenditure: { expenditureValue: string; }) => {
          amountExpenditure += Number(expenditure.expenditureValue)
        })
      setExpenditures(data.allExpenditures)
      setExpenditureAmount(amountExpenditure)
    })
  }, [])

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: expenditures?.map((expenditure) => Number(expenditure.expenditureValue)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: receipts?.map((receipt) =>  Number(receipt.receiptValue)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
      <div className="lg:col-span-3 sm:col-span-2 xs:col-span-1 grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1  gap-4 ">
        <Card icon={<FaMoneyBillAlt fontSize="1.5rem"/>} bgColor="bg-gradient-to-b from-[#fed406] to-[#ffcc00]" title="Gastos Atuais" />
        <Card icon={<FaMoneyBillAlt fontSize="1.5rem"/>} bgColor="bg-gradient-to-b from-[#5bba6f] to-[#3fa34d]" title="Gasto Máximo" />
        <Card icon={<FaMoneyBillAlt fontSize="1.5rem"/>} bgColor="bg-gradient-to-b from-[#da1e37] to-[#ba181b]" title="Não utilizado" />
        <Card icon={<FaMoneyBillAlt fontSize="1.5rem"/>} bgColor="bg-gradient-to-b from-[#00b4d8] to-[#0077b6]" title="Total a Pagar" />
      </div>
      <div className="lg:col-span-2 md:co-span-2 xs:col-span-1 ">
        <div className="p-3  rounded-lg shadow-lg bg-white">
          <div className="flex items-center gap-1 pb-1 text-xl text-blackColor font-bold border-b border-b-gray-light">
            <AiOutlineAreaChart fontSize="1.5rem"/>
            <h2>Gráfico</h2>
          </div>
          <div>
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 md:co-span-1 xs:col-span-1">
      <div className="p-3 min-h-[400px] rounded-lg shadow-lg bg-white">
          <div className="flex items-center gap-1 mb-3 pb-1 text-xl text-blackColor font-bold border-b border-b-gray-light">
            <FaWallet fontSize="1.5rem"/>
            <h2>Nome carteira</h2>
          </div>
          <div className="flex items-center flex-col gap-4">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-medium text-blackColor">Receitas Totais</h3>
                <span className="cursor-pointer text-baseColor"><FaPlus fontSize="1.3rem" /></span>
              </div>
              <div className='p-4 text-center text-white bg-gradient-to-b from-[#5bba6f] to-[#3fa34d] shadow-lg rounded-lg'>
                  <h3 className="text-xl font-bold">Receita:</h3>
                  <p className="text-lg font-medium">R$ {receiptAmount},00</p>
              </div>
            </div>  

            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-medium text-blackColor">Despesas Totais</h3>
                <span className="cursor-pointer text-baseColor"><FaPlus fontSize="1.3rem" /></span>
              </div>
              <div className='p-4 text-center text-white bg-gradient-to-b from-[#da1e37] to-[#ba181b] shadow-lg rounded-lg'>
                <h3 className="text-xl font-bold">Despesas:</h3>
                <p className="text-lg font-medium">R$ {expenditureAmount},00</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className="col-span-1 ">
        <div className="p-2 rounded-lg h-48 overflow-y-auto shadow-lg bg-white">
          <div className="border-b border-b-gray-light text-blackColor flex items-center justify-between pb-1">
            <div className="flex items-center gap-1">
              <span className="text-[#3fa34d]"><FaSmileBeam fontSize="1.5rem" /></span>
              <h3 className="font-medium">Para Receber</h3>
            </div>
            <span className="text-actionColor underline"><Link href="#">+ Receitas</Link></span>
          </div>
          <div className="mt-1">
            {receipts?.map(receipt => (
              <div key={receipt.id} className="flex items-center justify-between p-1 bg-secondaryColor rounded-lg mb-1">
                <div className="flex items-center gap-1 font-medium text-sm text-blackColor">
                  <h3>{receipt.name}</h3>
                  <p> - R$ {receipt.receiptValue},00</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-md text-[#e3170a]"><FaTimes/></span>
                  <span  className="text-md text-[#14cc60]"><BsCheckLg/></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1 ">
        <div className="p-2 rounded-lg h-48 overflow-y-auto shadow-lg bg-white">
            <div className="border-b border-b-gray-light text-blackColor flex items-center justify-between pb-1">
              <div className="flex items-center gap-1">
                <span className="text-[#e00013]"><FaSadCry fontSize="1.5rem" /></span>
                <h3 className="font-medium">Para Pagar</h3>
              </div>
              <span className="text-actionColor underline"><Link href="#">+ Despesas</Link></span>
            </div>
            <div className="mt-1">
            {expenditures?.map(expenditure => (
              <div key={expenditure.id} className="flex items-center justify-between p-1 bg-secondaryColor rounded-lg mb-1">
                <div className="flex items-center gap-1 font-medium text-sm text-blackColor">
                  <h3>{expenditure.name}</h3>
                  <p> - R$ {expenditure.expenditureValue},00</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-md text-[#e3170a]"><FaTimes/></span>
                  <span  className="text-md text-[#14cc60]"><BsCheckLg/></span>
                </div>
              </div>
            ))}
            
          </div>
          </div>
      </div>
    </div>
  )
}
