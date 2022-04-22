import { CreateWalletService } from './../../../services/Wallets/CreateWalletService/index';
import { Request, Response } from 'express';


export class CreateWalletController {
  async handle(request: Request, response: Response) {
    const {userId, name, userPlan} = request.body

    const createWalletService = new CreateWalletService()
    const wallet = await createWalletService.execute({userId, name, userPlan}) 



    return  response.json(wallet)
  }
}