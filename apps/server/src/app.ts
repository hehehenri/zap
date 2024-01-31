import Koa from "koa";
import http from "http";
import cors from "koa-cors";
import bunyan, { LoggerOptions } from "bunyan";
import koaBunyan from "koa-bunyan-logger";
import routes from "./routes";
import { execute, subscribe } from "graphql";
import { WebSocketServer } from "ws";
import schema from "./schemas";
import { errorHandlerMiddleware } from "./routes/middlewares";
import { useServer } from "graphql-ws/lib/use/ws";
import config from "./config";
import { KoaContext, initialContext } from "./context";

const logger = () => {
  const options: LoggerOptions = {
    name: 'zap',
    serializers: bunyan.stdSerializers,
    streams: [
      {
        level: 'debug',
        stream: process.stdout
      },
      {
        level: 'info',
        path: '/var/tmp/logs.json'
      }
    ]
  };
  
  const logger = bunyan.createLogger(options);

  if (config.app.env === "test") {
    logger.level(bunyan.FATAL + 1);
  }
  
  return koaBunyan(logger);
}

export const createApp = () => {
  const app = new Koa<Koa.DefaultState, KoaContext>();

  app.use(cors({ credentials: true }));
  app.use(logger());

  const router = routes();  
  app.use(router.routes());
  app.use(errorHandlerMiddleware());

  return app;
}

const start = () => {
  const app = createApp();
  const server = http.createServer(app.callback());
  
  server.listen(config.app.port, () => {
    const wsServer = new WebSocketServer({
      server,
      path: "/graphql",
    });

    useServer({
      schema,
      context: initialContext(),
      execute,
      subscribe
    }, wsServer)
  });
};

export { start }
