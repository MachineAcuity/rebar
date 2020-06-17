



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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfileScreen_Viewer",
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


  "type": "Viewer" };

// prettier-ignore
node /*: any*/.hash = '0bacd47e4714e448ac9e04f60fc3501e';

module.exports = node;
//# sourceMappingURL=UserProfileScreen_Viewer.graphql.js.map