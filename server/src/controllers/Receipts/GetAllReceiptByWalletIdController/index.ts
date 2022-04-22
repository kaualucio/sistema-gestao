import { GetAllReceiptByWalletIdService } from './../../../services/Receipts/GetAllReceiptByWalletIdService/index';

import { Request, Response } from "express";

export class GetAllReceiptByWalletIdController {
  async handle(request: Request, response: Response) {

    const { walletId } = request.params

    const getAllReceiptByWallet = new GetAllReceiptByWalletIdService()

    const receipts = await getAllReceiptByWallet.execute(walletId)

    return response.json(receipts)

  }
}