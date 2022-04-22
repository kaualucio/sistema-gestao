import { UpdateExpenditureService } from './../../../services/Expenditure/UpdateExpenditureService/index';
import { Request, Response } from "express";

export class UpdateExpenditureByIdController {
  async handle(request: Request, response: Response) {

    const { expenditureId } = request.params
    const { name, category, typeReceipt, receiptValue, parcels, userId} = request.body

    const updateExpenditureService = new UpdateExpenditureService()

    const expenditure = await updateExpenditureService.execute({expenditureId, name, category, typeReceipt, receiptValue, parcels, userId})

    return response.json(expenditure)

  }
}