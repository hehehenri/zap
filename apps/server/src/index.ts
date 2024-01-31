import * as app from "./app";
import * as db from "./database";

const bootstrap = async () => {
  await db.connect();
  app.start();
};

bootstrap();
