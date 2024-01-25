import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const db = await MongoMemoryServer.create();

export const connect = async () => {
  const uri = db.getUri();

  await mongoose.connect(uri);
}

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await db.stop();
};

export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    (collections[key]).deleteMany();
  }
}
