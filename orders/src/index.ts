import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

const start = async () => {
  // if(!process.env.JWT_KEY){
  //   throw new Error('JWT_KEY must be defined')
  // }
  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI must be defined')
  }
  // if(!process.env.NATS_CLIENT_ID){
  //   throw new Error('NATS_CLIENT_ID must be defined')
  // }
  // if(!process.env.NATS_URL){
  //   throw new Error('NATS_URL must be defined')
  // }
  // if(!process.env.NATS_CLUSTER_ID){
  //   throw new Error('NATS_CLUSTER_ID must be defined')
  // }


  try {
    await natsWrapper.connect(
      'ticketing', 
      randomBytes(4).toString('hex'), 
      'http://192.168.49.2:32013'
      )//Replace with env in prod 
    
    natsWrapper.client.on('close', () => {
      console.log('NATS connecition closed!')
    });

    process.on('SIGINT', () => natsWrapper.client.close);
    process.on('SIGTERM', () => natsWrapper.client.close);

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
      
    await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    console.log('Connected to mongodb')
  }
  catch(err){
    console.log(err);
  }

  app.listen(4002, () => {
    console.log('Listening on port 4002!');
  });
};

start();