import { client } from "../../../prisma/client";


export class GetGoalsByIdService {
  async execute(goalsId: string) {

    try {
      const goalsExists = await client.goals.findFirst({
        where: {
          id: goalsId
        }
      })

      return {
        type: 'success',
        goalsExists
      }
    } catch (error) {
      return {
        type: 'error',
        message: "Houve ao carregar suas metas, tente novamente"
      }
    }

  }
}