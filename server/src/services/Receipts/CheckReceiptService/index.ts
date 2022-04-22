import { client } from "../../../prisma/client"


export class CheckReceiptService {
  async execute(receiptId: string) {

    const receiptExist = await client.receipts.findFirst({
      where: {
        id: receiptId
      }
    })

    if(!receiptExist) {
      return {
        type: 'error',
        message: 'Não existe nenhuma despesa para este usuário!'
      }
    }

    try {
      await client.receipts.update({
        where: {
          id: receiptId
        },
        data: {
          isClosed: true
        }
      })

      return {
        type: 'success',
        message: 'Sua receita foi encerrada com sucesso!',
      }
    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao encerrar sua receita, tente novamente!'
      }
    }

  }
}