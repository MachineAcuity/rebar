



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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppFrame_Viewer",
  "selections": [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "UserToken2",
    "storageKey": null },

  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "AppDrawerNavItems_Viewer" }],


  "type": "Viewer" };

// prettier-ignore
node /*: any*/.hash = '3312dd5bd71574ff44d378a918d037d4';

module.exports = node;
//# sourceMappingURL=AppFrame_Viewer.graphql.js.map