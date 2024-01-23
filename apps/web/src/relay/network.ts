import { createClient } from "graphql-ws";
import { Network, Observable, RequestParameters, Variables } from "relay-runtime"
import { config } from "../../config";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getCookie } from "@/utils";

export const IS_SERVER = typeof window === "undefined";

type FetchProps = { cookies: RequestCookie[] }
export const fetchFunction = ({ cookies }: FetchProps) => (
  async (request: RequestParameters, variables: Variables) => {
    const token = getCookie(cookies, "token");

    const response = await fetch(`${config.api.httpUrl}/graphql`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: request.text,
        variables,
      }),
    });
  
    const result = await response.json();

    if (Array.isArray(result.errors) && result.errors.length > 0) {
      const message = result.errors[0].message as string;
    
      throw new Error(message, { cause: response })
    }

    return result;
  }
);

export const subscribeFunction = (request: RequestParameters, variables: Variables): Observable<any> => {
  const client = !IS_SERVER
    ? createClient({ url: `${config.api.wsUrl}/graphql` })
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

export type NetworkProps = {} & FetchProps; 
export const getNetwork = (props: NetworkProps) => {
  return Network.create(fetchFunction(props), subscribeFunction);
}

