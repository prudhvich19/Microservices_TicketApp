import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler , NotfoundError } from '@pctickets/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/singup';

const app = express();
//app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  //  secure: true process.env.NODE_ENV !== true
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async() => {
    throw new NotfoundError();
})

app.use(errorHandler)

export { app }