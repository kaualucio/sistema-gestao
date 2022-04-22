import Image from 'next/image'
import React from 'react'

import waveImg from '../../../public/assets/images/wave-10.svg'
import paymentsImg from '../../../public/assets/images/payments.svg'
import organizerImg from '../../../public/assets/images/organizer.svg'
import investmentDataImg from '../../../public/assets/images/investment-data.svg'

export default function Services() {
  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-blackColor xs:text-4xl md:text-5xl font-bold">Serviços</h2>
          <p className="text-blackColor font-medium my-3">Aqui estão algumdos serviços que *_nome_sistema_* pode te fornecer </p>
        </div>
        <div className="xs:px-3 md:px-6 mt-6 gap-5 grid md:grid-cols-3 xs:grid-cols-1 items-center">
          
          <div className="h-full sm:w-4/5 sm:mx-auto md:w-full md:mx-0 hover:border-actionColor md:hover:scale-105 transition duration-500 px-4 py-6 shadow-lg rounded-xl border-t-4 border-baseColor text-center">
            <div className="w-3/5 mx-auto">
              <Image src={paymentsImg} alt="Image 2" layout="responsive"  objectFit="contain" />
            </div>
              <h3 className="text-xl font-bold text-baseColor my-3">Serviço 1</h3>
              <p className="md:text-sm xs:text-md font-medium text-blackColor">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima, cupiditate sint laudantium quae quas.</p>
          </div>

          <div className="h-full sm:w-4/5 sm:mx-auto md:w-full md:mx-0  hover:border-actionColor md:hover:scale-105 transition duration-500 md:px-4 py-6 shadow-lg rounded-xl border-t-4 border-baseColor text-center">
            <div className="w-3/5 mx-auto">
              <Image src={organizerImg} alt="Image 2" layout="responsive" objectFit="contain" />
            </div>
            <h3 className="text-xl font-bold text-baseColor my-3">Serviço 1</h3>
              <p className="md:text-sm xs:text-md font-medium text-blackColor">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima, cupiditate sint laudantium quae quas.</p>
          </div>

          <div className="h-full sm:w-4/5 sm:mx-auto md:w-full md:mx-0  hover:border-actionColor md:hover:scale-105 transition duration-500 px-4 py-6 shadow-lg rounded-xl border-t-4 border-baseColor text-center">
            <div className="w-3/5 mx-auto">
              <Image src={investmentDataImg} alt="Image 2" layout="responsive"  objectFit="contain" />
            </div>
              <h3 className="text-xl font-bold text-baseColor my-3">Serviço 1</h3>
              <p className="md:text-sm xs:text-md font-medium text-blackColor">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima, cupiditate sint laudantium quae quas.</p>
          </div>
      
        </div>
      </div>
    </div>
  )
}
