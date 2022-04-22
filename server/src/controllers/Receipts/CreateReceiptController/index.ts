import { CreateReceiptService } from './../../../services/Receipts/CreateReceiptService/index';
import { Request, Response } from "express";

export class CreateReceiptController {
  async handle(request: Request, response: Response) {
    
    const { name, category, typeReceipt, userId, walletsId, parcels, receiptValue } = request.body

    const createReceiptService = new CreateReceiptService()

    const expenditure = await createReceiptService.execute({  name, category, typeReceipt, userId, walletsId, parcels, receiptValue  })
 
    return response.json(expenditure)

  }
}