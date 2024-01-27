import config from "../../config";
import { UserDocument, UserModel } from "./UserModel"
import bcrypt from "bcryptjs";

let counter = 0;

const getCounter = () => {
  counter += 1;

  return counter;
}

type Fields = Pick<UserDocument, Exclude<keyof UserDocument, "_id">>

export const createUser = async (fields?: DeepPartial<Fields>) => {
  const index = getCounter();

  const plainTextPassword = fields?.password ?? "password";

  const password = bcrypt.hashSync(plainTextPassword, config.jwt.saltRounds);
  const username = fields?.username ?? `user#${index}`;

  const user = new UserModel({ password, username });
  await user.save();

  return user;
}
