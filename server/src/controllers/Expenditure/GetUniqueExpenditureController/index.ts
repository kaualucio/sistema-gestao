import { GetUniqueExpenditureService } from '../../../services/Expenditure/GetUniqueExpenditureService/index';
import { Request, Response } from "express";

export class GetUniqueExpenditureController {
  async handle(request: Request, response: Response) {

    const { expenditureId } = request.params

    const getUniqueExpenditure = new GetUniqueExpenditureService()

    const expenditure = await getUniqueExpenditure.execute(expenditureId)

    return response.json(expenditure)

  }
}