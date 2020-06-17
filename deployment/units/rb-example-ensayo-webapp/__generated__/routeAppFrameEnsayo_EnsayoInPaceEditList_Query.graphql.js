



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type EnsayoInPaceEditList_Viewer$ref = any;
              export type routeAppFrameEnsayo_EnsayoInPaceEditList_QueryVariables = {||};
              export type routeAppFrameEnsayo_EnsayoInPaceEditList_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: EnsayoInPaceEditList_Viewer$ref
                |}
              |};
              export type routeAppFrameEnsayo_EnsayoInPaceEditList_Query = {|
                variables: routeAppFrameEnsayo_EnsayoInPaceEditList_QueryVariables,
                response: routeAppFrameEnsayo_EnsayoInPaceEditList_QueryResponse,
              |};
              */


/*
                 query routeAppFrameEnsayo_EnsayoInPaceEditList_Query {
                   Viewer {
                     ...EnsayoInPaceEditList_Viewer
                     id
                   }
                 }
                 
                 fragment EnsayoInPaceEditList_Viewer on Viewer {
                   Ensayos(first: 2147483647) {
                     edges {
                       node {
                         id
                         ...EnsayoInPlaceEditItem_Ensayo
                         __typename
                       }
                       cursor
                     }
                     pageInfo {
                       endCursor
                       hasNextPage
                     }
                   }
                   id
                   ...EnsayoInPlaceEditItem_Viewer
                 }
                 
                 fragment EnsayoInPlaceEditItem_Ensayo on Ensayo {
                   id
                   Ensayo_Title
                   Ensayo_Description
                   Ensayo_Content
                 }
                 
                 fragment EnsayoInPlaceEditItem_Viewer on Viewer {
                   id
                 }
                 */

const node /*: ConcreteRequest*/ = function () {
  var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647 }],


  v1 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null };

  return {
    "fragment": {
      "argumentDefinitions": [],
      "kind": "Fragment",
      "metadata": null,
      "name": "routeAppFrameEnsayo_EnsayoInPaceEditList_Query",
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
          "name": "EnsayoInPaceEditList_Viewer" }],


        "storageKey": null }],


      "type": "Query" },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": [],
      "kind": "Operation",
      "name": "routeAppFrameEnsayo_EnsayoInPaceEditList_Query",
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
          "args": v0 /*: any*/,
          "concreteType": "EnsayosConnection",
          "kind": "LinkedField",
          "name": "Ensayos",
          "plural": false,
          "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EnsayosEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Ensayo",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
              v1 /*: any*/,
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "Ensayo_Title",
                "storageKey": null },

              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "Ensayo_Description",
                "storageKey": null },

              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "Ensayo_Content",
                "storageKey": null },

              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null }],


              "storageKey": null },

            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null }],


            "storageKey": null },

          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null },

            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null }],


            "storageKey": null }],


          "storageKey": "Ensayos(first:2147483647)" },

        {
          "alias": null,
          "args": v0 /*: any*/,
          "filters": null,
          "handle": "connection",
          "key": "EnsayoList_Ensayos",
          "kind": "LinkedHandle",
          "name": "Ensayos" },

        v1 /*: any*/],

        "storageKey": null }] },



    "params": {
      "id": null,
      "metadata": {},
      "name": "routeAppFrameEnsayo_EnsayoInPaceEditList_Query",
      "operationKind": "query",
      "text": "query routeAppFrameEnsayo_EnsayoInPaceEditList_Query {\n  Viewer {\n    ...EnsayoInPaceEditList_Viewer\n    id\n  }\n}\n\nfragment EnsayoInPaceEditList_Viewer on Viewer {\n  Ensayos(first: 2147483647) {\n    edges {\n      node {\n        id\n        ...EnsayoInPlaceEditItem_Ensayo\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n  ...EnsayoInPlaceEditItem_Viewer\n}\n\nfragment EnsayoInPlaceEditItem_Ensayo on Ensayo {\n  id\n  Ensayo_Title\n  Ensayo_Description\n  Ensayo_Content\n}\n\nfragment EnsayoInPlaceEditItem_Viewer on Viewer {\n  id\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '8dffa05e0936fb4c9fcbc336d9b34400';

module.exports = node;
//# sourceMappingURL=routeAppFrameEnsayo_EnsayoInPaceEditList_Query.graphql.js.map