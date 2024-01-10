import { Context } from "koa";
import WebSocket, { WebSocketServer } from "ws";
import { UserDefinition } from "../modules/user/UserModel";

export type GraphQLContext = {
  user: UserDefinition | null,
}

export type KoaContext = {
  websocket?: {
    server: WebSocketServer;
    ws: () => Promise<WebSocket>;
  }  
} & Context;
