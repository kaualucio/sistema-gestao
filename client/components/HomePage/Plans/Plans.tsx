import Link from 'next/link'
import React from 'react'

import { ImCheckmark } from 'react-icons/im'
import { FaTimes } from 'react-icons/fa'

import waveImg from '../../../public/assets/images/wave-7.svg'

export default function Plans() {
  return (
    <div className="bg-top bg-no-repeat py-6 md:bg-contain xs:bg-cover" style={{backgroundImage: `url('${waveImg.src}')`}}>
      <div className="py-8 container mx-auto text-center">
        <h2 className="text-blackColor xs:text-4xl md:text-5xl font-bold">Nossos Planos</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="px-4 py-6 rounded-xl bg-white shadow-xl">
            <h2 className="font-bold text-center text-blackColor text-3xl mb-4">Bronze</h2>
            <span className="font-bold text-center text-actionColor md:text-4xl lg:text-5xl xs:text-5xl">R$ 0,00</span>
            <div className="mt-4 lg:px-5 xs:px-3 py-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg text-baseColor"><ImCheckmark /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-red"><FaTimes /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-red"><FaTimes /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-red"><FaTimes /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>
            </div>
            <div className="inline-block mt-5 text-blackColor font-medium  text-lg lg:px-6 xs:px-3 py-1">
              Incluso ao criar a conta
            </div>
          </div>

          <div className="px-4 py-6 rounded-xl bg-white shadow-xl">
            <h2 className="font-bold text-center text-blackColor text-3xl mb-4">Prata</h2>
            <span className="font-bold text-center text-actionColor md:text-4xl lg:text-5xl xs:text-5xl">R$ 20,00</span>
            <div className="mt-4 lg:px-5 xs:px-3 py-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg text-baseColor"><ImCheckmark /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-baseColor"><ImCheckmark /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-red"><FaTimes /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-red"><FaTimes /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>
            </div>
            <div className="inline-block mt-5 bg-actionColor hover:bg-baseColor transition duration-300 text-white font-medium px-6 py-1 rounded-xl text-lg">
              <Link passHref href="/">Assinar</Link>
            </div>
          </div>

          <div className="px-4 py-6 rounded-xl bg-white shadow-xl">
            <h2 className="font-bold text-center text-blackColor text-3xl mb-4">Ouro</h2>
            <span className="font-bold text-center text-actionColor md:text-4xl lg:text-5xl xs:text-5xl">R$ 50,00</span>
            <div className="mt-4 lg:px-5 xs:px-3 py-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg text-baseColor"><ImCheckmark /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-baseColor"><ImCheckmark /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-baseColor"><ImCheckmark /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-baseColor"><ImCheckmark /></span>
                <p className="xs:text-lg md:text-sm text-blackColor">Lorem Ipsum</p>
              </div>
            </div>
            <div className="inline-block mt-5 bg-actionColor hover:bg-baseColor transition duration-300 text-white font-medium px-6 py-1 rounded-xl text-lg">
              <Link passHref href="/">Assinar</Link>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  )
}
