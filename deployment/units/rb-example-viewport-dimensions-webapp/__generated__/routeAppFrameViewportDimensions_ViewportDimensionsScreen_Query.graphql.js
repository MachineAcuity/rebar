



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type ViewportDimensionsScreen_Viewer$ref = any;
              export type routeAppFrameViewportDimensions_ViewportDimensionsScreen_QueryVariables = {||};
              export type routeAppFrameViewportDimensions_ViewportDimensionsScreen_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: ViewportDimensionsScreen_Viewer$ref
                |}
              |};
              export type routeAppFrameViewportDimensions_ViewportDimensionsScreen_Query = {|
                variables: routeAppFrameViewportDimensions_ViewportDimensionsScreen_QueryVariables,
                response: routeAppFrameViewportDimensions_ViewportDimensionsScreen_QueryResponse,
              |};
              */


/*
                 query routeAppFrameViewportDimensions_ViewportDimensionsScreen_Query {
                   Viewer {
                     ...ViewportDimensionsScreen_Viewer
                     id
                   }
                 }
                 
                 fragment ViewportDimensionsScreen_Viewer on Viewer {
                   id
                 }
                 */

const node /*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeAppFrameViewportDimensions_ViewportDimensionsScreen_Query",
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
        "name": "ViewportDimensionsScreen_Viewer" }],


      "storageKey": null }],


    "type": "Query",
    "abstractKey": null },

  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAppFrameViewportDimensions_ViewportDimensionsScreen_Query",
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
    "cacheID": "a4eb6a720534dfe382f13d15464ba946",
    "id": null,
    "metadata": {},
    "name": "routeAppFrameViewportDimensions_ViewportDimensionsScreen_Query",
    "operationKind": "query",
    "text": "query routeAppFrameViewportDimensions_ViewportDimensionsScreen_Query {\n  Viewer {\n    ...ViewportDimensionsScreen_Viewer\n    id\n  }\n}\n\nfragment ViewportDimensionsScreen_Viewer on Viewer {\n  id\n}\n" } };


// prettier-ignore
node /*: any*/.hash = 'fd4b596cb5564462f401210ca2e12734';

module.exports = node;
//# sourceMappingURL=routeAppFrameViewportDimensions_ViewportDimensionsScreen_Query.graphql.js.map