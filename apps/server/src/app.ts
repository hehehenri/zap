import Koa from "koa";
import http from "http";
import cors from "koa-cors";
import bunyan from "bunyan";
import koaBunyan from "koa-bunyan-logger";
import routes from "./routes";
import { KoaContext } from "./schemas/context";
import * as ws from "./routes/websocket";
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

const createApp = () => {
  const app = new Koa<Koa.DefaultState, KoaContext>();

  app.use(cors({ credentials: true }));
  app.use(logger());

  const router = routes();  
  app.use(router.routes());
  app.use(errorHandlerMiddleware());

  return app;
}

const start = (config: Config) => {
  const app = createApp();

  const server = http.createServer(app.callback());

  ws.createWsServer(server, schema);
  
  server.listen(config.port);
};

export { start }
