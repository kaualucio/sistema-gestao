import { client } from "../../../prisma/client";


export class GetAllReceiptsService {
  async execute(userId: string) {

    try {
      const allReceipts = await client.receipts.findMany({
        where: {
          userId
        }
      })

      return {
        type: 'success',
        allReceipts
      }

    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao carregar todas as receitas'
      }
    }

  }
}