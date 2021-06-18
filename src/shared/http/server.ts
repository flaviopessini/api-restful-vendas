import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes/index';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());
// Middleware captura e trata os erros.
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // Se o erro capturado for de uma instancia de AppError.
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    // Se for erro desconhecido ou não tratado na aplicação.
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.APP_API_URL_PORT, () => {
  console.log('Server started on port 3333');
});
