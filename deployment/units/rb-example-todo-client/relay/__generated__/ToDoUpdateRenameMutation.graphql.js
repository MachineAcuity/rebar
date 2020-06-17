



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type ToDoUpdateRenameInput = {|
                id: string,
                ToDo_Text: string,
                clientMutationId?: ?string,
              |};
              export type ToDoUpdateRenameMutationVariables = {|
                input: ToDoUpdateRenameInput
              |};
              export type ToDoUpdateRenameMutationResponse = {|
                +ToDoUpdateRename: ?{|
                  +ToDo: ?{|
                    +id: string,
                    +ToDo_Text: ?string,
                  |}
                |}
              |};
              export type ToDoUpdateRenameMutation = {|
                variables: ToDoUpdateRenameMutationVariables,
                response: ToDoUpdateRenameMutationResponse,
              |};
              */


/*
                 mutation ToDoUpdateRenameMutation(
                   $input: ToDoUpdateRenameInput!
                 ) {
                   ToDoUpdateRename(input: $input) {
                     ToDo {
                       id
                       ToDo_Text
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
    "type": "ToDoUpdateRenameInput!" }],


  v1 = [
  {
    "alias": null,
    "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "input" }],


    "concreteType": "ToDoUpdateRenamePayload",
    "kind": "LinkedField",
    "name": "ToDoUpdateRename",
    "plural": false,
    "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ToDo",
      "kind": "LinkedField",
      "name": "ToDo",
      "plural": false,
      "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ToDo_Text",
        "storageKey": null }],


      "storageKey": null }],


    "storageKey": null }];


  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "ToDoUpdateRenameMutation",
      "selections": v1 /*: any*/,
      "type": "Mutation" },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "ToDoUpdateRenameMutation",
      "selections": v1 /*: any*/ },

    "params": {
      "id": null,
      "metadata": {},
      "name": "ToDoUpdateRenameMutation",
      "operationKind": "mutation",
      "text": "mutation ToDoUpdateRenameMutation(\n  $input: ToDoUpdateRenameInput!\n) {\n  ToDoUpdateRename(input: $input) {\n    ToDo {\n      id\n      ToDo_Text\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '5ca316bc08f370bba86945985652a644';

module.exports = node;
//# sourceMappingURL=ToDoUpdateRenameMutation.graphql.js.map