import { client } from "../../../prisma/client"


interface CreateGoalsProps {
  maxExpenditure: string, 
  minReceipt: string
  userId: string
}

export class CreateGoalsService {
  async execute({maxExpenditure, minReceipt, userId}: CreateGoalsProps) {

    const alreadyExistsGoalsToUser = await client.goals.findFirst({
      where: {
        userId
      }
    })

    if(alreadyExistsGoalsToUser) {
      return {
        type: 'error',
        message: 'Você já possui metas criadas, não pode criar outros, caso queria mudar suas metas atualize elas'
      }
    }

    const goals = await client.goals.create({
      data: {
        userId,
        maxExpenditure,
        minReceipt
      }
    })

    return {
      type: 'success',
      message: 'Suas metas foram criadas com sucesso!',
      goals
    }

  }
}