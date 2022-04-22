import { client } from "../../../prisma/client";


export class GetUniqueExpenditureService {
  async execute(expenditureId: string) {

    try {
      const expenditure = await client.expenditures.findFirst({
        where: {
          id: expenditureId
        }
      })

      return {
        type: 'success',
        expenditure
      }

    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao carregar a despesa'
      }
    }

  }
}