import config from "../../config";
import { UserModel } from "./UserModel"
import bcrypt from "bcryptjs";

let counter = 0;

const getCounter = () => {
  counter += 1;

  return counter;
}

export const createUser = () => {
  const index = getCounter();  

  return new UserModel({
    username: `user#${index}`,
    password: bcrypt.hashSync("password", config.jwt.saltRounds)
  }).save();
}
