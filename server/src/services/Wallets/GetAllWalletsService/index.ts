import { client } from "../../../prisma/client";


export class GetAllWalletsService {
  async execute(userId: string) {

    try {
      const allWallets = await client.wallet.findMany({
        where: {
          userId
        }
      })

      return allWallets
    } catch (error) {
      
      return { error: 'Houve um erro ao recuperar as carteiras, tente novamete' }
    }

  }
}