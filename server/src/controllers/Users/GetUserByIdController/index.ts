import { Request, Response } from "express";
import { GetUserByIdService } from "../../../services/Users/GetUserByIdService";


export class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const {idUser} = request.params
    

    const getUserByIdService = new GetUserByIdService()
    const userData = await getUserByIdService.execute(idUser)

    return response.json(userData)

  }
}