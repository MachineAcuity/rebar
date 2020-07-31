



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              export type EnsayoAddInput = {|
                Ensayo_Title: string,
                Ensayo_Description: string,
                Ensayo_Content: string,
                clientMutationId?: ?string,
              |};
              export type EnsayoAddMutationVariables = {|
                input: EnsayoAddInput
              |};
              export type EnsayoAddMutationResponse = {|
                +EnsayoAdd: ?{|
                  +Viewer: ?{|
                    +id: string
                  |},
                  +EnsayosEdge: ?{|
                    +cursor: string,
                    +node: ?{|
                      +id: string,
                      +Ensayo_Title: ?string,
                      +Ensayo_Description: ?string,
                      +Ensayo_Content: ?string,
                    |},
                  |},
                |}
              |};
              export type EnsayoAddMutation = {|
                variables: EnsayoAddMutationVariables,
                response: EnsayoAddMutationResponse,
              |};
              */


/*
                 mutation EnsayoAddMutation(
                   $input: EnsayoAddInput!
                 ) {
                   EnsayoAdd(input: $input) {
                     Viewer {
                       id
                     }
                     EnsayosEdge {
                       cursor
                       node {
                         id
                         Ensayo_Title
                         Ensayo_Description
                         Ensayo_Content
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


    "concreteType": "EnsayoAddPayload",
    "kind": "LinkedField",
    "name": "EnsayoAdd",
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
      v1 /*: any*/],

      "storageKey": null },

    {
      "alias": null,
      "args": null,
      "concreteType": "EnsayosEdge",
      "kind": "LinkedField",
      "name": "EnsayosEdge",
      "plural": false,
      "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "concreteType": "Ensayo",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
        v1 /*: any*/,
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


      "storageKey": null }],


    "storageKey": null }];


  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "EnsayoAddMutation",
      "selections": v2 /*: any*/,
      "type": "Mutation",
      "abstractKey": null },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "EnsayoAddMutation",
      "selections": v2 /*: any*/ },

    "params": {
      "cacheID": "c338ca1b2bf2f6b2bc5fb4a83bdcea0d",
      "id": null,
      "metadata": {},
      "name": "EnsayoAddMutation",
      "operationKind": "mutation",
      "text": "mutation EnsayoAddMutation(\n  $input: EnsayoAddInput!\n) {\n  EnsayoAdd(input: $input) {\n    Viewer {\n      id\n    }\n    EnsayosEdge {\n      cursor\n      node {\n        id\n        Ensayo_Title\n        Ensayo_Description\n        Ensayo_Content\n      }\n    }\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = 'ea5acd7697360f56ea79ddb77f8ad1bc';

module.exports = node;
//# sourceMappingURL=EnsayoAddMutation.graphql.js.map