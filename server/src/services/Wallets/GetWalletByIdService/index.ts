import { client } from "../../../prisma/client";


export class GetWalletByIdService {
  async execute(walletId: string) {

    try {
      const wallet = await client.wallet.findFirst({
        where: {
          id: walletId
        }
      })

      return wallet
    } catch (error) {
      
      return { error: 'Houve um erro ao recuperar a carteira, tente novamete' }
    }

  }
}