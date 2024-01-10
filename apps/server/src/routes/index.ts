import Router from "koa-router";
import KoaRouter from "koa-router"
import graphqlRoute from "./graphql";
import { websocketMiddleware } from "./middlewares/websocket";

const merge = (router: Router, route: Router) => {
  router.use(route.routes());
  router.use(route.allowedMethods());
}

const router = () => {
  const router = new KoaRouter();

  router.use(websocketMiddleware());

  merge(router, graphqlRoute());

  return router;
}

export default router;
