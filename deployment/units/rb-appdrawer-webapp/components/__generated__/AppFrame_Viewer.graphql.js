



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              type AppDrawerNavItems_Viewer$ref = any;
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type AppFrame_Viewer$ref: FragmentReference;
              declare export opaque type AppFrame_Viewer$fragmentType: AppFrame_Viewer$ref;
              export type AppFrame_Viewer = {|
                +UserToken2: ?string,
                +$fragmentRefs: AppDrawerNavItems_Viewer$ref,
                +$refType: AppFrame_Viewer$ref,
              |};
              export type AppFrame_Viewer$data = AppFrame_Viewer;
              export type AppFrame_Viewer$key = {
                +$data?: AppFrame_Viewer$data,
                +$fragmentRefs: AppFrame_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "AppFrame_Viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "UserToken2",
    "args": null,
    "storageKey": null },

  {
    "kind": "FragmentSpread",
    "name": "AppDrawerNavItems_Viewer",
    "args": null }] };



// prettier-ignore
node /*: any*/.hash = '3312dd5bd71574ff44d378a918d037d4';
module.exports = node;
//# sourceMappingURL=AppFrame_Viewer.graphql.js.map