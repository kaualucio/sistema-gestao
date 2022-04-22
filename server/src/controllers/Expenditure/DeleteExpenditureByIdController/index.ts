import { DeleteExpenditureService } from './../../../services/Expenditure/DeleteExpenditureService/index';

import { Request, Response } from "express";


export class DeleteExpenditureByIdController {
  async handle(request: Request, response: Response) {
    const { expenditureId } = request.params

    const deleteExpenditureService = new DeleteExpenditureService()

    const result = await deleteExpenditureService.execute(expenditureId)

    return response.json(result)

  }
}