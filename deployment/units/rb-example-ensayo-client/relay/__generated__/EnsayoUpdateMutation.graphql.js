



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type EnsayoUpdateInput = {|
                id: string,
                Ensayo_Title: string,
                Ensayo_Description: string,
                Ensayo_Content: string,
                clientMutationId?: ?string,
              |};
              export type EnsayoUpdateMutationVariables = {|
                input: EnsayoUpdateInput
              |};
              export type EnsayoUpdateMutationResponse = {|
                +EnsayoUpdate: ?{|
                  +Ensayo: ?{|
                    +id: string,
                    +Ensayo_Title: ?string,
                    +Ensayo_Description: ?string,
                    +Ensayo_Content: ?string,
                  |}
                |}
              |};
              export type EnsayoUpdateMutation = {|
                variables: EnsayoUpdateMutationVariables,
                response: EnsayoUpdateMutationResponse,
              |};
              */


/*
                 mutation EnsayoUpdateMutation(
                   $input: EnsayoUpdateInput!
                 ) {
                   EnsayoUpdate(input: $input) {
                     Ensayo {
                       id
                       Ensayo_Title
                       Ensayo_Description
                       Ensayo_Content
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
    "type": "EnsayoUpdateInput!" }],


  v1 = [
  {
    "alias": null,
    "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "input" }],


    "concreteType": "EnsayoUpdatePayload",
    "kind": "LinkedField",
    "name": "EnsayoUpdate",
    "plural": false,
    "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Ensayo",
      "kind": "LinkedField",
      "name": "Ensayo",
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
        "name": "Ensayo_Title",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "Ensayo_Description",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "Ensayo_Content",
        "storageKey": null }],


      "storageKey": null }],


    "storageKey": null }];


  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "EnsayoUpdateMutation",
      "selections": v1 /*: any*/,
      "type": "Mutation" },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "EnsayoUpdateMutation",
      "selections": v1 /*: any*/ },

    "params": {
      "id": null,
      "metadata": {},
      "name": "EnsayoUpdateMutation",
      "operationKind": "mutation",
      "text": "mutation EnsayoUpdateMutation(\n  $input: EnsayoUpdateInput!\n) {\n  EnsayoUpdate(input: $input) {\n    Ensayo {\n      id\n      Ensayo_Title\n      Ensayo_Description\n      Ensayo_Content\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '6fc4902bbb734ef3ec064c06c70a2198';

module.exports = node;
//# sourceMappingURL=EnsayoUpdateMutation.graphql.js.map