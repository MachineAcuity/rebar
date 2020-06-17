



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type ToDoItem_Viewer$ref: FragmentReference;
              declare export opaque type ToDoItem_Viewer$fragmentType: ToDoItem_Viewer$ref;
              export type ToDoItem_Viewer = {|
                +id: string,
                +$refType: ToDoItem_Viewer$ref,
              |};
              export type ToDoItem_Viewer$data = ToDoItem_Viewer;
              export type ToDoItem_Viewer$key = {
                +$data?: ToDoItem_Viewer$data,
                +$fragmentRefs: ToDoItem_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ToDoItem_Viewer",
  "selections": [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null }],


  "type": "Viewer" };

// prettier-ignore
node /*: any*/.hash = '1a7d80a3304bcbe9332edd571759ed60';

module.exports = node;
//# sourceMappingURL=ToDoItem_Viewer.graphql.js.map