import { Request, Response } from "express";
import { AuthUserService } from "../../../services/Auth/AuthUserService";


export class AuthenticateUserController {
  async handle(request: Request, response: Response) {

    const { email, password } = request.body

    const authUser = new AuthUserService()
    const {token, refreshToken} = await authUser.execute({ email, password }) 

    return response.json({token, refreshToken})

  }
}