import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

// express
const app = express();

// parsers
app.use(express.json());
// parsers
app.use(express.json());

const allowedOrigins = [
  'https://fresh-spare-frontend.vercel.app',
  'http://localhost:5173',
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  );
  next();
});
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

// application routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Fresh Spare Backend API!!!');
});

// global error handler
app.use(globalErrorHandler);

//not Found
app.use(notFound);

export default app;
