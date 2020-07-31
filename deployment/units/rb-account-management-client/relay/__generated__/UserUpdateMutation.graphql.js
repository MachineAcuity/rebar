



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type UserUpdateInput = {|
                User_DisplayName: string,
                User_PrimaryEmail: string,
                User_PrimaryPhone: string,
                clientMutationId?: ?string,
              |};
              export type UserUpdateMutationVariables = {|
                input: UserUpdateInput
              |};
              export type UserUpdateMutationResponse = {|
                +UserUpdate: ?{|
                  +Viewer: ?{|
                    +User_DisplayName: ?string,
                    +User_PrimaryEmail: ?string,
                    +User_PrimaryPhone: ?string,
                  |}
                |}
              |};
              export type UserUpdateMutation = {|
                variables: UserUpdateMutationVariables,
                response: UserUpdateMutationResponse,
              |};
              */


/*
                 mutation UserUpdateMutation(
                   $input: UserUpdateInput!
                 ) {
                   UserUpdate(input: $input) {
                     Viewer {
                       User_DisplayName
                       User_PrimaryEmail
                       User_PrimaryPhone
                       id
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


  v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input" }],


  v2 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "User_DisplayName",
    "storageKey": null },

  v3 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "User_PrimaryEmail",
    "storageKey": null },

  v4 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "User_PrimaryPhone",
    "storageKey": null };

  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "UserUpdateMutation",
      "selections": [
      {
        "alias": null,
        "args": v1 /*: any*/,
        "concreteType": "UserUpdatePayload",
        "kind": "LinkedField",
        "name": "UserUpdate",
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
          v4 /*: any*/],

          "storageKey": null }],


        "storageKey": null }],


      "type": "Mutation",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "UserUpdateMutation",
      "selections": [
      {
        "alias": null,
        "args": v1 /*: any*/,
        "concreteType": "UserUpdatePayload",
        "kind": "LinkedField",
        "name": "UserUpdate",
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
          v4 /*: any*/,
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null }],


          "storageKey": null }],


        "storageKey": null }] },



    "params": {
      "cacheID": "8a10965445477206c3e49abd11e4cb9d",
      "id": null,
      "metadata": {},
      "name": "UserUpdateMutation",
      "operationKind": "mutation",
      "text": "mutation UserUpdateMutation(\n  $input: UserUpdateInput!\n) {\n  UserUpdate(input: $input) {\n    Viewer {\n      User_DisplayName\n      User_PrimaryEmail\n      User_PrimaryPhone\n      id\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = 'abeb70f0be768871d470d7f4f52a7e96';

module.exports = node;
//# sourceMappingURL=UserUpdateMutation.graphql.js.map