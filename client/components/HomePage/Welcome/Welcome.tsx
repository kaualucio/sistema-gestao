import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import welcomeImg from '../../../public/assets/images/organizing-projects.svg'
import waveImg from '../../../public/assets/images/wave-6.svg'
export default function Welcome() {
  return (
    <div className=" relative z-30 bg-bottom bg-no-repeat py-6 md:bg-contain xs:bg-cover" style={{backgroundImage: `url('${waveImg.src}')`}}>
      <div className="container mx-auto flex items-center gap-4 xs:flex-col md:flex-row">
        <div className="md:w-2/5 xs:w-full xs:text-center xs:mb-4 md:mb-0 md:text-left">
          <h2 className="text-blackColor xs:text-4xl md:text-5xl font-bold">
            
            Comece agora a <span className="text-baseColor">gerênciar</span> suas contas
          </h2>
          <p className="text-blackColor font-medium my-3">Está perdido no meio de tantas contas? Comece agora mesmo a ter controle dos seu gastos!</p>
          <button className="mt-3 bg-actionColor hover:bg-baseColor transition duration-300 font-medium text-white px-5 py-1 rounded-xl text-lg shadow-lg">
            <Link href="/register">Cadastrar-se</Link>
          </button>
        </div>
        <div className="md:w-3/5 xs:w-full">
          <div className="w-5/6 mx-auto">
            <Image src={welcomeImg} alt="Imagem 1" layout="responsive" />
          </div>
        </div>
      </div>
    </div>
  )
}
