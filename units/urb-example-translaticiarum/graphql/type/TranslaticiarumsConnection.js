/* @flow weak */

import {connectionDefinitions} from "graphql-relay";

import TranslaticiarumType from "./TranslaticiarumType";

export default connectionDefinitions( {
  name: 'Translaticiarums',
  nodeType: TranslaticiarumType,
} );
