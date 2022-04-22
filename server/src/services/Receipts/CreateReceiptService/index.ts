import { client } from "../../../prisma/client"

interface CreateExpenditureProps {
  name: string,
  category: string,
  typeReceipt: string,
  userId: string,
  walletsId: string,
  parcels: number, 
  receiptValue: string
}

export class CreateReceiptService {
  async execute({ name, category, typeReceipt, userId, walletsId, parcels, receiptValue }: CreateExpenditureProps) {

    const alreadyExistsRecByName = await client.receipts.findFirst({
      where: {
        name
      }
    })

    if(alreadyExistsRecByName) {
      return {
        type: 'error',
        message: 'Você já possue uma receita com esse nome!'
      }
    }


    try {
      
      const expenditure = await client.receipts.create({
        data: {
          walletsId,
          userId, 
          name, 
          category, 
          typeReceipt, 
          parcels,
          receiptValue,
          isClosed: false
        }
      })

      return {
        type: 'success',
        message: 'Sua receita foi criada com sucesso!',
        expenditure
      }

    } catch (error) {
      return {
        type: 'error',
        message: 'Houve um erro ao criar sua receita, tente novamente!'
      }

    }

  }
}