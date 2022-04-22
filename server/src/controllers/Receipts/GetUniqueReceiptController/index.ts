import { GetUniqueReceiptService } from './../../../services/Receipts/GetUniqueReceiptService/index';
import { Request, Response } from "express";

export class GetUniqueReceiptController {
  async handle(request: Request, response: Response) {

    const { receiptId } = request.params

    const getUniqueReceipt = new GetUniqueReceiptService()

    const receipt = await getUniqueReceipt.execute(receiptId)

    return response.json(receipt)

  }
}