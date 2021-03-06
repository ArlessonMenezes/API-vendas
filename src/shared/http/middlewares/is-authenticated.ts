import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  data: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT token is missing")
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodeToken = verify(token, authConfig.jwt.secret)

    const { data } = decodeToken as ITokenPayload

    req.user = {
      id: data,
    }

    return next()
  } catch {
    throw new AppError("Invalid JWT Token")
  }
}