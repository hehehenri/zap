import { GraphQLObjectType } from 'graphql';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import { Context } from "@/context";

type Load = (context: Context, id: string) => unknown;
type TypeLoaders = {
  [key: string]: {
    type: GraphQLObjectType;
    load: Load;
  };
};

const getTypeRegister = () => {
  const typesLoaders: TypeLoaders = {};

  const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
    typesLoaders[type.name] = {
      type,
      load,
    };

    return type;
  };

  const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
    async (globalId, context: Context) => {
      const { type, id } = fromGlobalId(globalId);

      const { load } = typesLoaders[type] || { load: null };

      return (load && load(context, id)) || null;
    },
    obj => {
      const { type } = typesLoaders[obj.constructor.name] || { type: null };

      return type.name;
    },
  );

  return {
    getTypesLoaders: () => typesLoaders,
    registerTypeLoader,
    nodeField,
    nodesField,
    nodeInterface,
  };
};

const { registerTypeLoader, nodeInterface, nodeField: Node, nodesField: Nodes } = getTypeRegister();

export { registerTypeLoader, nodeInterface, Node, Nodes };
