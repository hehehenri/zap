/**
 * @generated SignedSource<<9ce768e41a0a86fd1b19ba2c8cc5b15a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RoomListQuery$variables = Record<PropertyKey, never>;
export type RoomListQuery$data = {
  readonly rooms: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly messages: ReadonlyArray<{
          readonly content: string;
          readonly id: string;
        }>;
        readonly participants: ReadonlyArray<{
          readonly id: string;
          readonly username: string;
        }>;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type RoomListQuery = {
  response: RoomListQuery$data;
  variables: RoomListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "RoomConnection",
    "kind": "LinkedField",
    "name": "rooms",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RoomEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Room",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "participants",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "username",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "messages",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "content",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "RoomListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RoomListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0c0b0f233ac7974d535af6f598a890f1",
    "id": null,
    "metadata": {},
    "name": "RoomListQuery",
    "operationKind": "query",
    "text": "query RoomListQuery {\n  rooms {\n    edges {\n      node {\n        id\n        participants {\n          id\n          username\n        }\n        messages {\n          id\n          content\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e9cfb2ccececd1cfe34496bcd4dcad40";

export default node;
