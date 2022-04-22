import { client } from "../../../prisma/client"
import { compare } from 'bcryptjs'
import { RefreshTokenProvider } from "../../../provider/refreshTokenProvider"
import { TokenProvider } from "../../../provider/tokenProvider"

interface AuthUserProps {
  email: string,
  password: string
}

export class AuthUserService {
  async execute({email, password}: AuthUserProps) {
    
    const userExist = await client.user.findUnique({
      where: {
        email
      }
    })

    if(!userExist) {
      return {
        type: 'error',
        message: 'Não existe usuário com este email ou senha!'
      }
    }
    
    if(userExist.isActive === false) {
      return {
        type: 'error',
        message: 'Sua conta não está ativada, ative-a primeiro para conseguir logar!'
      }
    }
  
    const matchedPassword = await compare(password, userExist.password)

    if(!matchedPassword) {
      return {
        type: 'error',
        message: 'Senha incorreta!'
      }
    }

    try {
      const token = await new TokenProvider().execute({idUser: userExist.id, expiresIn: '900s', data: {
        name: userExist.name,
        email: userExist.email,
        userPlan: userExist.userPlan,
        isActive: userExist.isActive,
      }})
  
      const refreshToken = await new RefreshTokenProvider().execute(userExist.id)

      return { token, refreshToken }
    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um error ao realizar o login, tente novamente'
      }
    }

  }
}