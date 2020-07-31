



/* eslint-disable */

'use strict';

/*::
              import type { ConcreteRequest } from 'relay-runtime';
              type UserProfileScreen_Viewer$ref = any;
              export type routeAppFrameAccountManagement_UserProfileScreen_QueryVariables = {||};
              export type routeAppFrameAccountManagement_UserProfileScreen_QueryResponse = {|
                +Viewer: ?{|
                  +$fragmentRefs: UserProfileScreen_Viewer$ref
                |}
              |};
              export type routeAppFrameAccountManagement_UserProfileScreen_Query = {|
                variables: routeAppFrameAccountManagement_UserProfileScreen_QueryVariables,
                response: routeAppFrameAccountManagement_UserProfileScreen_QueryResponse,
              |};
              */


/*
                 query routeAppFrameAccountManagement_UserProfileScreen_Query {
                   Viewer {
                     ...UserProfileScreen_Viewer
                     id
                   }
                 }
                 
                 fragment UserProfileScreen_Viewer on Viewer {
                   id
                   User_IsAnonymous
                   User_DisplayName
                   User_PrimaryEmail
                   User_PrimaryPhone
                 }
                 */

const node /*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeAppFrameAccountManagement_UserProfileScreen_Query",
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
        "name": "UserProfileScreen_Viewer" }],


      "storageKey": null }],


    "type": "Query",
    "abstractKey": null },

  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAppFrameAccountManagement_UserProfileScreen_Query",
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
        "name": "id",
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
        "name": "User_PrimaryEmail",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "User_PrimaryPhone",
        "storageKey": null }],


      "storageKey": null }] },



  "params": {
    "cacheID": "305945779bab8bd2864e85527e4ec4ff",
    "id": null,
    "metadata": {},
    "name": "routeAppFrameAccountManagement_UserProfileScreen_Query",
    "operationKind": "query",
    "text": "query routeAppFrameAccountManagement_UserProfileScreen_Query {\n  Viewer {\n    ...UserProfileScreen_Viewer\n    id\n  }\n}\n\nfragment UserProfileScreen_Viewer on Viewer {\n  id\n  User_IsAnonymous\n  User_DisplayName\n  User_PrimaryEmail\n  User_PrimaryPhone\n}\n" } };


// prettier-ignore
node /*: any*/.hash = '86c0fd69fab10667ae14755453488393';

module.exports = node;
//# sourceMappingURL=routeAppFrameAccountManagement_UserProfileScreen_Query.graphql.js.map