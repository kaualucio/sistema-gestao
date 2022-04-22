import { Request, Response } from "express";
import { GetAllReceiptsService } from './../../../services/Receipts/GetAllReceiptsService/index';

export class GetAllReceiptsByIdController {
  async handle(request: Request, response: Response) {

    const { userId } = request.params

    const getAllReceipts = new GetAllReceiptsService()

    const receipts = await getAllReceipts.execute(userId)

    return response.json(receipts)

  }
}