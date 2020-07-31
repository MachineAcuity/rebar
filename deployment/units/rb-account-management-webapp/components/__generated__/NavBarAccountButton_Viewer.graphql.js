



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type NavBarAccountButton_Viewer$ref: FragmentReference;
              declare export opaque type NavBarAccountButton_Viewer$fragmentType: NavBarAccountButton_Viewer$ref;
              export type NavBarAccountButton_Viewer = {|
                +User_IsAnonymous: ?boolean,
                +User_DisplayName: ?string,
                +$refType: NavBarAccountButton_Viewer$ref,
              |};
              export type NavBarAccountButton_Viewer$data = NavBarAccountButton_Viewer;
              export type NavBarAccountButton_Viewer$key = {
                +$data?: NavBarAccountButton_Viewer$data,
                +$fragmentRefs: NavBarAccountButton_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarAccountButton_Viewer",
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


  "type": "Viewer",
  "abstractKey": null };

// prettier-ignore
node /*: any*/.hash = 'ec25508de9e3a02cad7892e2470b0646';

module.exports = node;
//# sourceMappingURL=NavBarAccountButton_Viewer.graphql.js.map