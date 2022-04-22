import Link from 'next/link'
import React from 'react'

export default function CallToAction() {
  return (
    <div  className="py-8 w-3/5 mx-auto text-center">
      <div className="container mx-auto">
        <h2 className="text-blackColor text-4xl font-bold mb-3">E aí, gostou da nossa proposta?</h2>
        <p className="text-blackColor font-medium">Então faça já seu cadastro, e comece agora mesmo a utilizar tudo que temos a oferecer a você!</p>
        <button className="mt-3 bg-actionColor hover:bg-baseColor transition duration-300 font-medium text-white px-5 py-1 rounded-xl text-lg shadow-lg">
          <Link href="/register">Cadastrar-se</Link>
        </button>
      </div>
    </div>
  )
}
