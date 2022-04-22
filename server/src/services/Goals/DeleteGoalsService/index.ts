import { client } from "../../../prisma/client";


export class DeleteGoalsService {
  async execute(goalsId: string) {

    try {
      await client.goals.delete({
        where: {
          id: goalsId
        }
      })

      return {
        type: 'success',
        message: 'Suas metas foram deletadas com sucesso'
      }
    } catch (error) {
      
      return {
        type: 'error',
        message: 'Houve um erro ao deletar suas metas, tente novemente!'
      }
    }

  }
}