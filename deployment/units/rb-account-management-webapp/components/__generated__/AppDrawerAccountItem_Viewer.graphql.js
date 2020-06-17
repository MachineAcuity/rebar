



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type AppDrawerAccountItem_Viewer$ref: FragmentReference;
              declare export opaque type AppDrawerAccountItem_Viewer$fragmentType: AppDrawerAccountItem_Viewer$ref;
              export type AppDrawerAccountItem_Viewer = {|
                +User_IsAnonymous: ?boolean,
                +User_DisplayName: ?string,
                +$refType: AppDrawerAccountItem_Viewer$ref,
              |};
              export type AppDrawerAccountItem_Viewer$data = AppDrawerAccountItem_Viewer;
              export type AppDrawerAccountItem_Viewer$key = {
                +$data?: AppDrawerAccountItem_Viewer$data,
                +$fragmentRefs: AppDrawerAccountItem_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppDrawerAccountItem_Viewer",
  "selections": [
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
    "storageKey": null }],


  "type": "Viewer" };

// prettier-ignore
node /*: any*/.hash = 'e48012ecc13743801a691f167b827836';

module.exports = node;
//# sourceMappingURL=AppDrawerAccountItem_Viewer.graphql.js.map