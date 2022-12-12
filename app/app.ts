import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import AsyncErr from './src/middlewares/async';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(AsyncErr);

export { app }