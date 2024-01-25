import { UserModel } from "./UserModel"

let counter = 0;

const getCounter = () => {
  counter += 1;

  return counter;
}

export const createUser = () => {
  const index = getCounter();
  
  return new UserModel({
    username: `user#${index}`
  }).save();
}
