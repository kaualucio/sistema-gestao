import { client } from "../../../prisma/client";


export class GetAllExpenditureByWalletIdService {
  async execute(walletId: string) {

    try {
      const expenditures = await client.expenditures.findMany({
        where: {
          walletsId: walletId
        }
      })

      return {
        type: 'success',
        expenditures
      }

    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao carregar as despesas'
      }
    }

  }
}