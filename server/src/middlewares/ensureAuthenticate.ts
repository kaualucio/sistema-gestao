import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";


export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if(!authToken) {
    return response.status(401).json({error: 'Token is not sent'})
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, '668ecc57-75e3-4bd3-91ac-276383a6a6d4')

    next()
  } catch (error) {
    return response.status(401).json({error, message: 'Token expired'})
  }
}