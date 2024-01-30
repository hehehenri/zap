import { KoaContext } from "@/context";
import WebSocket, { WebSocketServer } from "ws";

const servers: Map<string, WebSocketServer>  = new Map();

const createServer = (url: string) => {
  const server = new WebSocketServer({
    noServer: false
  })

  servers.set(url, server);

  return server;
}

const getOrCreateServer = (url: string) => {
  const cachedServer = servers.get(url);

  return cachedServer
    ? cachedServer
    : createServer(url)
}

export const websocketMiddleware = () => async (ctx: KoaContext, next: () => Promise<any>) => {
  const headers = (ctx.request.headers.upgrade || '').split(',').map((s: string) => s.trim());

  if (headers.includes("websocket")) {
    const server = getOrCreateServer(ctx.url);

    const ws = () => new Promise<WebSocket>(resolve => {
      server.handleUpgrade(
        ctx.req,
        ctx.request.socket,
        Buffer.alloc(0),
        ws => {
          server.emit('connection', ws, ctx.req);
          resolve(ws);
        }
      );

      ctx.respond = false;
    });

    ctx.websocket = { ws, server }
  }

  await next();
}
