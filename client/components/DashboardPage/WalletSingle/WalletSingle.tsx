import moment from 'moment';
import Router from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes, FaEdit } from "react-icons/fa";
import { api } from "../../../services/api";

interface WalletProps {
  id: string,
  name: string,
  createdAt: Date,
  setIdDeleted: Dispatch<SetStateAction<string>>,
  setMessage: Dispatch<SetStateAction<{
    type: string,
    message: string
  }>>
}

export default function WalletSingle({ id, name, createdAt, setIdDeleted, setMessage }: WalletProps) {
  const [receipt, setReceipt] = useState(0)
  const [expenditure, setExpenditure] = useState(0)
  const deleteButtonRef = useRef<HTMLSpanElement>(null)
  const editButtonRef = useRef<HTMLSpanElement>(null)

  function handleEdit() {
    if(editButtonRef.current !== null) {
      Router.push(`/dashboard/wallets/wallet/${editButtonRef.current.id}`)
    }
  }

 

  function handleDelete() {
    if(deleteButtonRef.current !== null) {
      console.log('delete')
      api.delete(`/api/wallets/delete/${deleteButtonRef.current.id}`).then(({data}) => {
        if(data.type === 'success' && deleteButtonRef.current?.id) {
          setIdDeleted(deleteButtonRef.current?.id)
          setMessage({
            type: 'success',
            message: `Sua carteira deletada com sucesso!`
          })
        }
      })
    }
  }


  useEffect(() => {
    api.get(`/api/receipts/get-all-by-wallet/${id}`).then(({data}) => {
      if(data.type === 'success') {
        let allReceipt = 0
        data?.receipts.map((receiptSingle: { receiptValue: string; }) => {
          allReceipt += Number(receiptSingle.receiptValue)
        })

        setReceipt(allReceipt)
      }
    })
  }, [id])

  useEffect(() => {
    api.get(`/api/expenditures/get-all-by-wallet/${id}`).then(({data}) => {
      console.log(data)
      if(data.type === 'success') {
        let allExpenditure = 0
        data?.expenditures.map((expenditureSingle: { expenditureValue: string; }) => {
          allExpenditure += Number(expenditureSingle.expenditureValue)
        })
        setExpenditure(allExpenditure)
      }
    })
  }, [id])
  return (
    <div className="grid text-center grid-cols-5 bg-secondaryColor shadow-lg rounded-lg mb-2 p-3 text-blackColor font-medium">
      <div>
        <h2>{name}</h2>
      </div>
      <div>
        <p>{receipt},00</p>
      </div>
      <div>
        <p>{expenditure},00</p>
      </div>
      <div>
        <p>{moment(createdAt).format('DD/MM/YYYY')}</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span ref={deleteButtonRef} onClick={() => handleDelete()} id={id} className="text-md text-[#e3170a] cursor-pointer"><FaTimes fontSize="1.2rem"/></span>
        <span ref={editButtonRef} onClick={() => handleEdit()} id={id} className="text-md text-[#ffcc00] cursor-pointer"><FaEdit fontSize="1.2rem"/></span>
      </div>
    </div>
  )
}
