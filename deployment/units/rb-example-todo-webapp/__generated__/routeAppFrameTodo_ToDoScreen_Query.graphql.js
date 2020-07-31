



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type ToDoScreen_Viewer$ref = any;
              export type routeAppFrameTodo_ToDoScreen_QueryVariables = {||};
              export type routeAppFrameTodo_ToDoScreen_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: ToDoScreen_Viewer$ref
                |}
              |};
              export type routeAppFrameTodo_ToDoScreen_Query = {|
                variables: routeAppFrameTodo_ToDoScreen_QueryVariables,
                response: routeAppFrameTodo_ToDoScreen_QueryResponse,
              |};
              */


/*
                 query routeAppFrameTodo_ToDoScreen_Query {
                   Viewer {
                     ...ToDoScreen_Viewer
                     id
                   }
                 }
                 
                 fragment ToDoScreen_Viewer on Viewer {
                   id
                 }
                 */

const node /*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeAppFrameTodo_ToDoScreen_Query",
    "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "Viewer",
      "plural": false,
      "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ToDoScreen_Viewer" }],


      "storageKey": null }],


    "type": "Query",
    "abstractKey": null },

  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAppFrameTodo_ToDoScreen_Query",
    "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "Viewer",
      "plural": false,
      "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null }],


      "storageKey": null }] },



  "params": {
    "cacheID": "436ba0e613e63eb60a8b1ebce871083f",
    "id": null,
    "metadata": {},
    "name": "routeAppFrameTodo_ToDoScreen_Query",
    "operationKind": "query",
    "text": "query routeAppFrameTodo_ToDoScreen_Query {\n  Viewer {\n    ...ToDoScreen_Viewer\n    id\n  }\n}\n\nfragment ToDoScreen_Viewer on Viewer {\n  id\n}\n" } };


// prettier-ignore
node /*: any*/.hash = 'a9ef7a4f1fcf9f2f638608c83eabb62a';

module.exports = node;
//# sourceMappingURL=routeAppFrameTodo_ToDoScreen_Query.graphql.js.map