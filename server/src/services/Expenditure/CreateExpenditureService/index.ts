import { client } from "../../../prisma/client"

interface CreateExpenditureProps {
  name: string,
  category: string,
  typeExpenditure: string,
  userId: string,
  walletsId: string,
  parcels: number, 
  expenditureValue: string
}

export class CreateExpenditureService {
  async execute({ name, category, typeExpenditure, userId, walletsId, parcels, expenditureValue }: CreateExpenditureProps) {

    const alreadyExistsExpByName = await client.expenditures.findFirst({
      where: {
        name
      }
    })

    if(alreadyExistsExpByName) {
      return {
        type: 'error',
        message: 'Você já possue uma despesa com esse nome!'
      }
    }


    try {
      
      const expenditure = await client.expenditures.create({
        data: {
          walletsId,
          userId, 
          name, 
          category, 
          typeExpenditure, 
          parcels,
          expenditureValue,
          isClosed: false
        }
      })

      return {
        type: 'success',
        message: 'Sua despesa foi criada com sucesso!',
        expenditure
      }

    } catch (error) {
      console.log(error)
      return {
        type: 'error',
        message: 'Houve um erro ao criar sua despesa, tente novamente!'
      }

    }

  }
}