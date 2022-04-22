import { Request, Response } from "express";
import { UpdateGoalsService } from "../../../services/Goals/UpdateGoalsService";


export class UpdateGoalsByIdController {
  async handle(request: Request, response: Response) {

    const { goalsId } = request.params;
    const { maxExpenditure, userId, minReceipt, currentExpenditure, currentReceipt } = request.body

    const updateGoalsService = new UpdateGoalsService()

    const goals = await updateGoalsService.execute({ goalsId, userId, maxExpenditure, minReceipt, currentExpenditure, currentReceipt })

    return response.json(goals)

  }
}