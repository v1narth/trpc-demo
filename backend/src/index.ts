import express, { Request, Response, NextFunction } from 'express';
import router from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    status: 'error',
    message: err.message,
  });
});

app.listen(3005, () => {
  console.log('Server running on port 3005');
});
