import Koa from "koa";
import http from "http";
import cors from "koa-cors";
import bunyan from "bunyan";
import koaBunyan from "koa-bunyan-logger";
import routes from "./routes";
import { KoaContext } from "./schemas/context";
import WebSocket from "./routes/websocket";
import schema from "./schemas";
import { errorHandlerMiddleware } from "./routes/middlewares";

type Config = {
  port: number,
}

const logger = () => {  
  const options = {
    name: 'zap',
    serializers: bunyan.stdSerializers
  };
  
  const logger = bunyan.createLogger(options);
  return koaBunyan(logger);
}

const start = (config: Config) => {
  const app = new Koa<Koa.DefaultState, KoaContext>();

  app.use(cors({ credentials: true }));
  app.use(logger());
  app.use(koaBunyan.requestLogger());

  const router = routes();  
  app.use(router.routes());
  app.use(errorHandlerMiddleware());

  const server = http.createServer(app.callback());

  WebSocket.handleUpgrade(server, schema);
  
  server.listen(config.port);
};

export { start }
