import { CheckReceiptService } from './../../../services/Receipts/CheckReceiptService/index';

import { Request, Response } from "express";


export class CheckReceiptController {
  async handle(request: Request, response: Response) {
    const {receiptId} = request.params

    const checkReceiptService = new CheckReceiptService()

    const result = await checkReceiptService.execute(receiptId)

    return response.json(result)

  }
}