import { GraphQLSchema, execute, subscribe, validate } from "graphql";
import { WebSocketServer } from "ws";
import http from "http";
import { useServer } from "graphql-ws/lib/use/ws";
import url from 'url';

export const createWsServer = (
  http: http.Server,
  schema: GraphQLSchema,
  path = '/graphql/ws',
) => {
  const server = new WebSocketServer({noServer: true});

  useServer({
    schema,
    execute,
    subscribe,
    onConnect: () => {
      console.log(`connected to ws: ${path}`)
    },
    onSubscribe: async (_, message) => {
      const { operationName, query, variables } = message.payload;

      const document = typeof query === 'string'
        ? parse(query)
        : query;
    
      const args = {
        schema,
        operationName,
        document,
        variableValues: variables
      };

      const validateErrors = validate(args.schema, document);

      if (validateErrors.length > 0)
        return validateErrors;
        
      return args;
    }
  }, server);

  http.on('upgrade', (req, socket, head) => {
    if (!req.url) return;

    const baseUrl = `ws://${req.headers.host}/`;
    const { pathname } = new URL(req.url, baseUrl);

    if (pathname === path) {
      server.handleUpgrade(
        req,
        socket,
        head,
        ws => ws.emit('connection', ws, req)
      );
    }
  });
};
