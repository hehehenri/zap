import { KoaContext } from "../../schemas/context";
import { RouteError } from "../error";

export const errorHandlerMiddleware = () => async (ctx: KoaContext, next: () => Promise<any>) => {      
  try {
    await next();     
  } catch (err) {
    // TODO: understand why this is unreachable and make it work.
    // ps: graphql is probably handling errors on their own
    if (err instanceof RouteError) {
      ctx.status = err.status;
      ctx.body = { message: err.message };
      ctx.app.emit('error', err, ctx);
    } else {
      ctx.status = 500;
      ctx.body = "Something went wrong";
      ctx.app.emit('error', err, ctx);     
    }
  }
}
