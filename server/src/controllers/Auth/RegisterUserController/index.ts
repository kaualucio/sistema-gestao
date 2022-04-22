import { Request, Response } from "express"
import { RegisterUserService } from "../../../services/Auth/RegisterUserService"
import { MailService } from '../../../services/MailerService/MailService';


export class RegisterUserController {
  async handle(request: Request, response: Response) {

    const { name, email, password } = request.body

    const registerUserService = new RegisterUserService()

    const {user, type} = await registerUserService.execute( { name, email, password } )

    // const mailer = new MailService(user?.email, 'emailparatestes992@gmail.com', 'Ative sua conta', 'activeAccount/active_account', { token: activeAccountToken, idUser: user?.id }).sendEmail()
    

    return response.json({user, type})

  }
}