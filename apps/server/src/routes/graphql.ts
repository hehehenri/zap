import { Context as KoaContext, Request, Response } from "koa"
import { OptionsData, graphqlHTTP } from "koa-graphql"
import Router from "koa-router";

import schema from "../schemas";
import { getAuth, getToken } from "../authentication";
import { UserDefinition } from "../modules/user/UserModel";
import { RouteError } from "./error";

export type Context = {
  user: UserDefinition | null
}

const graphqlRoute = () => {
  const options = async (
    _req: Request,
    _res: Response,
    ctx: KoaContext,
  ): Promise<OptionsData> => {    
    const token = getToken(ctx);
    const { user } = await getAuth(token);

    return ({
      schema,
      pretty: true,
      graphiql: {
        headerEditorEnabled: true
      },
      context: { user },
      customFormatErrorFn: (error) => {
        // TODO: this workaround doesn't seems right.
        // find a way to do the same using 
        ctx.log.error(error);

        const err = error.originalError;
        if (err && err instanceof RouteError) {
          ctx.status = err.status
        }

        return error;
      }
    });
  };

  const router = new Router();

  router.all('/graphql', graphqlHTTP(options));

  return router;
}

export default graphqlRoute;
