



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type HomePageScreen_Viewer$ref = any;
              export type routeAppFrameDemo_HomePageScreen_QueryVariables = {||};
              export type routeAppFrameDemo_HomePageScreen_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: HomePageScreen_Viewer$ref
                |}
              |};
              export type routeAppFrameDemo_HomePageScreen_Query = {|
                variables: routeAppFrameDemo_HomePageScreen_QueryVariables,
                response: routeAppFrameDemo_HomePageScreen_QueryResponse,
              |};
              */


/*
                 query routeAppFrameDemo_HomePageScreen_Query {
                   Viewer {
                     ...HomePageScreen_Viewer
                     id
                   }
                 }
                 
                 fragment HomePageScreen_Viewer on Viewer {
                   id
                 }
                 */

const node /*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeAppFrameDemo_HomePageScreen_Query",
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
        "name": "HomePageScreen_Viewer" }],


      "storageKey": null }],


    "type": "Query" },

  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAppFrameDemo_HomePageScreen_Query",
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
    "name": "routeAppFrameDemo_HomePageScreen_Query",
    "operationKind": "query",
    "text": "query routeAppFrameDemo_HomePageScreen_Query {\n  Viewer {\n    ...HomePageScreen_Viewer\n    id\n  }\n}\n\nfragment HomePageScreen_Viewer on Viewer {\n  id\n}\n" } };


// prettier-ignore
node /*: any*/.hash = 'dd5a657362a3fea622cbb7f0dfde2a72';

module.exports = node;
//# sourceMappingURL=routeAppFrameDemo_HomePageScreen_Query.graphql.js.map