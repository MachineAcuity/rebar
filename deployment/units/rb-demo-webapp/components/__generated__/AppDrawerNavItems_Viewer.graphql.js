



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              type AppDrawerAccountItem_Viewer$ref = any;
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type AppDrawerNavItems_Viewer$ref: FragmentReference;
              declare export opaque type AppDrawerNavItems_Viewer$fragmentType: AppDrawerNavItems_Viewer$ref;
              export type AppDrawerNavItems_Viewer = {|
                +User_IsAnonymous: ?boolean,
                +$fragmentRefs: AppDrawerAccountItem_Viewer$ref,
                +$refType: AppDrawerNavItems_Viewer$ref,
              |};
              export type AppDrawerNavItems_Viewer$data = AppDrawerNavItems_Viewer;
              export type AppDrawerNavItems_Viewer$key = {
                +$data?: AppDrawerNavItems_Viewer$data,
                +$fragmentRefs: AppDrawerNavItems_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppDrawerNavItems_Viewer",
  "selections": [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "User_IsAnonymous",
    "storageKey": null },

  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "AppDrawerAccountItem_Viewer" }],


  "type": "Viewer" };

// prettier-ignore
node /*: any*/.hash = '1cb0d6078d9c9144955d3294daed7f6c';

module.exports = node;
//# sourceMappingURL=AppDrawerNavItems_Viewer.graphql.js.map