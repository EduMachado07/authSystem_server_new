import { NextFunction, Request, Response } from 'express';
import { AppError } from '../IErrorsRepository';

export const ErrorProcessing = (
    err: Error & Partial<AppError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const statusCode = err.statusCode ?? 500
    const message = err.statusCode ? err.message : 'Internal Server Error'

    console.log(`Erro: ${statusCode}, ${message}`);
    return res.status(statusCode).json({ message })
}
