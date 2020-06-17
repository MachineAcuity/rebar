



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type EnsayoInPaceEditScreen_Viewer$ref = any;
              export type routeAppFrameEnsayo_EnsayoInPaceEditScreen_QueryVariables = {||};
              export type routeAppFrameEnsayo_EnsayoInPaceEditScreen_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: EnsayoInPaceEditScreen_Viewer$ref
                |}
              |};
              export type routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query = {|
                variables: routeAppFrameEnsayo_EnsayoInPaceEditScreen_QueryVariables,
                response: routeAppFrameEnsayo_EnsayoInPaceEditScreen_QueryResponse,
              |};
              */


/*
                 query routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query {
                   Viewer {
                     ...EnsayoInPaceEditScreen_Viewer
                     id
                   }
                 }
                 
                 fragment EnsayoInPaceEditScreen_Viewer on Viewer {
                   id
                 }
                 */

const node /*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query",
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
        "name": "EnsayoInPaceEditScreen_Viewer" }],


      "storageKey": null }],


    "type": "Query" },

  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query",
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
    "id": null,
    "metadata": {},
    "name": "routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query",
    "operationKind": "query",
    "text": "query routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query {\n  Viewer {\n    ...EnsayoInPaceEditScreen_Viewer\n    id\n  }\n}\n\nfragment EnsayoInPaceEditScreen_Viewer on Viewer {\n  id\n}\n" } };


// prettier-ignore
node /*: any*/.hash = '9d245c088169fbdc03599a436614b4f2';

module.exports = node;
//# sourceMappingURL=routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query.graphql.js.map