import { Request, Response } from "express";
import { CreateGoalsService } from "../../../services/Goals/CreateGoalsService";


export class CreateGoalsController {
  async handle(request: Request, response: Response) {

    const { maxExpenditure, minReceipt, userId } = request.body

    const createGoalsService = new CreateGoalsService()

    const goals = await createGoalsService.execute({maxExpenditure, minReceipt, userId})

    return response.json(goals)

  } 
}