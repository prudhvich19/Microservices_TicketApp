import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  // if(!process.env.JWT_KEY){
  //   throw new Error('JWT_KEY must be defined')
  // }
  // if(!process.env.MONGO_URI){
  //   throw new Error('MONGO_URI must be defined')
  // }

  try {
      await mongoose.connect('mongodb+srv://micro:YUDATxEwdk2NfT4X@cluster0.yq7ya.mongodb.net/auth?retryWrites=true&w=majority',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected to mongodb')
  }
  catch(err){
    console.log(err);
  }

  app.listen(4000, () => {
    console.log('Listening on port 4000!');
  });
};

start();