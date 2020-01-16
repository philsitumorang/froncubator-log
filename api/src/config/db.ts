import * as mongoose from 'mongoose';

async function connectToDB() {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(
      `mongodb://${process.env.MONGODB_APPLICATION_USER}:${process.env.MONGODB_APPLICATION_PASS}@${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_APPLICATION_DATABASE}`,
      {
        useNewUrlParser: true,
        autoReconnect: true
      });
    console.log('## MONGO CONNECTION SUCCESS ##');
  } catch (err) {
    console.log(err);
    setTimeout(() => {
      console.log('Reconnect...');
      connectToDB()
    }, 5000);
  }
}

export async function connect() {
  await connectToDB();
}