import { DeleteReceiptService } from './../../../services/Receipts/DeleteReceiptService/index';
import { Request, Response } from "express";


export class DeleteReceiptByIdController {
  async handle(request: Request, response: Response) {
    const { receiptId } = request.params

    const deleteReceiptService = new DeleteReceiptService()

    const result = await deleteReceiptService.execute(receiptId)

    return response.json(result)

  }
}