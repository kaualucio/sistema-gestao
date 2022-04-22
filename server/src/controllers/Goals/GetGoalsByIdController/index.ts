import { Request, Response } from "express";
import { GetGoalsByIdService } from "../../../services/Goals/GetGoalsByIdService";

export class GetGoalsByIdController {
  async handle(request: Request, response: Response) {
    const { goalsId } = request.params

    const getGoalsService = new GetGoalsByIdService();

    const goals = await getGoalsService.execute(goalsId)

    return response.json(goals)

  }
}