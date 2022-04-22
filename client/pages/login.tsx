import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { useState, useContext, FormEvent } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import loginImg from '../public/assets/images/login.svg'

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {signIn, user} = useContext(AuthContext)
  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    signIn({email, password})
  }

  return (
    <div id="login" className="h-[100vh] bg-gradient-to-b from-baseColor to-secondaryColor">
      <div className="w/ px-3 order-2">
        <form onSubmit={(e) => handleLogin(e)} className="w-2/5 mx-auto centerItemAbsolute rounded-xl shadow-xl bg-white p-5">
          <h2 className="text-3xl text-blackColor font-bold text-center mb-5">Faça seu login</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <label htmlFor="email" className="block text-xl font-medium text-blackColor mb-1">Email:</label>
              <input onChange={e => setEmail(e.target.value)} className="w-full px-1 h-[40px] outline-0 border rounded-lg"  type="email" id="email" name="email" />
            </div>
            <div className="col-span-2">
              <label htmlFor="password" className="block text-xl font-medium text-blackColor mb-1">Senha:</label>
              <input onChange={e => setPassword(e.target.value)} className="w-full px-1 h-[40px] outline-0 border rounded-lg"  type="password" id="password" name="email" />
            </div>
            <div className="col-span-2 flex items-center justify-between mt-3">  
              <button type="submit" className="col-span-1 w-36 bg-actionColor text-white font-medium py-1 rounded-lg hover:bg-baseColor transition duration-300">
                Entrar
              </button>
              <span className="text-sm">Não tem uma conta? <span className="text-actionColor underline"><Link href="/register">Cadastre-se</Link></span></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['beru.access_token']: token, ['beru.refresh_token']: refreshToken } = parseCookies(ctx)

  if(token || refreshToken) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }  

  return {
    props: {
    }
  }
}

export default Login