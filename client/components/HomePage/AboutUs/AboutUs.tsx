import Image from 'next/image'
import React from 'react'

import controlPanelImg from '../../../public/assets/images/control-panel.svg'

export default function AboutUs() {
  return (
    <div className="py-8 bg-gradient-to-b from-secondaryColor to-baseColor">
      <div className="container mx-auto flex gap-4 xs:flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col gap-2">
          <h2 className="text-white xs:text-4xl font-bold mb-2">Sobre Lorem</h2>
          <p className="font-medium text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempora doloribus aliquid ut reprehenderit porro quibusdam, harum sunt est tenetur nemo a libero ipsam dignissimos iste adipisci? Adipisci, ad quis.
          </p>
          <p className="font-medium text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae quo labore obcaecati aut, facere ipsa eius, nobis facilis quam et suscipit alias qui est reiciendis adipisci eum sunt perspiciatis autem.
          </p>
          <p className="font-medium text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae quo labore obcaecati aut, facere ipsa eius, nobis facilis quam et suscipit alias qui est reiciendis adipisci eum sunt perspiciatis autem.
          </p>
          </div>
        <div className="md:w-2/5 xs:w-3/5 sm:w-4/5 xs:mx-auto md:mx-0">
          <Image src={controlPanelImg} alt="Image 1" layout="responsive" objectFit="contain" />
        </div>
      </div>
    </div>
  )
}
