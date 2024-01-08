import Router from "koa-router";
import KoaRouter from "koa-router"
import graphqlRoute from "./graphql";

const merge = (router: Router, route: Router) => {
  router.use(route.routes());
  router.use(route.allowedMethods());
}

const router = () => {
  const router = new KoaRouter();

  merge(router, graphqlRoute());

  return router;
}

export default router;
