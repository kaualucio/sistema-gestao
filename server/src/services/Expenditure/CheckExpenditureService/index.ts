import { client } from "../../../prisma/client"

// interface UpdateExpenditureProps {
//   expenditureId: string, 
//   name?: string, 
//   category?: string, 
//   typeReceipt?: string, 
//   receiptValue?: string, 
//   parcels?: number, 
//   isClosed?: boolean
// }

export class CheckExpenditureService {
  async execute(expenditureId: string) {

    const expenditureExist = await client.expenditures.findFirst({
      where: {
        id: expenditureId
      }
    })

    if(!expenditureExist) {
      return {
        type: 'error',
        message: 'Não existe nenhuma despesa para este usuário!'
      }
    }

    try {
      await client.expenditures.update({
        where: {
          id: expenditureId
        },
        data: {
          isClosed: true
        }
      })

      return {
        type: 'success',
        message: 'Sua despesa foi encerrada com sucesso!',
      }
    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao encerrar sua despesa, tente novamente!'
      }
    }

  }
}