/* @flow weak */

import { globalIdField } from "graphql-relay";
import { GraphQLInt, GraphQLObjectType } from "graphql";

import GraphQLDateTime from "../../../../graphql/type/GraphQLDateTime";
import NodeInterface from "../../../../graphql/NodeInterface";

import Translaticiarum from '../model/Translaticiarum';

export default new GraphQLObjectType( {
  name: 'Translaticiarum',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Translaticiarum,
  fields: {
    id: globalIdField('Translaticiarum'),
    Translaticiarum_Date: { type: GraphQLDateTime, resolve: (obj) => obj.Translaticiarum_Date },
    Translaticiarum_Time: { type: GraphQLDateTime, resolve: (obj) => obj.Translaticiarum_Time },
    Translaticiarum_Type: { type: GraphQLInt, resolve: (obj) => obj.Translaticiarum_Type },
  },
} );
