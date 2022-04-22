import { DeleteWalletByIdService } from './../../../services/Wallets/DeleteWalletByIdService/index';
import { Request, Response } from 'express';


export class  DeleteWalletByIdController {
  async handle(request: Request, response: Response) {
    const { walletId } = request.params

    const deleteWalletByIdService = new DeleteWalletByIdService()

    const result = await deleteWalletByIdService.execute(walletId)

    return response.json({type: result.type, message: result.message})
  }
}