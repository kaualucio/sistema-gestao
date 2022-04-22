import { client } from "../../../prisma/client";


export class DeleteReceiptService {
  async execute(receiptId: string) {

    try {
      await client.receipts.delete({
        where: {
          id: receiptId
        }
      })

      return {
        type: 'success',
        message: 'Receita excluída com sucesso!'
      }
    } catch (error) {
      console.log(error)
      return {
        type: 'error',
        message: 'Houve um erro ao deletar esta receita, tente novemente!'
      }
    }

  }
}