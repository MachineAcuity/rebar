/* @flow weak */

import { globalIdField } from "graphql-relay";
import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLObjectType } from "graphql";

import NodeInterface from "../../../../graphql/NodeInterface";

import Compendium from '../model/Compendium';


export default new GraphQLObjectType( {
  name: 'Compendium',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Compendium,
  fields: {
    id: globalIdField( 'Compendium' ),
    Compendium_FirstTextInput:          { type: GraphQLString,  resolve: (obj) => obj.Compendium_FirstTextInput },
    Compendium_RangedNumber:            { type: GraphQLInt,     resolve: (obj) => obj.Compendium_RangedNumber },
    Compendium_Excitement:              { type: GraphQLInt,     resolve: (obj) => obj.Compendium_Excitement },
    Compendium_FollowUpQuestion:        { type: GraphQLString,  resolve: (obj) => obj.Compendium_FollowUpQuestion },
    Compendium_FavoriteMammal:          { type: GraphQLInt,     resolve: (obj) => obj.Compendium_FavoriteMammal },
    Compendium_FavoriteMammalOtherText: { type: GraphQLString,  resolve: (obj) => obj.Compendium_FavoriteMammalOtherText },
    Compendium_LastText:                { type: GraphQLString,  resolve: (obj) => obj.Compendium_LastText },
    Compendium_LikedSunset_Ocean:       { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Ocean },
    Compendium_LikedSunset_Lake:        { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Lake },
    Compendium_LikedSunset_Mountains:   { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Mountains },
    Compendium_LikedSunset_Plains:      { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Plains },
    Compendium_LikedSunset_Purple:      { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Purple },
    Compendium_LikedSunset_Green:       { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Green },
    Compendium_LikedSunset_Other:       { type: GraphQLBoolean, resolve: (obj) => obj.Compendium_LikedSunset_Other },
    Compendium_LikedSunset_OtherText:   { type: GraphQLString,  resolve: (obj) => obj.Compendium_LikedSunset_OtherText },
  },
} );
