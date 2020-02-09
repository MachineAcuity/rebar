



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              type ToDoItem_ToDo$ref = any;
              type ToDoItem_Viewer$ref = any;
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type ToDoList_Viewer$ref: FragmentReference;
              declare export opaque type ToDoList_Viewer$fragmentType: ToDoList_Viewer$ref;
              export type ToDoList_Viewer = {|
                +ToDos: ?{|
                  +edges: ?$ReadOnlyArray<?{|
                    +node: ?{|
                      +id: string,
                      +ToDo_Complete: ?boolean,
                      +$fragmentRefs: ToDoItem_ToDo$ref,
                    |}
                  |}>
                |},
                +id: string,
                +ToDo_TotalCount: ?number,
                +ToDo_CompletedCount: ?number,
                +$fragmentRefs: ToDoItem_Viewer$ref,
                +$refType: ToDoList_Viewer$ref,
              |};
              export type ToDoList_Viewer$data = ToDoList_Viewer;
              export type ToDoList_Viewer$key = {
                +$data?: ToDoList_Viewer$data,
                +$fragmentRefs: ToDoList_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = function () {
  var v0 = {
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
    "args": null,
    "storageKey": null };

  return {
    "kind": "Fragment",
    "name": "ToDoList_Viewer",
    "type": "Viewer",
    "metadata": {
      "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
        "ToDos"] }] },




    "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "status",
      "type": "String" }],


    "selections": [
    {
      "kind": "LinkedField",
      "alias": "ToDos",
      "name": "__ToDoList_ToDos_connection",
      "storageKey": null,
      "args": [
      {
        "kind": "Variable",
        "name": "status",
        "variableName": "status" }],


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
          v0 /*: any*/,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "ToDo_Complete",
            "args": null,
            "storageKey": null },

          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null },

          {
            "kind": "FragmentSpread",
            "name": "ToDoItem_ToDo",
            "args": null }] },



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





    v0 /*: any*/,
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
      "storageKey": null },

    {
      "kind": "FragmentSpread",
      "name": "ToDoItem_Viewer",
      "args": null }] };



}();
// prettier-ignore
node /*: any*/.hash = '68b5216db9d5b129661a98b5e2476770';
module.exports = node;
//# sourceMappingURL=ToDoList_Viewer.graphql.js.map