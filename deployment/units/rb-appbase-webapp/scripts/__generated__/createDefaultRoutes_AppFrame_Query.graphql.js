



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type AppFrame_Viewer$ref = any;
              export type createDefaultRoutes_AppFrame_QueryVariables = {||};
              export type createDefaultRoutes_AppFrame_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: AppFrame_Viewer$ref
                |}
              |};
              export type createDefaultRoutes_AppFrame_Query = {|
                variables: createDefaultRoutes_AppFrame_QueryVariables,
                response: createDefaultRoutes_AppFrame_QueryResponse,
              |};
              */


/*
                 query createDefaultRoutes_AppFrame_Query {
                   Viewer {
                     ...AppFrame_Viewer
                     id
                   }
                 }
                 
                 fragment AppDrawerAccountItem_Viewer on Viewer {
                   User_IsAnonymous
                   User_DisplayName
                 }
                 
                 fragment AppDrawerNavItems_Viewer on Viewer {
                   ...AppDrawerAccountItem_Viewer
                   User_IsAnonymous
                 }
                 
                 fragment AppFrame_Viewer on Viewer {
                   UserToken2
                   ...AppDrawerNavItems_Viewer
                 }
                 */

const node /*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "createDefaultRoutes_AppFrame_Query",
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
        "name": "AppFrame_Viewer" }],


      "storageKey": null }],


    "type": "Query" },

  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "createDefaultRoutes_AppFrame_Query",
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
        "args": null,
        "kind": "ScalarField",
        "name": "UserToken2",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "User_IsAnonymous",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "User_DisplayName",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null }],


      "storageKey": null }] },



  "params": {
    "id": null,
    "metadata": {},
    "name": "createDefaultRoutes_AppFrame_Query",
    "operationKind": "query",
    "text": "query createDefaultRoutes_AppFrame_Query {\n  Viewer {\n    ...AppFrame_Viewer\n    id\n  }\n}\n\nfragment AppDrawerAccountItem_Viewer on Viewer {\n  User_IsAnonymous\n  User_DisplayName\n}\n\nfragment AppDrawerNavItems_Viewer on Viewer {\n  ...AppDrawerAccountItem_Viewer\n  User_IsAnonymous\n}\n\nfragment AppFrame_Viewer on Viewer {\n  UserToken2\n  ...AppDrawerNavItems_Viewer\n}\n" } };


// prettier-ignore
node /*: any*/.hash = '62f17a519f10c2f80031922d04c75329';

module.exports = node;
//# sourceMappingURL=createDefaultRoutes_AppFrame_Query.graphql.js.map