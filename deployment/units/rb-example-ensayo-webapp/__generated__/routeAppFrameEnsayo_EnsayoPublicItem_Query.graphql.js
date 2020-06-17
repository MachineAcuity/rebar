



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type EnsayoPublicItem_Viewer$ref = any;
              export type routeAppFrameEnsayo_EnsayoPublicItem_QueryVariables = {|
                id: string
              |};
              export type routeAppFrameEnsayo_EnsayoPublicItem_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: EnsayoPublicItem_Viewer$ref
                |}
              |};
              export type routeAppFrameEnsayo_EnsayoPublicItem_Query = {|
                variables: routeAppFrameEnsayo_EnsayoPublicItem_QueryVariables,
                response: routeAppFrameEnsayo_EnsayoPublicItem_QueryResponse,
              |};
              */


/*
                 query routeAppFrameEnsayo_EnsayoPublicItem_Query(
                   $id: ID!
                 ) {
                   Viewer {
                     ...EnsayoPublicItem_Viewer
                     id
                   }
                 }
                 
                 fragment EnsayoPublicItem_Viewer on Viewer {
                   Ensayo(id: $id) {
                     Ensayo_Title
                     Ensayo_Description
                     Ensayo_Content
                     id
                   }
                 }
                 */

const node /*: ConcreteRequest*/ = function () {
  var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!" }],


  v1 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null };

  return {
    "fragment": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Fragment",
      "metadata": null,
      "name": "routeAppFrameEnsayo_EnsayoPublicItem_Query",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "EnsayoPublicItem_Viewer" }],


        "storageKey": null }],


      "type": "Query" },

    "kind": "Request",
    "operation": {
      "argumentDefinitions": v0 /*: any*/,
      "kind": "Operation",
      "name": "routeAppFrameEnsayo_EnsayoPublicItem_Query",
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
            "name": "id",
            "variableName": "id" }],


          "concreteType": "Ensayo",
          "kind": "LinkedField",
          "name": "Ensayo",
          "plural": false,
          "selections": [
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
            "storageKey": null },

          v1 /*: any*/],

          "storageKey": null },

        v1 /*: any*/],

        "storageKey": null }] },



    "params": {
      "id": null,
      "metadata": {},
      "name": "routeAppFrameEnsayo_EnsayoPublicItem_Query",
      "operationKind": "query",
      "text": "query routeAppFrameEnsayo_EnsayoPublicItem_Query(\n  $id: ID!\n) {\n  Viewer {\n    ...EnsayoPublicItem_Viewer\n    id\n  }\n}\n\nfragment EnsayoPublicItem_Viewer on Viewer {\n  Ensayo(id: $id) {\n    Ensayo_Title\n    Ensayo_Description\n    Ensayo_Content\n    id\n  }\n}\n" } };


}();
// prettier-ignore
node /*: any*/.hash = '2f4657c9a6e2c5334ae892d11fc4d966';

module.exports = node;
//# sourceMappingURL=routeAppFrameEnsayo_EnsayoPublicItem_Query.graphql.js.map