



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type UserProfileScreen_Viewer$ref: FragmentReference;
              declare export opaque type UserProfileScreen_Viewer$fragmentType: UserProfileScreen_Viewer$ref;
              export type UserProfileScreen_Viewer = {|
                +id: string,
                +User_IsAnonymous: ?boolean,
                +User_DisplayName: ?string,
                +User_PrimaryEmail: ?string,
                +User_PrimaryPhone: ?string,
                +$refType: UserProfileScreen_Viewer$ref,
              |};
              export type UserProfileScreen_Viewer$data = UserProfileScreen_Viewer;
              export type UserProfileScreen_Viewer$key = {
                +$data?: UserProfileScreen_Viewer$data,
                +$fragmentRefs: UserProfileScreen_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "UserProfileScreen_Viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
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
    "name": "User_PrimaryEmail",
    "args": null,
    "storageKey": null },

  {
    "kind": "ScalarField",
    "alias": null,
    "name": "User_PrimaryPhone",
    "args": null,
    "storageKey": null }] };



// prettier-ignore
node /*: any*/.hash = '0bacd47e4714e448ac9e04f60fc3501e';
module.exports = node;
//# sourceMappingURL=UserProfileScreen_Viewer.graphql.js.map