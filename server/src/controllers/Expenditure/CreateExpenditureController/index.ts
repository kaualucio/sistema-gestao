import { Request, Response } from "express";
import { CreateExpenditureService } from "../../../services/Expenditure/CreateExpenditureService";

export class CreateExpenditureController {
  async handle(request: Request, response: Response) {
    
    const { name, category, typeExpenditure, userId, walletsId, parcels, expenditureValue } = request.body

    const createExpenditureService = new CreateExpenditureService()

    const expenditure = await createExpenditureService.execute({ name, category, typeExpenditure, userId, walletsId, parcels, expenditureValue })
 
    return response.json(expenditure)

  }
}