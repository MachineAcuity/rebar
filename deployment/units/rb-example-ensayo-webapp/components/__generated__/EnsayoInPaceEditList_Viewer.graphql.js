



/* eslint-disable */

'use strict';

/*::
              import type { ReaderFragment } from 'relay-runtime';
              type EnsayoInPlaceEditItem_Ensayo$ref = any;
              type EnsayoInPlaceEditItem_Viewer$ref = any;
              import type { FragmentReference } from "relay-runtime";
              declare export opaque type EnsayoInPaceEditList_Viewer$ref: FragmentReference;
              declare export opaque type EnsayoInPaceEditList_Viewer$fragmentType: EnsayoInPaceEditList_Viewer$ref;
              export type EnsayoInPaceEditList_Viewer = {|
                +Ensayos: ?{|
                  +edges: ?$ReadOnlyArray<?{|
                    +node: ?{|
                      +id: string,
                      +$fragmentRefs: EnsayoInPlaceEditItem_Ensayo$ref,
                    |}
                  |}>
                |},
                +id: string,
                +$fragmentRefs: EnsayoInPlaceEditItem_Viewer$ref,
                +$refType: EnsayoInPaceEditList_Viewer$ref,
              |};
              export type EnsayoInPaceEditList_Viewer$data = EnsayoInPaceEditList_Viewer;
              export type EnsayoInPaceEditList_Viewer$key = {
                +$data?: EnsayoInPaceEditList_Viewer$data,
                +$fragmentRefs: EnsayoInPaceEditList_Viewer$ref,
                ...
              };
              */


const node /*: ReaderFragment*/ = function () {
  var v0 = {
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
    "args": null,
    "storageKey": null };

  return {
    "kind": "Fragment",
    "name": "EnsayoInPaceEditList_Viewer",
    "type": "Viewer",
    "metadata": {
      "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
        "Ensayos"] }] },




    "argumentDefinitions": [],
    "selections": [
    {
      "kind": "LinkedField",
      "alias": "Ensayos",
      "name": "__EnsayoList_Ensayos_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "EnsayosConnection",
      "plural": false,
      "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "EnsayosEdge",
        "plural": true,
        "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Ensayo",
          "plural": false,
          "selections": [
          v0 /*: any*/,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null },

          {
            "kind": "FragmentSpread",
            "name": "EnsayoInPlaceEditItem_Ensayo",
            "args": null }] },



        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cursor",
          "args": null,
          "storageKey": null }] },



      {
        "kind": "LinkedField",
        "alias": null,
        "name": "pageInfo",
        "storageKey": null,
        "args": null,
        "concreteType": "PageInfo",
        "plural": false,
        "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "endCursor",
          "args": null,
          "storageKey": null },

        {
          "kind": "ScalarField",
          "alias": null,
          "name": "hasNextPage",
          "args": null,
          "storageKey": null }] }] },





    v0 /*: any*/,
    {
      "kind": "FragmentSpread",
      "name": "EnsayoInPlaceEditItem_Viewer",
      "args": null }] };



}();
// prettier-ignore
node /*: any*/.hash = '0264c9c908d073effc0c969d9ac3ecd2';
module.exports = node;
//# sourceMappingURL=EnsayoInPaceEditList_Viewer.graphql.js.map