import { Request, Response } from 'express';
import { GetWalletByIdService } from '../../../services/Wallets/GetWalletByIdService';

export class GetWalletByIdController {
  async handle(request: Request, response: Response) {

    const { walletId } = request.params

    const getWalletByIdService = new GetWalletByIdService()

    const wallet = await getWalletByIdService.execute(walletId)

    return response.status(200).json(wallet)

  }
}