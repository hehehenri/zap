import Koa from "koa";
import cors from "koa-cors";
import bunyan from "bunyan";
import koaBunyan from "koa-bunyan-logger";
import routes from "./routes";

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
  const app = new Koa();

  app.use(cors());
  app.use(logger());
  app.use(koaBunyan.requestLogger());

  const router = routes();  
  app.use(router.routes());
  
  app.listen(config.port);
};

export { start }
