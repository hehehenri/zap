import { Context } from "koa";
import WebSocket, { WebSocketServer } from "ws";

export type GraphQLContext = {
  user: any | null,
}

export type KoaContext = {
  websocket?: {
    server: WebSocketServer;
    ws: () => Promise<WebSocket>;
  }  
} & Context;
