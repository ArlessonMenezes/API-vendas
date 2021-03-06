import '@shared/typeorm';
import 'express-async-errors';
import 'reflect-metadata';

import uploadConfig from '../../config/upload';
import AppError from '../../shared/errors/AppError';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import routes from './routes';

const app = express();

app.use(cors())

app.use(express.json())

app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.use(errors())

app.use(
  (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(error)
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
})

app.listen(3333, () => console.log("Server started on port 3333!"))