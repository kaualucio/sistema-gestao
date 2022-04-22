import { client } from "../../../prisma/client";


export class GetAllReceiptByWalletIdService {
  async execute(walletId: string) {

    try {
      const receipts = await client.receipts.findMany({
        where: {
          walletsId: walletId
        }
      })

      return {
        type: 'success',
        receipts
      }

    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao carregar a receita'
      }
    }

  }
}