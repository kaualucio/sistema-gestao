import { useState } from "react"

interface MessageProps {
  type: string,
  message: string
}

export default function Message({type, message}: MessageProps) {
  const [typeMessage, setTypeMessage] = useState('')
  let classNameMessage;

  switch (type) {
    case 'success':
      classNameMessage = 'bg-[#27fb6b] border-[#14cc60]'
      break;
    case 'error':
      classNameMessage = 'bg-[#c42021] border-[#a50104]'
      break;
    case 'warning':
      classNameMessage = 'bg-[#ff7e00] border-[#fe4e00]'
      break;
    default:
      break;
  }
  
  return (
    <div className={`w-full border-[2px] text-center font-medium py-2 mb-2 rounded-lg text-white ${classNameMessage}`}>
      <p>{message}</p>
    </div>
  )
}
