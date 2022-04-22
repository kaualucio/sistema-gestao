import { Request, Response } from "express";
import { ActiveAccountService } from "../../../services/Auth/ActiveAccountService";


export class ActiveAccountController {
  async handle(request: Request, response: Response) {

    const {activeAccountToken} = request.params

    const activeAccountService = new ActiveAccountService()

    const result = await activeAccountService.execute(activeAccountToken)

    return response.json(result)
  }
}