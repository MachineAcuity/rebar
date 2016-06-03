/* @flow weak */

import {connectionDefinitions} from "graphql-relay";

import EnsayoType from "./EnsayoType";

export default connectionDefinitions( {
  name: 'Ensayos',
  nodeType: EnsayoType,
} );
