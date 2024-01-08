import { Context, Request, Response } from "koa"
import { OptionsData, graphqlHTTP } from "koa-graphql"
import Router from "koa-router";

import schema from "../schemas";

const graphqlRoute = () => {
  const options = async (
    _req: Request,
    _res: Response,
    ctx: Context,
  ): Promise<OptionsData> => ({
    schema,
    graphiql: true,
    pretty: true,
    context: {},
    customFormatErrorFn: (error) => {
      ctx.log.error(error);

      return error;
    }
  });

  const router = new Router();

  router.all('/graphql', graphqlHTTP(options));

  return router;
}

export default graphqlRoute;
