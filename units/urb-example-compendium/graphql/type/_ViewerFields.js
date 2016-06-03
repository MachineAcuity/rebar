/* @flow weak */

import { connectionArgs, connectionFromArray } from "graphql-relay";

import CompendiumsConnection from "./CompendiumsConnection";
import Compendium_getListOrCreate from "../helper/Compendium_getListOrCreate";


export default {
  compendiums: {
    type: CompendiumsConnection.connectionType,
    args: { ...connectionArgs },
    resolve: ( obj, { ...args }, context, { rootValue: objectManager } ) => Compendium_getListOrCreate( objectManager ).then( ( arr ) => connectionFromArray( arr, args ) )
  },
}
