



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type EnsayoPublicItem_Viewer$ref: FragmentReference;
              declare export opaque type EnsayoPublicItem_Viewer$fragmentType: EnsayoPublicItem_Viewer$ref;
              export type EnsayoPublicItem_Viewer = {|
                +Ensayo: ?{|
                  +Ensayo_Title: ?string,
                  +Ensayo_Description: ?string,
                  +Ensayo_Content: ?string,
                |},
                +$refType: EnsayoPublicItem_Viewer$ref,
              |};
              export type EnsayoPublicItem_Viewer$data = EnsayoPublicItem_Viewer;
              export type EnsayoPublicItem_Viewer$key = {
                +$data?: EnsayoPublicItem_Viewer$data,
                +$fragmentRefs: EnsayoPublicItem_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "argumentDefinitions": [
  {
    "kind": "RootArgument",
    "name": "id",
    "type": "ID" }],


  "kind": "Fragment",
  "metadata": null,
  "name": "EnsayoPublicItem_Viewer",
  "selections": [
  {
    "alias": null,
    "args": [
    {
      "kind": "Variable",
      "name": "id",
      "variableName": "id" }],


    "concreteType": "Ensayo",
    "kind": "LinkedField",
    "name": "Ensayo",
    "plural": false,
    "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "Ensayo_Title",
      "storageKey": null },

    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "Ensayo_Description",
      "storageKey": null },

    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "Ensayo_Content",
      "storageKey": null }],


    "storageKey": null }],


  "type": "Viewer" };

// prettier-ignore
node /*: any*/.hash = 'c89d0591d3683ab3a528213ea89d139f';

module.exports = node;
//# sourceMappingURL=EnsayoPublicItem_Viewer.graphql.js.map