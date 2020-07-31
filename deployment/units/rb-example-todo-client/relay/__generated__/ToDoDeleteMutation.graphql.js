



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type ToDoDeleteInput = {|
                id: string,
                clientMutationId?: ?string,
              |};
              export type ToDoDeleteMutationVariables = {|
                input: ToDoDeleteInput
              |};
              export type ToDoDeleteMutationResponse = {|
                +ToDoDelete: ?{|
                  +Viewer: ?{|
                    +ToDo_TotalCount: ?number,
                    +ToDo_CompletedCount: ?number,
                  |},
                  +deletedId: ?string,
                |}
              |};
              export type ToDoDeleteMutation = {|
                variables: ToDoDeleteMutationVariables,
                response: ToDoDeleteMutationResponse,
              |};
              */


/*
                 mutation ToDoDeleteMutation(
                   $input: ToDoDeleteInput!
                 ) {
                   ToDoDelete(input: $input) {
                     Viewer {
                       ToDo_TotalCount
                       ToDo_CompletedCount
                       id
                     }
                     deletedId
                   }
                 }
                 */

const node /*: ConcreteRequest*/ = function () {
  var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input" }],


  v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input" }],


  v2 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ToDo_TotalCount",
    "storageKey": null },

  v3 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ToDo_CompletedCount",
    "storageKey": null },

  v4 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "deletedId",
    "storageKey": null };

  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "ToDoDeleteMutation",
      "selections": [
      {
        "alias": null,
        "args": v1 /*: any*/,
        "concreteType": "ToDoDeletePayload",
        "kind": "LinkedField",
        "name": "ToDoDelete",
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
          v2 /*: any*/,
          v3 /*: any*/],

          "storageKey": null },

        v4 /*: any*/],

        "storageKey": null }],


      "type": "Mutation",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "ToDoDeleteMutation",
      "selections": [
      {
        "alias": null,
        "args": v1 /*: any*/,
        "concreteType": "ToDoDeletePayload",
        "kind": "LinkedField",
        "name": "ToDoDelete",
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
          v2 /*: any*/,
          v3 /*: any*/,
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null }],


          "storageKey": null },

        v4 /*: any*/],

        "storageKey": null }] },



    "params": {
      "cacheID": "0092ce52250e6c893dfb00516c4dc5d7",
      "id": null,
      "metadata": {},
      "name": "ToDoDeleteMutation",
      "operationKind": "mutation",
      "text": "mutation ToDoDeleteMutation(\n  $input: ToDoDeleteInput!\n) {\n  ToDoDelete(input: $input) {\n    Viewer {\n      ToDo_TotalCount\n      ToDo_CompletedCount\n      id\n    }\n    deletedId\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = 'a581035e0f38d5d8ad86368e6420b22c';

module.exports = node;
//# sourceMappingURL=ToDoDeleteMutation.graphql.js.map