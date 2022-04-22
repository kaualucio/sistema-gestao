import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { getDataUserByToken, signInRequest } from '../services/auth'
import { api } from '../services/api'
import { setRefreshToken, setToken } from '../utils/tokens'

interface AuthProviderProps {
  children: ReactNode
}

type AuthContextType = {
  signIn: (data: SignInDataType) => Promise<void>
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>
}

type User = {
  id: string,
  name: string,
  email: string,
  plan: string,
}

type SignInDataType = {
  email: string,
  password: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { 'beru.access_token': token } = parseCookies()
    if(token) {
      const idUser = getDataUserByToken(token).id
      // console.log(idUser)
      api.get(`/api/users/get-by-id/${idUser}`)
      .then(({data}) => {
        setUser(data)
      })
    }
  }, [])

  async function signIn({email, password}: SignInDataType) {
    const { token, refresh_token, user } = await signInRequest({email, password})

    setToken(token)
    setRefreshToken(refresh_token)

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(user)

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ signIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}