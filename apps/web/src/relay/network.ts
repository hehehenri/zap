import { createClient } from "graphql-ws";
import { CacheConfig, Network, Observable, RequestParameters, Variables } from "relay-runtime"
import { cache } from "./cache";

export const fetchFunction = async (request: RequestParameters, variables: Variables, cacheConfig: CacheConfig) => {
  const forceFetch = cacheConfig?.force;
  const isQuery = request.operationKind === 'query';

  if (isQuery && !forceFetch && request.text) {
    const cachedValue = cache.get(request.text, variables);

    if (cachedValue) return cachedValue;
  }

  
  // TODO: get from .env
  const resp = await fetch('http://localhost:8000/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    })
  })

  const json = await resp.json();

  if (Array.isArray(json.errors)) {
    const error = {
      query: request,
      errors: json.errors
    };
    
    throw new Error("failed to fetch graphql query", { cause: error });
  }

  return json;
}

export const subscribeFunction = (request: RequestParameters, variables: Variables): Observable<any> => {
  // TODO: get url from .env
  const client = typeof window !== typeof undefined
    ? createClient({ url: "https://localhost:8000/graphql/ws" })
    : undefined;

  return Observable.create(sink => {
    if (!client) return;
    
    if (!request.text)
      return sink.error(new Error('query cannot be empty'));

    const operationName = request.name;
    const query = request.text;

    return client.subscribe({operationName, query, variables}, sink);
  })
}
