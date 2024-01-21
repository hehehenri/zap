import Koa from "koa";
import http from "http";
import cors from "koa-cors";
import bunyan from "bunyan";
import koaBunyan from "koa-bunyan-logger";
import routes from "./routes";
import { KoaContext } from "./schemas/context";
import { execute, subscribe } from "graphql";
import { WebSocketServer } from "ws";
import schema from "./schemas";
import { errorHandlerMiddleware } from "./routes/middlewares";
import { useServer } from "graphql-ws/lib/use/ws";
import config from "./config";

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

const start = () => {
  const app = createApp();
  const server = http.createServer(app.callback());
  
  server.listen(config.app.port, () => {
    console.log("http: server running on: http://localhost:8000/graphql");

    const wsServer = new WebSocketServer({
      server,
      path: "/graphql"
    });

    useServer({ schema, execute, subscribe }, wsServer)
    console.log("ws: server running on ws://localhost:8000/graphql")
  });
};

export { start }
