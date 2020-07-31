



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type ToDoListUpdateMarkAllInput = {|
                ToDo_Complete: boolean,
                clientMutationId?: ?string,
              |};
              export type ToDoListUpdateMarkAllMutationVariables = {|
                input: ToDoListUpdateMarkAllInput,
                status: string,
              |};
              export type ToDoListUpdateMarkAllMutationResponse = {|
                +ToDoListUpdateMarkAll: ?{|
                  +Viewer: ?{|
                    +ToDos: ?{|
                      +edges: ?$ReadOnlyArray<?{|
                        +node: ?{|
                          +id: string,
                          +ToDo_Complete: ?boolean,
                          +ToDo_Text: ?string,
                        |}
                      |}>
                    |},
                    +id: string,
                    +ToDo_CompletedCount: ?number,
                  |},
                  +changedToDos: ?$ReadOnlyArray<?{|
                    +id: string,
                    +ToDo_Complete: ?boolean,
                  |}>,
                |}
              |};
              export type ToDoListUpdateMarkAllMutation = {|
                variables: ToDoListUpdateMarkAllMutationVariables,
                response: ToDoListUpdateMarkAllMutationResponse,
              |};
              */


/*
                 mutation ToDoListUpdateMarkAllMutation(
                   $input: ToDoListUpdateMarkAllInput!
                   $status: String!
                 ) {
                   ToDoListUpdateMarkAll(input: $input) {
                     Viewer {
                       ToDos(status: $status) {
                         edges {
                           node {
                             id
                             ToDo_Complete
                             ToDo_Text
                           }
                         }
                       }
                       id
                       ToDo_CompletedCount
                     }
                     changedToDos {
                       id
                       ToDo_Complete
                     }
                   }
                 }
                 */

const node /*: ConcreteRequest*/ = function () {
  var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input" },

  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status" }],


  v1 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null },

  v2 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ToDo_Complete",
    "storageKey": null },

  v3 = [
  {
    "alias": null,
    "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "input" }],


    "concreteType": "ToDoListUpdateMarkAllPayload",
    "kind": "LinkedField",
    "name": "ToDoListUpdateMarkAll",
    "plural": false,
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
        "args": [
        {
          "kind": "Variable",
          "name": "status",
          "variableName": "status" }],


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
            v1 /*: any*/,
            v2 /*: any*/,
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "ToDo_Text",
              "storageKey": null }],


            "storageKey": null }],


          "storageKey": null }],


        "storageKey": null },

      v1 /*: any*/,
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ToDo_CompletedCount",
        "storageKey": null }],


      "storageKey": null },

    {
      "alias": null,
      "args": null,
      "concreteType": "ToDo",
      "kind": "LinkedField",
      "name": "changedToDos",
      "plural": true,
      "selections": [
      v1 /*: any*/,
      v2 /*: any*/],

      "storageKey": null }],


    "storageKey": null }];


  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "ToDoListUpdateMarkAllMutation",
      "selections": v3 /*: any*/,
      "type": "Mutation",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "ToDoListUpdateMarkAllMutation",
      "selections": v3 /*: any*/ },

    "params": {
      "cacheID": "03fd8afd4fe1347e96b406608f5899b7",
      "id": null,
      "metadata": {},
      "name": "ToDoListUpdateMarkAllMutation",
      "operationKind": "mutation",
      "text": "mutation ToDoListUpdateMarkAllMutation(\n  $input: ToDoListUpdateMarkAllInput!\n  $status: String!\n) {\n  ToDoListUpdateMarkAll(input: $input) {\n    Viewer {\n      ToDos(status: $status) {\n        edges {\n          node {\n            id\n            ToDo_Complete\n            ToDo_Text\n          }\n        }\n      }\n      id\n      ToDo_CompletedCount\n    }\n    changedToDos {\n      id\n      ToDo_Complete\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '18b2dc6ec26946a22a0803be1ba1d2f2';

module.exports = node;
//# sourceMappingURL=ToDoListUpdateMarkAllMutation.graphql.js.map