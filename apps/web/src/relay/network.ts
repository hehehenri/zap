import { createClient } from "graphql-ws";
import {  ConcreteRequest, Observable, RequestParameters, Variables } from "relay-runtime"

export const getPreloadedQuery = async (
  { params }: ConcreteRequest,
  variables: Variables,
) => {
  const response = await fetchFunction(params, variables);
  
  return { params, variables, response }
};

export const fetchFunction = async (request: RequestParameters, variables: Variables) => {
  // TODO: get from .env
  const resp = await fetch('http://localhost:8000/graphql', {
    method: 'POST',
    credentials: "include",

    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })

  const json = await resp.json();

  console.log(json);

  if (Array.isArray(json.errors)) {
    const error = {
      query: request,
      errors: json.errors
    };

    console.error(error);
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
