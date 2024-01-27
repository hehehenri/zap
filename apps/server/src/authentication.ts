import jwt from "jsonwebtoken";
import { UserModel, UserDocument } from "./modules/user/UserModel";
import config from "./config";
import { KoaContext } from "./context";

export type Config = {
  secret: string
}

type TokenPayload = {
  id: string
}

export const getToken = (ctx: KoaContext) => {
  const auth = ctx.headers.authorization;
  if (!auth) return null;

  if (auth.startsWith("Bearer ")) {
    return auth.substring(7, auth.length);
  }

  return null
}

export const getAuth = async (token: string | null) => {
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as TokenPayload;

    const user = await UserModel.findById(decoded.id);
    return { user };
  } catch (_) {
    return { user: null };
  }
}

export const generateToken = (user: UserDocument) => {
  return jwt.sign({ id: user._id }, config.jwt.secret);
}
