import { client } from "../../../prisma/client";


export class GetUniqueReceiptService {
  async execute(receiptId: string) {

    try {
      const receipt = await client.receipts.findFirst({
        where: {
          id: receiptId
        }
      })

      return {
        type: 'success',
        receipt
      }

    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao carregar a receita'
      }
    }

  }
}