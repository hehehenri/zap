import mongoose from "mongoose";

type Config = {
  uri: string
};

const connect = async (config: Config) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.uri)
}

export { connect };
