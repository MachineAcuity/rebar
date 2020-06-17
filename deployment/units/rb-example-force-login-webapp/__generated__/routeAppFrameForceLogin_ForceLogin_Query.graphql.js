



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type ForceLogin_Viewer$ref = any;
              export type routeAppFrameForceLogin_ForceLogin_QueryVariables = {||};
              export type routeAppFrameForceLogin_ForceLogin_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: ForceLogin_Viewer$ref
                |}
              |};
              export type routeAppFrameForceLogin_ForceLogin_Query = {|
                variables: routeAppFrameForceLogin_ForceLogin_QueryVariables,
                response: routeAppFrameForceLogin_ForceLogin_QueryResponse,
              |};
              */


/*
                 query routeAppFrameForceLogin_ForceLogin_Query {
                   Viewer {
                     ...ForceLogin_Viewer
                     id
                   }
                 }
                 
                 fragment ForceLogin_Viewer on Viewer {
                   User_IsAnonymous
                 }
                 */

const node /*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeAppFrameForceLogin_ForceLogin_Query",
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
        "name": "ForceLogin_Viewer" }],


      "storageKey": null }],


    "type": "Query" },

  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAppFrameForceLogin_ForceLogin_Query",
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
        "name": "User_IsAnonymous",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null }],


      "storageKey": null }] },



  "params": {
    "id": null,
    "metadata": {},
    "name": "routeAppFrameForceLogin_ForceLogin_Query",
    "operationKind": "query",
    "text": "query routeAppFrameForceLogin_ForceLogin_Query {\n  Viewer {\n    ...ForceLogin_Viewer\n    id\n  }\n}\n\nfragment ForceLogin_Viewer on Viewer {\n  User_IsAnonymous\n}\n" } };


// prettier-ignore
node /*: any*/.hash = 'c6caf31fca5281f05d717603162982b7';

module.exports = node;
//# sourceMappingURL=routeAppFrameForceLogin_ForceLogin_Query.graphql.js.map