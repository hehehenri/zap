import * as app from "./app";
import config from "./config";
import * as db from "./database";

const bootstrap = async () => {
  db.connect(config.database);
  app.start(config.app);
}

bootstrap();
