/* @flow weak */

import { globalIdField } from "graphql-relay";
import { GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../../../../graphql/NodeInterface";

import Ensayo from '../model/Ensayo';

export default new GraphQLObjectType( {
  name: 'Ensayo',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Ensayo,
  fields: {
    id: globalIdField('Ensayo'),
    Ensayo_Title: { type: GraphQLString, resolve: (obj) => obj.Ensayo_Title },
    Ensayo_Description: { type: GraphQLString, resolve: (obj) => obj.Ensayo_Description },
    Ensayo_Content: { type: GraphQLString, resolve: (obj) => obj.Ensayo_Content },
  },
} );
