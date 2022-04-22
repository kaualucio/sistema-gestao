import { client } from "../../../prisma/client";


export class GetUserByIdService {
  async execute(idUser: string) {
    const userDoesntExists = await client.user.findFirst({
      where: {
        id: idUser
      }
    })

    if(!userDoesntExists) {
      return { error: 'Usuário não foi encontrado' }
    }

    return {
      id: userDoesntExists.id,
      name: userDoesntExists.name,
      email: userDoesntExists.email,
      plan: userDoesntExists.userPlan
    }

    return userDoesntExists
  }
}