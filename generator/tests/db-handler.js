import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from 'config';

const mongod = new MongoMemoryServer();

mongoose.Promise = Promise;

global.dbCconnect = async () => {
global.dbConnect = async () => {
  const uri = await mongod.getConnectionString();

  await mongoose.connect(uri, config.mongo.options);

  mongoose.connection.on('error', (e) => {
    console.error(e);
  });
};

global.dbClose = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

global.dbClear = async () => {
  const { collections } = mongoose.connection;

  Object.keys(collections).forEach(async (key) => {
    const collection = collections[key];
    await collection.deleteMany();
  });
};
