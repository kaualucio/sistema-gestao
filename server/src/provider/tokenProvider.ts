import { sign } from 'jsonwebtoken'

// enum Plans {
//   'BRONZE',
//   'PRATA',
//   'OURO'
// }

interface User {
  name: string | undefined,
  email: string | undefined,
  userPlan: string | undefined,
  isActive: boolean | number | undefined
}

interface TokenProviderProps {
  idUser: string;
  expiresIn: string;
  data?: User;
}

export class TokenProvider {
  async execute({idUser, expiresIn, data}: TokenProviderProps) {
    if(process.env.JWT_SECRET) {
      const token = sign({
        idUser,
        ...data
      }, process.env.JWT_SECRET, {
        subject: idUser,
        expiresIn: expiresIn
      })
      return token;
    }
  }
}