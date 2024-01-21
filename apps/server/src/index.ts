import * as app from "./app";
import * as db from "./database";

const bootstrap = async () => {
  db.connect();
  app.start();
}

bootstrap();
