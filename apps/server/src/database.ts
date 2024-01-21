import mongoose from "mongoose";
import config from "./config";

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.database.uri)
}

export { connect };
