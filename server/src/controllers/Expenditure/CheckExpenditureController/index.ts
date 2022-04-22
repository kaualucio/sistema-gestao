import { CheckExpenditureService } from './../../../services/Expenditure/CheckExpenditureService/index';
import { Request, Response } from "express";


export class CheckExpenditureController {
  async handle(request: Request, response: Response) {
    const {expenditureId} = request.params

    const checkExpenditureService = new CheckExpenditureService()

    const result = await checkExpenditureService.execute(expenditureId)

    return response.json(result)

  }
}