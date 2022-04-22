import jwt_decode  from "jwt-decode"
import { api } from "./api"

type SignInRequestData = {
  email: string,
  password: string
}

type userData = {
  email: string,
  idUser: string,
  userPlan: string,
  name: string
}

export function getDataUserByToken(token: string) {
  const { idUser, name, email, userPlan} = jwt_decode<userData>(token)

  return { id:idUser, name:name, email: email, plan: userPlan}
}

export async function signInRequest({email, password}: SignInRequestData) {

  const {data} = await api.post('/api/auth/login', {
    email, password
  })

  const decodeData = getDataUserByToken(data.token)

  return {
    token: data.token,
    refresh_token: data.refreshToken,
    user: decodeData
  }
  

}