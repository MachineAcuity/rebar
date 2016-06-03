/* @flow weak */

import { connectionDefinitions } from "graphql-relay";

import CompendiumType from "./CompendiumType";

export default connectionDefinitions( {
  name: 'Compendiums',
  nodeType: CompendiumType,
} );
