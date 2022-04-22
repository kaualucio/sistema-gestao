import { Request, Response } from "express"
import { RefreshTokenService } from "../../../services/Auth/RefreshTokenService"

export class RefreshTokenController {
  async handle(request: Request, response: Response) {

    const { refresh_token } = request.body
    
    const {token, refreshToken} = await new RefreshTokenService().execute(refresh_token)

    return response.json({token, refreshToken})

  }
}