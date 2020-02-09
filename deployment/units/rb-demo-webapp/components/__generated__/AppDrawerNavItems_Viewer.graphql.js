



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
  "kind": "Fragment",
  "name": "AppDrawerNavItems_Viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "User_IsAnonymous",
    "args": null,
    "storageKey": null },

  {
    "kind": "FragmentSpread",
    "name": "AppDrawerAccountItem_Viewer",
    "args": null }] };



// prettier-ignore
node /*: any*/.hash = '1cb0d6078d9c9144955d3294daed7f6c';
module.exports = node;
//# sourceMappingURL=AppDrawerNavItems_Viewer.graphql.js.map