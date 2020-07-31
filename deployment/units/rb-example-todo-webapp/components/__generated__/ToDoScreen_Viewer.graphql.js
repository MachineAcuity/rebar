



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type ToDoScreen_Viewer$ref: FragmentReference;
              declare export opaque type ToDoScreen_Viewer$fragmentType: ToDoScreen_Viewer$ref;
              export type ToDoScreen_Viewer = {|
                +id: string,
                +$refType: ToDoScreen_Viewer$ref,
              |};
              export type ToDoScreen_Viewer$data = ToDoScreen_Viewer;
              export type ToDoScreen_Viewer$key = {
                +$data?: ToDoScreen_Viewer$data,
                +$fragmentRefs: ToDoScreen_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ToDoScreen_Viewer",
  "selections": [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null }],


  "type": "Viewer",
  "abstractKey": null };

// prettier-ignore
node /*: any*/.hash = '51f13adf0441eb6987038deaeea9998d';

module.exports = node;
//# sourceMappingURL=ToDoScreen_Viewer.graphql.js.map