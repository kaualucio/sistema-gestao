import { GetAllExpenditureByWalletIdService } from './../../../services/Expenditure/GetAllExpenditureByWalletIdService/index';


import { Request, Response } from "express";

export class GetAllExpenditureByWalletIdController {
  async handle(request: Request, response: Response) {

    const { walletId } = request.params

    const getAllExpenditureByWallet = new GetAllExpenditureByWalletIdService()

    const expenditures = await getAllExpenditureByWallet.execute(walletId)

    return response.json(expenditures)

  }
}