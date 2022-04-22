import { client } from "../../../prisma/client";

interface UpdateWalletProps {
  id: string,
  name?: string,
  userId: string
}

export class UpdateWalletService {
  async execute({id, name, userId}: UpdateWalletProps) {

    const walletExist = await client.wallet.findFirst({
      where: {
        id
      }
    })

    if(!walletExist) {
      return {
        type: 'error',
        message: 'Você não possue uma carteira com esse nome'
      }
    }

    if(walletExist.userId !== userId) {
      return {
        type: 'error',
        message: 'Esta carteira não pertecence a você!'
      }
    }

    try {
      const updateWallet = await client.wallet.update({
        where: {
          id: walletExist.id
        },
        data: {
          name
        }
      })
  
      return {
        type: 'success',
        message: 'O nome da carteira foi atualizada com sucesso',
        updateWallet
      }
  
    } catch (error) {
      console.log(error)
      return {
        type: 'error',
        message: 'Houve um erro ao atualizar a carteira, tente novemente'
      }
    }
  }
}