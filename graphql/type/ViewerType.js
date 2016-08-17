/* @flow weak */

import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql"
import { globalIdField } from "graphql-relay"

import defaultPersister from '../../configuration/graphql/defaultPersister'
import NodeInterface from "../NodeInterface"
import _ViewerFields from "../../configuration/graphql/_ViewerFields"
import User from '../../configuration/graphql/model/User'


const Uuid_0 = defaultPersister.uuidFromString( '00000000-0000-0000-0000-000000000000' )

export default new GraphQLObjectType( {
  name: 'Viewer',
  interfaces: [ NodeInterface ],
  isTypeOf: object => object instanceof User,
  fields: {
    id: globalIdField( 'Viewer' ),

    User_IsAnonymous:        { type: GraphQLBoolean, resolve: ( obj ) => defaultPersister.uuidEquals( obj.id, Uuid_0 ) },
    User_AccountName:        { type: GraphQLString,  resolve: ( obj ) => obj.User_AccountName },
    User_DisplayName:        { type: GraphQLString,  resolve: ( obj ) => obj.User_DisplayName },
    User_ProfilePhoto:       { type: GraphQLString,  resolve: ( obj ) => obj.User_ProfilePhoto },
    User_Email:              { type: GraphQLString,  resolve: ( obj ) => obj.User_Email },
    User_PhoneNumberMobile:  { type: GraphQLString,  resolve: ( obj ) => obj.User_PhoneNumberMobile },
    User_Locale:             { type: GraphQLString,  resolve: ( obj ) => obj.User_Locale },
    UserToken2:              { type: GraphQLString,  resolve: ( obj ) => obj.UserToken2 },

    ..._ViewerFields,

  },
} )
