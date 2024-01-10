/**
 * @generated SignedSource<<e007b8fa64abb0ea0e1f6d205b887ac8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MeQuery$variables = Record<PropertyKey, never>;
export type MeQuery$data = {
  readonly me: {
    readonly id: string;
    readonly username: string;
  } | null | undefined;
};
export type MeQuery = {
  response: MeQuery$data;
  variables: MeQuery$variables;
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
    "name": "MeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "77b2876b0f48f176957e4830bded0bed",
    "id": null,
    "metadata": {},
    "name": "MeQuery",
    "operationKind": "query",
    "text": "query MeQuery {\n  me {\n    id\n    username\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb84b57a52f18c62e4ce3844b911d042";

export default node;
