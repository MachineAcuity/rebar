



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type EnsayoDeleteInput = {|
                id: string,
                clientMutationId?: ?string,
              |};
              export type EnsayoDeleteMutationVariables = {|
                input: EnsayoDeleteInput
              |};
              export type EnsayoDeleteMutationResponse = {|
                +EnsayoDelete: ?{|
                  +deletedId: ?string
                |}
              |};
              export type EnsayoDeleteMutation = {|
                variables: EnsayoDeleteMutationVariables,
                response: EnsayoDeleteMutationResponse,
              |};
              */


/*
                 mutation EnsayoDeleteMutation(
                   $input: EnsayoDeleteInput!
                 ) {
                   EnsayoDelete(input: $input) {
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
    "alias": null,
    "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "input" }],


    "concreteType": "EnsayoDeletePayload",
    "kind": "LinkedField",
    "name": "EnsayoDelete",
    "plural": false,
    "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deletedId",
      "storageKey": null }],


    "storageKey": null }];


  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "EnsayoDeleteMutation",
      "selections": v1 /*: any*/,
      "type": "Mutation",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "EnsayoDeleteMutation",
      "selections": v1 /*: any*/ },

    "params": {
      "cacheID": "dae3f7017a3a56fbb77827070b3f69b8",
      "id": null,
      "metadata": {},
      "name": "EnsayoDeleteMutation",
      "operationKind": "mutation",
      "text": "mutation EnsayoDeleteMutation(\n  $input: EnsayoDeleteInput!\n) {\n  EnsayoDelete(input: $input) {\n    deletedId\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = 'd8c8d964d97d923ef7f0e6c1d21ecfcb';

module.exports = node;
//# sourceMappingURL=EnsayoDeleteMutation.graphql.js.map