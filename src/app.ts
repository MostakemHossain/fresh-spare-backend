import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

// express
const app = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

// application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Fresh Spare Backend API!!!');
});

export default app;
