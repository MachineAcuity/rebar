



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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null };

  return {
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




    "name": "EnsayoInPaceEditList_Viewer",
    "selections": [
    {
      "alias": "Ensayos",
      "args": null,
      "concreteType": "EnsayosConnection",
      "kind": "LinkedField",
      "name": "__EnsayoList_Ensayos_connection",
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
          v0 /*: any*/,
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null },

          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EnsayoInPlaceEditItem_Ensayo" }],


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


      "storageKey": null },

    v0 /*: any*/,
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EnsayoInPlaceEditItem_Viewer" }],


    "type": "Viewer" };

}();
// prettier-ignore
node /*: any*/.hash = '0264c9c908d073effc0c969d9ac3ecd2';

module.exports = node;
//# sourceMappingURL=EnsayoInPaceEditList_Viewer.graphql.js.map