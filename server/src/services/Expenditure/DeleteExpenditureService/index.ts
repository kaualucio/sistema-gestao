import { client } from "../../../prisma/client";


export class DeleteExpenditureService {
  async execute(expenditureId: string) {

    try {
      await client.expenditures.delete({
        where: {
          id: expenditureId
        }
      })

      return {
        type: 'success',
        message: 'Despesa excluída com sucesso!'
      }
    } catch (error) {
      
      return {
        type: 'error',
        message: 'Houve um erro ao deletar esta despesa, tente novemente!'
      }
    }

  }
}