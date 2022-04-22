import { NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { authRoutes } from './routes/AuthenticationRoutes';
import path from 'path';
import { usersRoutes } from './routes/UserRoutes';
import { walletRoutes } from './routes/WalletRoutes';
import { goalsRoutes } from './routes/GoalsRoutes';
import { expenditureRoutes } from './routes/ExpenditureRoutes';
import { receiptsRoutes } from './routes/ReceiptsRoutes';

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'https://projeto-sem-nome.vercel.app'
}))
app.use(express.json())
app.use('resources', express.static(path.join(__dirname, 'resources')))
app.use(express.urlencoded({extended: false}))
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: 'Error',
    message: error.message
  })
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/wallets', walletRoutes)
app.use('/api/goals', goalsRoutes)
app.use('/api/expenditures', expenditureRoutes)
app.use('/api/receipts', receiptsRoutes)

app.listen(PORT, () => console.log('Server is running on PORT: ' + PORT))