import { client } from "../../../prisma/client";


export class DeleteWalletByIdService {
  async execute(walletId: string) {

    try {
      await client.expenditures.deleteMany({
        where: {
          walletsId: walletId
        }
      })

      await client.receipts.deleteMany({
        where: {
          walletsId: walletId
        }
      })


      await client.wallet.delete({
        where: {
          id: walletId
        }
      })

      return {
        type: 'success',
        message: 'Sua carteira e todos dados relacionados a ela foram deletada com sucesso!'
      }
    } catch (error) {
      console.log(error)
      return {
        type: 'error',
        message: 'Houve um erro ao deletar a carteira, tente novamente'
      }
    }

  }
}