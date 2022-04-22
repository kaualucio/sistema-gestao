import { client } from "../../../prisma/client"
import { decode, JwtPayload, verify } from 'jsonwebtoken'

export class ActiveAccountService {
  async execute(token: string) {
    const data  = decode(token) as JwtPayload

    const isValidToken = verify(token, '668ecc57-75e3-4bd3-91ac-276383a6a6d4')

    if(isValidToken) {
      await client.user.update({
        where: {
          id: data?.idUser
        },
        data: {
          isActive: true
        }
      })

      return { type: 'success', message: 'Sua conta foi ativada com sucesso!' }
    }else {
      return {  type: 'error', message: 'O link para ativação expirou, envie outro link para seu email!' }
    }

  }
}