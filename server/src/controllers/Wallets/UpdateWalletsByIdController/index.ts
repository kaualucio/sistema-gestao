import { UpdateWalletService } from './../../../services/Wallets/UpdateWalletService/index';
import { Request, Response } from "express";


export class UpdateWalletsByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { name, userId } = request.body

    const updateWalletService = new UpdateWalletService()

    const updatedWallet = await updateWalletService.execute({id, name, userId})

    return response.json(updatedWallet)
  } 
}