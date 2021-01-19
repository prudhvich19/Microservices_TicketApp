import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler , NotfoundError, currentUser } from '@pctickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';



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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async() => {
    throw new NotfoundError();
})

app.use(errorHandler)

export { app }