import { GetAllExpendituresService } from './../../../services/Expenditure/GetAllExpendituresService/index';
import { Request, Response } from "express";

export class GetAllExpendituresByIdController {
  async handle(request: Request, response: Response) {

    const { userId } = request.params

    const getAllExpenditures = new GetAllExpendituresService()

    const expenditures = await getAllExpenditures.execute(userId)

    return response.json(expenditures)

  }
}