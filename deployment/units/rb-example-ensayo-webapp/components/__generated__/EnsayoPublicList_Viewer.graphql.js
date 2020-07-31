



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type EnsayoPublicList_Viewer$ref: FragmentReference;
              declare export opaque type EnsayoPublicList_Viewer$fragmentType: EnsayoPublicList_Viewer$ref;
              export type EnsayoPublicList_Viewer = {|
                +Ensayos: ?{|
                  +edges: ?$ReadOnlyArray<?{|
                    +node: ?{|
                      +id: string,
                      +Ensayo_Title: ?string,
                      +Ensayo_Description: ?string,
                    |}
                  |}>
                |},
                +$refType: EnsayoPublicList_Viewer$ref,
              |};
              export type EnsayoPublicList_Viewer$data = EnsayoPublicList_Viewer;
              export type EnsayoPublicList_Viewer$key = {
                +$data?: EnsayoPublicList_Viewer$data,
                +$fragmentRefs: EnsayoPublicList_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
    {
      "count": null,
      "cursor": null,
      "direction": "forward",
      "path": [
      "Ensayos"] }] },




  "name": "EnsayoPublicList_Viewer",
  "selections": [
  {
    "alias": "Ensayos",
    "args": null,
    "concreteType": "EnsayosConnection",
    "kind": "LinkedField",
    "name": "__EnsayoPublicList_Ensayos_connection",
    "plural": false,
    "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EnsayosEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Ensayo",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null },

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
          "name": "__typename",
          "storageKey": null }],


        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null }],


      "storageKey": null },

    {
      "alias": null,
      "args": null,
      "concreteType": "PageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null },

      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null }],


      "storageKey": null }],


    "storageKey": null }],


  "type": "Viewer",
  "abstractKey": null };

// prettier-ignore
node /*: any*/.hash = '57408f235362c09e18e90877cbe309bc';

module.exports = node;
//# sourceMappingURL=EnsayoPublicList_Viewer.graphql.js.map