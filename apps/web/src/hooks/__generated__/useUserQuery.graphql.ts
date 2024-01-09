/**
 * @generated SignedSource<<0b9fcc5e1e7d6a2dd85a3b7f53de818a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useUserQuery$variables = Record<PropertyKey, never>;
export type useUserQuery$data = {
  readonly me: {
    readonly id: string;
    readonly username: string;
  } | null | undefined;
};
export type useUserQuery = {
  response: useUserQuery$data;
  variables: useUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "64ad23ec3228481d1bc9bfadf2bae02b",
    "id": null,
    "metadata": {},
    "name": "useUserQuery",
    "operationKind": "query",
    "text": "query useUserQuery {\n  me {\n    id\n    username\n  }\n}\n"
  }
};
})();

(node as any).hash = "5df03988b136585e7d3aaf9b68b3cf5c";

export default node;
