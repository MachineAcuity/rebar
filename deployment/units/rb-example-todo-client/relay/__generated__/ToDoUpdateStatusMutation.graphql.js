



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type ToDoUpdateStatusInput = {|
                id: string,
                ToDo_Complete: boolean,
                clientMutationId?: ?string,
              |};
              export type ToDoUpdateStatusMutationVariables = {|
                input: ToDoUpdateStatusInput
              |};
              export type ToDoUpdateStatusMutationResponse = {|
                +ToDoUpdateStatus: ?{|
                  +Viewer: ?{|
                    +id: string,
                    +ToDo_CompletedCount: ?number,
                  |},
                  +ToDo: ?{|
                    +id: string,
                    +ToDo_Complete: ?boolean,
                  |},
                |}
              |};
              export type ToDoUpdateStatusMutation = {|
                variables: ToDoUpdateStatusMutationVariables,
                response: ToDoUpdateStatusMutationResponse,
              |};
              */


/*
                 mutation ToDoUpdateStatusMutation(
                   $input: ToDoUpdateStatusInput!
                 ) {
                   ToDoUpdateStatus(input: $input) {
                     Viewer {
                       id
                       ToDo_CompletedCount
                     }
                     ToDo {
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
    "name": "input",
    "type": "ToDoUpdateStatusInput!" }],


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


    "concreteType": "ToDoUpdateStatusPayload",
    "kind": "LinkedField",
    "name": "ToDoUpdateStatus",
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
        "name": "ToDo_CompletedCount",
        "storageKey": null }],


      "storageKey": null },

    {
      "alias": null,
      "args": null,
      "concreteType": "ToDo",
      "kind": "LinkedField",
      "name": "ToDo",
      "plural": false,
      "selections": [
      v1 /*: any*/,
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ToDo_Complete",
        "storageKey": null }],


      "storageKey": null }],


    "storageKey": null }];


  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "ToDoUpdateStatusMutation",
      "selections": v2 /*: any*/,
      "type": "Mutation" },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "ToDoUpdateStatusMutation",
      "selections": v2 /*: any*/ },

    "params": {
      "id": null,
      "metadata": {},
      "name": "ToDoUpdateStatusMutation",
      "operationKind": "mutation",
      "text": "mutation ToDoUpdateStatusMutation(\n  $input: ToDoUpdateStatusInput!\n) {\n  ToDoUpdateStatus(input: $input) {\n    Viewer {\n      id\n      ToDo_CompletedCount\n    }\n    ToDo {\n      id\n      ToDo_Complete\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '05dd206726300c3f5a9866475072d101';

module.exports = node;
//# sourceMappingURL=ToDoUpdateStatusMutation.graphql.js.map