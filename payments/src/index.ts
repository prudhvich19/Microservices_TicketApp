import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const start = async () => {
  // if(!process.env.JWT_KEY){
  //   throw new Error('JWT_KEY must be defined')
  // }
  // if(!process.env.MONGO_URI){
  //   throw new Error('MONGO_URI must be defined')
  // }
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
    
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
      
    await mongoose.connect('mongodb+srv://micro:YUDATxEwdk2NfT4X@cluster0.yq7ya.mongodb.net/payments?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    console.log('Connected to mongodb')
  }
  catch(err){
    console.log(err);
  }

  app.listen(4003, () => {
    console.log('Listening on port 4003!');
  });
};

start();