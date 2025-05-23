import express from 'express'
import { router } from './routes';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { ErrorProcessing } from './repositories/implementations/ErrorProcessing';

const app = express()

app.use(express.json())
app.use(cookieParser());

app.use(router)

app.use(ErrorProcessing)

export { app };
