



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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null };

  return {
    "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "status" }],


    "kind": "Fragment",
    "metadata": {
      "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
        "ToDos"] }] },




    "name": "ToDoList_Viewer",
    "selections": [
    {
      "alias": "ToDos",
      "args": [
      {
        "kind": "Variable",
        "name": "status",
        "variableName": "status" }],


      "concreteType": "ToDosConnection",
      "kind": "LinkedField",
      "name": "__ToDoList_ToDos_connection",
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
          v0 /*: any*/,
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
            "name": "__typename",
            "storageKey": null },

          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ToDoItem_ToDo" }],


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

    v0 /*: any*/,
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
      "storageKey": null },

    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ToDoItem_Viewer" }],


    "type": "Viewer",
    "abstractKey": null };

}();
// prettier-ignore
node /*: any*/.hash = '68b5216db9d5b129661a98b5e2476770';

module.exports = node;
//# sourceMappingURL=ToDoList_Viewer.graphql.js.map