import { GraphQLSchema, execute, subscribe, validate, parse } from "graphql";
import { WebSocketServer } from "ws";
import http from "http";
import { useServer } from "graphql-ws/lib/use/ws";

const handleUpgrade = (
  http: http.Server,
  schema: GraphQLSchema,
  path = '/graphql/ws',
) => {
  const server = new WebSocketServer({noServer: true});

  useServer({
    schema,
    execute,
    subscribe,
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

    const { pathname } = new URL(req.url);

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

export default { handleUpgrade };
