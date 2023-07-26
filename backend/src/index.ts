import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import * as trpcExpress from '@trpc/server/adapters/express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router,
  })
);

app.listen(3005, () => {
  console.log('Server running on port 3005');
});
