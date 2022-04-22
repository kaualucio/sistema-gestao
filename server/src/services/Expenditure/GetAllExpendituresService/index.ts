import { client } from "../../../prisma/client";


export class GetAllExpendituresService {
  async execute(userId: string) {

    try {
      const allExpenditures = await client.expenditures.findMany({
        where: {
          userId
        }
      })

      return {
        type: 'success',
        allExpenditures
      }

    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao carregar todas as despesas'
      }
    }

  }
}