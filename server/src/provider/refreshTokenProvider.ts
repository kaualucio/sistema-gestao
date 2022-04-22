import dayjs from 'dayjs'
import { client } from '../prisma/client'

export class RefreshTokenProvider {
  async execute(userId: string) {

    const expiresIn = dayjs().add(1, 'hour').unix();
    
    const currentRefreshToken = await client.refreshToken.findFirst({
      where: {
        userId
      }
    })

    if(currentRefreshToken) {
      const refreshTokenExpires = dayjs().isAfter(dayjs.unix(currentRefreshToken.expiresIn))

      if(refreshTokenExpires) {
        //delete prev refresh_token
        await client.refreshToken.delete({
          where: {
            userId
          }
        })

        //create a new refresh_token
        const newRefreshToken = await client.refreshToken.create({
          data: {
            userId,
            expiresIn
          }
        })
        //return new refresh token
        return newRefreshToken.id
      }
      //if not expired return current refresh token
      return currentRefreshToken.id
    }

    const refreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })


    return refreshToken.id
  }
}