import { Context as KoaContext, Request, Response } from "koa"
import { OptionsData, graphqlHTTP } from "koa-graphql"
import Router from "koa-router";

import schema from "../schemas";
import { getAuth } from "../authentication";
import config from "../config";
import { UserDefinition } from "../modules/user/UserModel";

export type Context = {
  user: UserDefinition | null
}

const graphqlRoute = () => {
  const options = async (
    _req: Request,
    _res: Response,
    ctx: KoaContext,
  ): Promise<OptionsData> => {
    const { user } = await getAuth(ctx.cookies.get('auth.token') ?? null, config.jwt.secret);
  
    return ({
      schema,
      graphiql: true,
      pretty: true,
      context: { user },
      customFormatErrorFn: (error) => {
        ctx.log.error(error);

        return error;
      }
    });
  };

  const router = new Router();

  router.all('/graphql', graphqlHTTP(options));

  return router;
}

export default graphqlRoute;
