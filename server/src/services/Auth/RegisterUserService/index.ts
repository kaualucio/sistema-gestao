import { client } from "../../../prisma/client"
import { hash } from 'bcryptjs'
import { TokenProvider } from "../../../provider/tokenProvider";

interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  async execute({name, email, password}: RegisterUserProps) {
    const userAlreadyExists = await client.user.findUnique({
      where: {
        email
      }
    })

    if(userAlreadyExists) {
      return {
        type: 'error',
        message: 'Já existe um usuário com este e-mail'
      }
    }

    const hashedPassword = await hash(password, 10)

    try {
      const user = await client.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
      })
      // const activeAccountToken = await new TokenProvider().execute({idUser: user.id, expiresIn: '1d'})

      return { 
        user, 
        // activeAccountToken, 
        type: 'success' }
    } catch (error) {
      // console.log(error)
      return {
        type: 'error',
        message: 'Houve um erro ao criar o usuário, tente novamente'
      }
    }

  }
}