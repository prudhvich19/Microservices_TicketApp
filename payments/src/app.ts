import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler , NotfoundError, currentUser } from '@pctickets/common';
import { createChargeRouter } from './routes/new';



const app = express();
//app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  //  secure: true process.env.NODE_ENV !== true
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.all('*', async() => {
    throw new NotfoundError();
})

app.use(errorHandler)

export { app }