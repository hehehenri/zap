import Koa from "koa";
import cors from "koa-cors";
import bunyan from "bunyan";
import koaBunyan from "koa-bunyan-logger";
import Router from "koa-router";
import router from "./router";

type LogLevel = "trace" | "debug" | "info";

type Config = {
  port: number,
  logger: {
    level: LogLevel
  }
}

const logger = ({ level }: { level: LogLevel }) => {
  const options = {
    level,
    name: 'zap',
    serializers: bunyan.stdSerializers
  };
  
  const logger = bunyan.createLogger(options);
  return koaBunyan(logger);
}

const start = (config: Config) => {
  const app = new Koa();

  app.use(cors());
  app.use(logger(config.logger));
  app.use(koaBunyan.requestLogger());

  const r = router();  
  app.use(r.routes());
  
  app.listen(config.port);
};

export { start }
