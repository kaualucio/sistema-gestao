import { client } from "../../../prisma/client"

interface UpdateExpenditureProps {
  expenditureId: string, 
  name?: string, 
  category?: string, 
  typeReceipt?: string, 
  receiptValue?: string, 
  parcels?: number, 
  userId: string
}

export class UpdateExpenditureService {
  async execute({ expenditureId, name, category, typeReceipt, receiptValue, parcels, userId }: UpdateExpenditureProps) {
    const dataToUpdate = {
      name, 
      category, 
      typeReceipt, 
      receiptValue, 
      parcels, 
    }
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

    if(expenditureExist.userId !== userId) {
      return {
        type: 'error',
        message: 'Esta despesa não pertecence a você!'
      }
    }


    try {
      const uploadedExpenditure = await client.expenditures.update({
        where: {
          id: expenditureExist.id
        },
        data: {
          ...dataToUpdate
        }
      })

      return {
        type: 'success',
        message: 'Sua despesa foram atualizadas com sucesso!',
        uploadedExpenditure
      }
    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao atualizar a despesa, tente novamente!'
      }
    }

  }
}