



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type ToDoList_Viewer$ref = any;
              export type routeAppFrameTodo_ToDoList_QueryVariables = {|
                status: string
              |};
              export type routeAppFrameTodo_ToDoList_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: ToDoList_Viewer$ref
                |}
              |};
              export type routeAppFrameTodo_ToDoList_Query = {|
                variables: routeAppFrameTodo_ToDoList_QueryVariables,
                response: routeAppFrameTodo_ToDoList_QueryResponse,
              |};
              */


/*
                 query routeAppFrameTodo_ToDoList_Query(
                   $status: String!
                 ) {
                   Viewer {
                     ...ToDoList_Viewer
                     id
                   }
                 }
                 
                 fragment ToDoItem_ToDo on ToDo {
                   id
                   ToDo_Complete
                   ToDo_Text
                 }
                 
                 fragment ToDoItem_Viewer on Viewer {
                   id
                 }
                 
                 fragment ToDoList_Viewer on Viewer {
                   ToDos(status: $status, first: 2147483647) {
                     edges {
                       node {
                         id
                         ToDo_Complete
                         ...ToDoItem_ToDo
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
                   ToDo_TotalCount
                   ToDo_CompletedCount
                   ...ToDoItem_Viewer
                 }
                 */

const node /*: ConcreteRequest*/ = function () {
  var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status" }],


  v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647 },

  {
    "kind": "Variable",
    "name": "status",
    "variableName": "status" }],


  v2 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null };

  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "routeAppFrameTodo_ToDoList_Query",
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
          "name": "ToDoList_Viewer" }],


        "storageKey": null }],


      "type": "Query",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "routeAppFrameTodo_ToDoList_Query",
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
          "args": v1 /*: any*/,
          "concreteType": "ToDosConnection",
          "kind": "LinkedField",
          "name": "ToDos",
          "plural": false,
          "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ToDosEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ToDo",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
              v2 /*: any*/,
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ToDo_Complete",
                "storageKey": null },

              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ToDo_Text",
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


          "storageKey": null },

        {
          "alias": null,
          "args": v1 /*: any*/,
          "filters": [
          "status"],

          "handle": "connection",
          "key": "ToDoList_ToDos",
          "kind": "LinkedHandle",
          "name": "ToDos" },

        v2 /*: any*/,
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ToDo_TotalCount",
          "storageKey": null },

        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ToDo_CompletedCount",
          "storageKey": null }],


        "storageKey": null }] },



    "params": {
      "cacheID": "6b2e8b64fd0661a2689ef3b6d0ecbebf",
      "id": null,
      "metadata": {},
      "name": "routeAppFrameTodo_ToDoList_Query",
      "operationKind": "query",
      "text": "query routeAppFrameTodo_ToDoList_Query(\n  $status: String!\n) {\n  Viewer {\n    ...ToDoList_Viewer\n    id\n  }\n}\n\nfragment ToDoItem_ToDo on ToDo {\n  id\n  ToDo_Complete\n  ToDo_Text\n}\n\nfragment ToDoItem_Viewer on Viewer {\n  id\n}\n\nfragment ToDoList_Viewer on Viewer {\n  ToDos(status: $status, first: 2147483647) {\n    edges {\n      node {\n        id\n        ToDo_Complete\n        ...ToDoItem_ToDo\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n  ToDo_TotalCount\n  ToDo_CompletedCount\n  ...ToDoItem_Viewer\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = 'b3982d9527957360d56deccda064f888';

module.exports = node;
//# sourceMappingURL=routeAppFrameTodo_ToDoList_Query.graphql.js.map