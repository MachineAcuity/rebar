



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type EnsayoPublicList_Viewer$ref = any;
              export type routeAppFrameEnsayo_EnsayoPublicList_QueryVariables = {||};
              export type routeAppFrameEnsayo_EnsayoPublicList_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: EnsayoPublicList_Viewer$ref
                |}
              |};
              export type routeAppFrameEnsayo_EnsayoPublicList_Query = {|
                variables: routeAppFrameEnsayo_EnsayoPublicList_QueryVariables,
                response: routeAppFrameEnsayo_EnsayoPublicList_QueryResponse,
              |};
              */


/*
                 query routeAppFrameEnsayo_EnsayoPublicList_Query {
                   Viewer {
                     ...EnsayoPublicList_Viewer
                     id
                   }
                 }
                 
                 fragment EnsayoPublicList_Viewer on Viewer {
                   Ensayos(first: 2147483647) {
                     edges {
                       node {
                         id
                         Ensayo_Title
                         Ensayo_Description
                         __typename
                       }
                       cursor
                     }
                     pageInfo {
                       endCursor
                       hasNextPage
                     }
                   }
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
      "name": "routeAppFrameEnsayo_EnsayoPublicList_Query",
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
          "name": "EnsayoPublicList_Viewer" }],


        "storageKey": null }],


      "type": "Query",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": [],
      "kind": "Operation",
      "name": "routeAppFrameEnsayo_EnsayoPublicList_Query",
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
          "key": "EnsayoPublicList_Ensayos",
          "kind": "LinkedHandle",
          "name": "Ensayos" },

        v1 /*: any*/],

        "storageKey": null }] },



    "params": {
      "cacheID": "91ac8fb532503a9564ceda1e7d2efccf",
      "id": null,
      "metadata": {},
      "name": "routeAppFrameEnsayo_EnsayoPublicList_Query",
      "operationKind": "query",
      "text": "query routeAppFrameEnsayo_EnsayoPublicList_Query {\n  Viewer {\n    ...EnsayoPublicList_Viewer\n    id\n  }\n}\n\nfragment EnsayoPublicList_Viewer on Viewer {\n  Ensayos(first: 2147483647) {\n    edges {\n      node {\n        id\n        Ensayo_Title\n        Ensayo_Description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '71297ef603df148c2085eae0625e0433';

module.exports = node;
//# sourceMappingURL=routeAppFrameEnsayo_EnsayoPublicList_Query.graphql.js.map