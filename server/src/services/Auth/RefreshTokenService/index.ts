import { client } from "../../../prisma/client"
import { RefreshTokenProvider } from '../../../provider/refreshTokenProvider';
import { TokenProvider } from "../../../provider/tokenProvider";

export class RefreshTokenService {
  async execute(refresh_token: string) {
    
    const refreshTokenAlreadyExists = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refreshTokenAlreadyExists) {
      return {
        type: 'error',
        message: 'Token invalid'
      }
    }

    const user = await client.user.findFirst({
      where: {
        id: refreshTokenAlreadyExists.userId
      }
    })

    const refreshToken = await new RefreshTokenProvider().execute(refreshTokenAlreadyExists.userId)
    const token = await new TokenProvider().execute({idUser: refreshTokenAlreadyExists.userId, expiresIn: '30s', data: {
      name: user?.name,
      email: user?.email,
      isActive: user?.isActive,
      userPlan: user?.userPlan
    }}) 

    return { token, refreshToken }

  }
}