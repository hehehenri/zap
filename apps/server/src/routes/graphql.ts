import { Request, Response } from "koa"
import { OptionsData, graphqlHTTP } from "koa-graphql"
import Router from "koa-router";
import schema from "../schemas";
import { RouteError } from "./error";
import { KoaContext, buildContext } from "@/context";

const options = async (
  _req: Request,
  _res: Response,
  ctx: KoaContext,
): Promise<OptionsData> => ({
  schema,
  pretty: true,
  graphiql: {
    headerEditorEnabled: true,
    shouldPersistHeaders: true
  },
  context: await buildContext(ctx),
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

const graphqlRoute = () => {
  const router = new Router();

  router.all('/graphql', graphqlHTTP(options));

  return router;
}

export default graphqlRoute;
