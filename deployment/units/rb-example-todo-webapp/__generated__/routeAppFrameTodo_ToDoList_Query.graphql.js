/**
 * 
 * @relayHash 57649febc186d41c2f733b86769f4019
 */

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
    "kind": "LocalArgument",
    "name": "status",
    "type": "String!",
    "defaultValue": null }],


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
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
    "args": null,
    "storageKey": null };

  return {
    "kind": "Request",
    "fragment": {
      "kind": "Fragment",
      "name": "routeAppFrameTodo_ToDoList_Query",
      "type": "Query",
      "metadata": null,
      "argumentDefinitions": v0 /*: any*/,
      "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ToDoList_Viewer",
          "args": null }] }] },





    "operation": {
      "kind": "Operation",
      "name": "routeAppFrameTodo_ToDoList_Query",
      "argumentDefinitions": v0 /*: any*/,
      "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "ToDos",
          "storageKey": null,
          "args": v1 /*: any*/,
          "concreteType": "ToDosConnection",
          "plural": false,
          "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "ToDosEdge",
            "plural": true,
            "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "ToDo",
              "plural": false,
              "selections": [
              v2 /*: any*/,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "ToDo_Complete",
                "args": null,
                "storageKey": null },

              {
                "kind": "ScalarField",
                "alias": null,
                "name": "ToDo_Text",
                "args": null,
                "storageKey": null },

              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null }] },



            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null }] },



          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pageInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "PageInfo",
            "plural": false,
            "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null },

            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null }] }] },





        {
          "kind": "LinkedHandle",
          "alias": null,
          "name": "ToDos",
          "args": v1 /*: any*/,
          "handle": "connection",
          "key": "ToDoList_ToDos",
          "filters": [
          "status"] },


        v2 /*: any*/,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "ToDo_TotalCount",
          "args": null,
          "storageKey": null },

        {
          "kind": "ScalarField",
          "alias": null,
          "name": "ToDo_CompletedCount",
          "args": null,
          "storageKey": null }] }] },





    "params": {
      "operationKind": "query",
      "name": "routeAppFrameTodo_ToDoList_Query",
      "id": null,
      "text": "query routeAppFrameTodo_ToDoList_Query(\n  $status: String!\n) {\n  Viewer {\n    ...ToDoList_Viewer\n    id\n  }\n}\n\nfragment ToDoItem_ToDo on ToDo {\n  id\n  ToDo_Complete\n  ToDo_Text\n}\n\nfragment ToDoItem_Viewer on Viewer {\n  id\n}\n\nfragment ToDoList_Viewer on Viewer {\n  ToDos(status: $status, first: 2147483647) {\n    edges {\n      node {\n        id\n        ToDo_Complete\n        ...ToDoItem_ToDo\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n  ToDo_TotalCount\n  ToDo_CompletedCount\n  ...ToDoItem_Viewer\n}\n",
      "metadata": {} } };


}();
// prettier-ignore
node /*: any*/.hash = 'b3982d9527957360d56deccda064f888';
module.exports = node;
//# sourceMappingURL=routeAppFrameTodo_ToDoList_Query.graphql.js.map