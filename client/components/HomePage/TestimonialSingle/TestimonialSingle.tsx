import Image from 'next/image'
import React from 'react'

import placeholderImg from '../../../public/assets/images/placeholder.svg'


export default function TestimonialSingle() {
  return (
    <div className="xs:w-full md:w-auto md:p-5 xs:px-3 xs:py-5 bg-white rounded-xl">
      <blockquote>
        <p className="text-center text-blackColor font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tempora, cum natus vitae quod qui reprehenderit nobis ab
          libero, fugit.
        </p>
        <cite className="mt-3 flex items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full">
            <Image src={placeholderImg} alt="placeholder" />
          </div>
          Fábio Marques
        </cite>
      </blockquote>
    </div>
  )
}
