import { client } from "../../../prisma/client"

interface UpdateGoalsProps {
  goalsId: string,
  userId: string,
  maxExpenditure?: string, 
  minReceipt?: string, 
  currentExpenditure?: string, 
  currentReceipt?: string
}

export class UpdateGoalsService {
  async execute({goalsId, userId, maxExpenditure, minReceipt, currentExpenditure, currentReceipt}: UpdateGoalsProps) {
    const dataToUpdate = {
      maxExpenditure, 
      minReceipt, 
      currentExpenditure, 
      currentReceipt
    }
    const goalsExist = await client.goals.findFirst({
      where: {
        id: goalsId
      }
    })

    if(!goalsExist) {
      return {
        type: 'error',
        message: 'Não existe nenhuma meta para este usuário!'
      }
    }

    try {
      const uploadedGoals = await client.goals.update({
        where: {
          userId: userId
        },
        data: {
          ...dataToUpdate
        }
      })

      return {
        type: 'success',
        message: 'Suas metas foram atualizadas com sucesso!',
        uploadedGoals
      }
    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao atualizar as metas, tente novamente!'
      }
    }

  }
}