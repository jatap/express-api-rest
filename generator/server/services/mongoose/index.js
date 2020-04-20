import mongoose from 'mongoose';
import { mongo } from 'config';

mongoose.Promise = Promise;

/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = () => {
  return { id: this.toString() };
};

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
  const message = `>>> Mongoose connection error: ${err} <<<`;
  console.error(message);
  throw new Error(message);
});

/* istanbul ignore next */
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    const message =
      '>>> Mongoose default connection is disconnected due to application termination <<<';
    console.error(message);
    throw new Error(message);
  });
});

export const buildUri = () =>
  `mongodb://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`;

export default mongoose;
