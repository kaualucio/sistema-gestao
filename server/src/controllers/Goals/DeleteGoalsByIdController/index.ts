import { DeleteGoalsService } from './../../../services/Goals/DeleteGoalsService/index';
import { Request, Response } from "express";


export class DeleteGoalsByIdController {
  async handle(request: Request, response: Response) {
    const { goalsId } = request.params

    const deleteGoalsService = new DeleteGoalsService()

    const result = await deleteGoalsService.execute(goalsId)

    return response.json(result)

  }
}