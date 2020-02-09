



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type EnsayoInPlaceEditItem_Ensayo$ref: FragmentReference;
              declare export opaque type EnsayoInPlaceEditItem_Ensayo$fragmentType: EnsayoInPlaceEditItem_Ensayo$ref;
              export type EnsayoInPlaceEditItem_Ensayo = {|
                +id: string,
                +Ensayo_Title: ?string,
                +Ensayo_Description: ?string,
                +Ensayo_Content: ?string,
                +$refType: EnsayoInPlaceEditItem_Ensayo$ref,
              |};
              export type EnsayoInPlaceEditItem_Ensayo$data = EnsayoInPlaceEditItem_Ensayo;
              export type EnsayoInPlaceEditItem_Ensayo$key = {
                +$data?: EnsayoInPlaceEditItem_Ensayo$data,
                +$fragmentRefs: EnsayoInPlaceEditItem_Ensayo$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "EnsayoInPlaceEditItem_Ensayo",
  "type": "Ensayo",
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
    "name": "Ensayo_Title",
    "args": null,
    "storageKey": null },

  {
    "kind": "ScalarField",
    "alias": null,
    "name": "Ensayo_Description",
    "args": null,
    "storageKey": null },

  {
    "kind": "ScalarField",
    "alias": null,
    "name": "Ensayo_Content",
    "args": null,
    "storageKey": null }] };



// prettier-ignore
node /*: any*/.hash = '195136c812b1fbd8e34d1224b650e12a';
module.exports = node;
//# sourceMappingURL=EnsayoInPlaceEditItem_Ensayo.graphql.js.map