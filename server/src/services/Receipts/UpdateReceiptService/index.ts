import { client } from "../../../prisma/client"

interface UpdateExpenditureProps {
  receiptId: string,
  name?: string, 
  category?: string, 
  typeReceipt?: string, 
  receiptValue?: string, 
  parcels?: number,
  userId: string
}

export class UpdateReceiptService {
  async execute({ receiptId, name, category, typeReceipt, receiptValue, parcels, userId }: UpdateExpenditureProps) {
    const dataToUpdate = {
      name, 
      category, 
      typeReceipt, 
      receiptValue, 
      parcels, 
    }
    const receiptExist = await client.receipts.findFirst({
      where: {
        id: receiptId
      }
    })

    if(!receiptExist) {
      return {
        type: 'error',
        message: 'Não existe nenhuma receita para este usuário!'
      }
    }

    if(receiptExist.userId !== userId) {
      return {
        type: 'error',
        message: 'Esta receita não pertecence a você!'
      }
    }

    try {
      const uploadedReceipt = await client.receipts.update({
        where: {
          name: receiptExist.name
        },
        data: {
          ...dataToUpdate
        }
      })

      return {
        type: 'success',
        message: 'Sua receita foi atualizada com sucesso!',
        uploadedReceipt
      }
    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao atualizar a receita, tente novamente!'
      }
    }

  }
}