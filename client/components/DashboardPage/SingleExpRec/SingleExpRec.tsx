import Router, { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes, FaEdit } from "react-icons/fa";
import { api } from "../../../services/api";
interface ReceiptProps {
  data: {
    id: string,
    useId: string,
    walletId: string,
    name: string,
    expenditureValue?: string,
    receiptValue?: string,
    isClosed: boolean,
    typeExpenditure?: string,
    typeReceipt?: string,
  },
  setIdDeleted: Dispatch<SetStateAction<string>>,
  setIdChecked: Dispatch<SetStateAction<string>>,
  setMessage: Dispatch<SetStateAction<{
    type: string,
    message: string
  }>>
}

export default function SingleExpRec({data, setIdDeleted, setIdChecked, setMessage}: ReceiptProps) {
  const router = useRouter()
  const [,dashboard, currentPath] = router.pathname.split('/')
  
  const deleteButtonRef = useRef<HTMLSpanElement>(null)
  const checkButtonRef = useRef<HTMLSpanElement>(null)
  const editButtonRef = useRef<HTMLSpanElement>(null)

  function handleEdit() {
    if(editButtonRef.current !== null) {
      Router.push(`/dashboard/${currentPath}/${currentPath === 'expenditures' ? 'expenditure' : 'receipt'}/${editButtonRef.current.id}`)
    }
  }

  function handleCheck() {
    if(checkButtonRef.current !== null) {
      api.put(`/api/${currentPath}/check/${checkButtonRef.current.id}`).then(({data}) => {
        if(data.type === 'success' && checkButtonRef.current?.id) {
          setIdChecked(checkButtonRef.current?.id)
          setMessage({
            type: 'success',
            message: `${currentPath === 'expenditures' ? 'Despesa' : 'Receita'} encerrada com sucesso!`
          })
        }
      })
    }
  }

  function handleDelete() {
    if(deleteButtonRef.current !== null) {
      api.delete(`/api/${currentPath}/delete/${deleteButtonRef.current.id}`).then(({data}) => {
        console.log(data)
        if(data.type === 'success' && deleteButtonRef.current?.id) {
          setIdDeleted(deleteButtonRef.current?.id)
          setMessage({
            type: 'success',
            message: `${currentPath === 'expenditures' ? 'Despesa' : 'Receita'} deletada com sucesso!`
          })
        }
      })
    }
  }

  return (
    <div className="grid text-center grid-cols-5 bg-secondaryColor shadow-lg rounded-lg mb-2 p-3 text-blackColor font-medium capitalize">
      <div>
        <h2>{data.name}</h2>
      </div>
      <div>
        <p>{currentPath === 'expenditures' ? data.expenditureValue : data.receiptValue},00</p>
      </div>
      <div>
        <p>
          {data.isClosed ? 'Fechado' :  'Aberto'}
        </p>
      </div>
      <div>
        <p>{currentPath === 'expenditures' ? data.typeExpenditure : data.typeReceipt}</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span ref={deleteButtonRef} id={data.id} onClick={() => handleDelete()} className="text-md text-[#e3170a] cursor-pointer"><FaTimes fontSize="1.2rem"/></span>
        {
          data.isClosed === false && (
            <>
              <span ref={checkButtonRef} id={data.id} onClick={() => handleCheck()} className="text-md text-[#14cc60] cursor-pointer"><BsCheckLg fontSize="1.2rem"/></span>
              <span ref={editButtonRef} id={data.id} onClick={() => handleEdit()} className="text-md text-[#ffcc00] cursor-pointer"><FaEdit fontSize="1.2rem"/></span>
            </>
          )
        }
      </div>
    </div>
  )
}
