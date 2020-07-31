



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type ToDoAddInput = {|
                ToDo_Text: string,
                clientMutationId?: ?string,
              |};
              export type ToDoAddMutationVariables = {|
                input: ToDoAddInput
              |};
              export type ToDoAddMutationResponse = {|
                +ToDoAdd: ?{|
                  +Viewer: ?{|
                    +id: string,
                    +ToDo_TotalCount: ?number,
                  |},
                  +ToDosEdge: ?{|
                    +__typename: string,
                    +cursor: string,
                    +node: ?{|
                      +id: string,
                      +ToDo_Complete: ?boolean,
                      +ToDo_Text: ?string,
                    |},
                  |},
                |}
              |};
              export type ToDoAddMutation = {|
                variables: ToDoAddMutationVariables,
                response: ToDoAddMutationResponse,
              |};
              */


/*
                 mutation ToDoAddMutation(
                   $input: ToDoAddInput!
                 ) {
                   ToDoAdd(input: $input) {
                     Viewer {
                       id
                       ToDo_TotalCount
                     }
                     ToDosEdge {
                       __typename
                       cursor
                       node {
                         id
                         ToDo_Complete
                         ToDo_Text
                       }
                     }
                   }
                 }
                 */

const node /*: ConcreteRequest*/ = function () {
  var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input" }],


  v1 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null },

  v2 = [
  {
    "alias": null,
    "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "input" }],


    "concreteType": "ToDoAddPayload",
    "kind": "LinkedField",
    "name": "ToDoAdd",
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
      v1 /*: any*/,
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ToDo_TotalCount",
        "storageKey": null }],


      "storageKey": null },

    {
      "alias": null,
      "args": null,
      "concreteType": "ToDosEdge",
      "kind": "LinkedField",
      "name": "ToDosEdge",
      "plural": false,
      "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "concreteType": "ToDo",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
        v1 /*: any*/,
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
          "storageKey": null }],


        "storageKey": null }],


      "storageKey": null }],


    "storageKey": null }];


  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "ToDoAddMutation",
      "selections": v2 /*: any*/,
      "type": "Mutation",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "ToDoAddMutation",
      "selections": v2 /*: any*/ },

    "params": {
      "cacheID": "7f445659ef8d79c71492386f78775f19",
      "id": null,
      "metadata": {},
      "name": "ToDoAddMutation",
      "operationKind": "mutation",
      "text": "mutation ToDoAddMutation(\n  $input: ToDoAddInput!\n) {\n  ToDoAdd(input: $input) {\n    Viewer {\n      id\n      ToDo_TotalCount\n    }\n    ToDosEdge {\n      __typename\n      cursor\n      node {\n        id\n        ToDo_Complete\n        ToDo_Text\n      }\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '91b4bedd9baa04b077f5bcb84fb786a1';

module.exports = node;
//# sourceMappingURL=ToDoAddMutation.graphql.js.map