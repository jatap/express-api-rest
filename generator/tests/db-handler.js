import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from 'config';

const mongod = new MongoMemoryServer();

mongoose.Promise = Promise;

export const connect = async () => {
  const uri = await mongod.getConnectionString();

  await mongoose.connect(uri, config.mongo.options);

  mongoose.connection.on('error', (e) => {
    console.error(e);
  });
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;

  Object.keys(collections).forEach(async (key) => {
    // for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
    // }
  });
};
