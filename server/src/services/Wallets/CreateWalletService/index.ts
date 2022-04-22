import { client } from "../../../prisma/client"

interface CreateWalletProps {
  userId: string,
  name: string,
  userPlan: string,
}

export class CreateWalletService {
  async execute({userId, name, userPlan}: CreateWalletProps) {

    if(userPlan === 'GRATIS') {
      const amountWalletsUser = await client.wallet.findMany({
        where: {
          userId
        }
      })

      if(amountWalletsUser.length === 3) {
        return {
          type: 'error',
          message: 'Seu plano atual não permite a criação de mais de 3 carteiras'
        }
      }
    }

    const alreadyExistWalletByName = await client.wallet.findFirst({
      where: {
        name,
        userId
      }
    })

    if(alreadyExistWalletByName) {
      return {
        type: 'error',
        message: 'Você já possui uma carteira com esse nome'
      }
    }

    try {
      const wallet = await client.wallet.create({
        data: {
          userId,
          name
        }
      })
      return {
        type: 'success', 
        message: 'Sua carteira foi criada com sucesso!',
        wallet
      }
    } catch (error) {
      console.log(error)
      return {
        type: 'error',
        message: 'Houve um erro ao criar uma Carteira, tente novamente!'
      }
    }

  }
}