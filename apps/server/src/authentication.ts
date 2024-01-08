import jwt from "jsonwebtoken";
import UserModel, { UserDefinition as User } from "./modules/user/UserModel";

export type Config = {
  secret: string
}

type TokenPayload = {
  id: string
}

export const getAuth = async (token: string | null, secret: string) => {
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;

    const user = await UserModel.findById(decoded.id)
    return { user };
  } catch (_) {
    return { user: null };
  }
}

export const getToken = (user: User, secret: string) => {
  return jwt.sign({ id: user._id }, secret);
}
