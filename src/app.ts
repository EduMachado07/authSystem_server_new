import express from 'express'
import { router } from './routes';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json())
app.use(cookieParser());

app.use(router)

export { app };
