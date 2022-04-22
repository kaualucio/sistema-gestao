import { UpdateReceiptService } from './../../../services/Receipts/UpdateReceiptService/index';
import { Request, Response } from "express";

export class UpdateReceiptByIdController {
  async handle(request: Request, response: Response) {

    const { receiptId } = request.params
    const { name, category, typeReceipt, receiptValue, parcels, userId } = request.body

    const updateExpenditureService = new UpdateReceiptService()

    const receipt = await updateExpenditureService.execute({ receiptId, name, category, typeReceipt, receiptValue, parcels, userId })

    return response.json(receipt)

  }
}