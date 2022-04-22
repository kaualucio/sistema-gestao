import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { FormEvent, useState } from 'react'
import Message from '../components/Message/Message'

import { api } from '../services/api'

interface MessageProps {
  type: string,
  message: string
}

const Register: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<MessageProps>({type: '', message: ''})
  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if(name === ''|| email === '' || password === '') {
      setMessage({
        type: 'warning',
        message: 'Campos vazios não são permitidos'
      })
      return;
    }

    if(password !== confirmPassword) {
      setMessage({
        type: 'warning',
        message: 'As senhas não estão iguais'
      })
      return;
    }

    api.post('/api/auth/register', {
      name,
      email,
      password
    }).then(({data: {type}}) => {
      if(type === 'success') {
        setMessage({
          type: 'success',
          message: 'Cadastro realizado com sucesso, acesse seu e-mail e ative sua conta'
        })
      }
    })
  }

  return (
    <div id="register" className="h-[100vh] bg-gradient-to-b from-baseColor to-secondaryColor">
      <div className="w/ px-3 order-2">
        <form onSubmit={(e) => handleRegister(e)} className="w-2/5 mx-auto centerItemAbsolute rounded-xl shadow-xl bg-white p-5">
          <h2 className="text-3xl text-blackColor font-bold text-center mb-5">Faça seu cadastro</h2>
        {message.type !== '' && message.message !== '' && <Message type={message.type} message={message.message} />}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block text-xl font-medium text-blackColor mb-1">Nome:</label>
              <input onChange={e => setName(e.target.value)} className="w-full px-1 h-[40px] outline-0 border rounded-lg"  type="text" id="name" name="name" />
            </div>
            <div className="col-span-2">
              <label htmlFor="email" className="block text-xl font-medium text-blackColor mb-1">Email:</label>
              <input onChange={e => setEmail(e.target.value)} className="w-full px-1 h-[40px] outline-0 border rounded-lg"  type="email" id="email" name="email" />
            </div>
            <div className="col-span-1">
              <label htmlFor="password" className="block text-xl font-medium text-blackColor mb-1">Senha:</label>
              <input onChange={e => setPassword(e.target.value)} className="w-full px-1 h-[40px] outline-0 border rounded-lg"  type="password" id="password" name="email" />
            </div>

            <div className="col-span-1">
              <label htmlFor="confirmPassword" className="block text-xl font-medium text-blackColor mb-1">Confirmar Senha:</label>
              <input onChange={e => setConfirmPassword(e.target.value)} className="w-full px-1 h-[40px] outline-0 border rounded-lg"  type="password" id="confirmPassword" name="confirmPassword" />
            </div>
            <div className="col-span-2 flex items-center justify-between mt-3">
              <button type="submit" className="w-36 bg-actionColor text-white font-medium py-1 rounded-lg hover:bg-baseColor transition duration-300">Cadastrar</button>
              <span className="text-sm">Já possue uma conta? Então <span className="underline text-actionColor"><Link href="/login">Faça Login</Link></span></span>
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


export default Register