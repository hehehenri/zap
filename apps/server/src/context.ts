import { Context as KoaDefaultContext } from "koa";
import WebSocket, { WebSocketServer } from "ws";
import { UserDocument } from "./modules/user/UserModel";
import { getAuth, getToken } from "./authentication";
import { DataLoaders, buildLoaders } from "./dataloaders";

export type KoaContext = {
  websocket?: {
    server: WebSocketServer;
    ws: () => Promise<WebSocket>;
  }  
} & KoaDefaultContext ;

export type Context = {
  user: UserDocument | null,
  dataloaders: DataLoaders
}

export const buildContext = async (ctx: KoaContext): Promise<Context> => {
  const token = getToken(ctx);
  const { user } = await getAuth(token);

  return {
    user,
    dataloaders: buildLoaders()
  };
}
