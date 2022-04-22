import { GetAllWalletsService } from '../../../services/Wallets/GetAllWalletsService/index';
import { Request, Response } from 'express';


export class GetAllWalletsUserController {
  async handle(request: Request, response: Response) {

    const { userId } = request.params

    const getAllWalletsService = new GetAllWalletsService()

    const wallets = await getAllWalletsService.execute(userId)

    return response.status(200).json(wallets)

  }
}