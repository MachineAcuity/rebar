/**
 * 
 * @relayHash 64ae8f1b04f06ffb887800a9cdaa6eac
 */

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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "createDefaultRoutes_AppFrame_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "Viewer",
      "storageKey": null,
      "args": null,
      "concreteType": "Viewer",
      "plural": false,
      "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppFrame_Viewer",
        "args": null }] }] },





  "operation": {
    "kind": "Operation",
    "name": "createDefaultRoutes_AppFrame_Query",
    "argumentDefinitions": [],
    "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "Viewer",
      "storageKey": null,
      "args": null,
      "concreteType": "Viewer",
      "plural": false,
      "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "UserToken2",
        "args": null,
        "storageKey": null },

      {
        "kind": "ScalarField",
        "alias": null,
        "name": "User_IsAnonymous",
        "args": null,
        "storageKey": null },

      {
        "kind": "ScalarField",
        "alias": null,
        "name": "User_DisplayName",
        "args": null,
        "storageKey": null },

      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null }] }] },





  "params": {
    "operationKind": "query",
    "name": "createDefaultRoutes_AppFrame_Query",
    "id": null,
    "text": "query createDefaultRoutes_AppFrame_Query {\n  Viewer {\n    ...AppFrame_Viewer\n    id\n  }\n}\n\nfragment AppDrawerAccountItem_Viewer on Viewer {\n  User_IsAnonymous\n  User_DisplayName\n}\n\nfragment AppDrawerNavItems_Viewer on Viewer {\n  ...AppDrawerAccountItem_Viewer\n  User_IsAnonymous\n}\n\nfragment AppFrame_Viewer on Viewer {\n  UserToken2\n  ...AppDrawerNavItems_Viewer\n}\n",
    "metadata": {} } };


// prettier-ignore
node /*: any*/.hash = '62f17a519f10c2f80031922d04c75329';
module.exports = node;
//# sourceMappingURL=createDefaultRoutes_AppFrame_Query.graphql.js.map