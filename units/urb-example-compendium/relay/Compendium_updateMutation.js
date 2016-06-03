/* @flow weak */

import Relay from 'react-relay';

export default class Compendium_updateMutation extends Relay.Mutation
{
  static fragments = {
    Compendium: ( ) => Relay.QL`
      fragment on Compendium {
        id,
      }
    `,
  };
  getMutation( ) {
    return Relay.QL`mutation{Compendium_update}`;
  }
  getFatQuery( ) {
    return Relay.QL`
      fragment on Compendium_updatePayload {
        Compendium {
          Compendium_FirstTextInput,
          Compendium_RangedNumber,
          Compendium_Excitement,
          Compendium_FollowUpQuestion,
          Compendium_FavoriteMammal,
          Compendium_FavoriteMammalOtherText,
          Compendium_LastText,
          Compendium_LikedSunset_Ocean,
          Compendium_LikedSunset_Lake,
          Compendium_LikedSunset_Mountains,
          Compendium_LikedSunset_Plains,
          Compendium_LikedSunset_Purple,
          Compendium_LikedSunset_Green,
          Compendium_LikedSunset_Other,
          Compendium_LikedSunset_OtherText,
        }
      }
    `;
  }
  getConfigs( ) {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        Compendium: this.props.Compendium.id,
      },
    }];
  }
  getVariables( ) {
    return {
      id:                                 this.props.Compendium.id,
      Compendium_FirstTextInput:          this.props.Compendium_FirstTextInput,
      Compendium_RangedNumber:            this.props.Compendium_RangedNumber,
      Compendium_Excitement:              this.props.Compendium_Excitement,
      Compendium_FollowUpQuestion:        this.props.Compendium_FollowUpQuestion,
      Compendium_FavoriteMammal:          this.props.Compendium_FavoriteMammal,
      Compendium_FavoriteMammalOtherText: this.props.Compendium_FavoriteMammalOtherText,
      Compendium_LastText:                this.props.Compendium_LastText,
      Compendium_LikedSunset_Ocean:       this.props.Compendium_LikedSunset_Ocean,
      Compendium_LikedSunset_Lake:        this.props.Compendium_LikedSunset_Lake,
      Compendium_LikedSunset_Mountains:   this.props.Compendium_LikedSunset_Mountains,
      Compendium_LikedSunset_Plains:      this.props.Compendium_LikedSunset_Plains,
      Compendium_LikedSunset_Purple:      this.props.Compendium_LikedSunset_Purple,
      Compendium_LikedSunset_Green:       this.props.Compendium_LikedSunset_Green,
      Compendium_LikedSunset_Other:       this.props.Compendium_LikedSunset_Other,
      Compendium_LikedSunset_OtherText:   this.props.Compendium_LikedSunset_OtherText,
    };
  }
  getOptimisticResponse( ) {
    return {
      Compendium: {
        id: this.props.Compendium.id,
        Compendium_FirstTextInput:          this.props.Compendium_FirstTextInput,
        Compendium_RangedNumber:            this.props.Compendium_RangedNumber,
        Compendium_Excitement:              this.props.Compendium_Excitement,
        Compendium_FollowUpQuestion:        this.props.Compendium_FollowUpQuestion,
        Compendium_FavoriteMammal:          this.props.Compendium_FavoriteMammal,
        Compendium_FavoriteMammalOtherText: this.props.Compendium_FavoriteMammalOtherText,
        Compendium_LastText:                this.props.Compendium_LastText,
        Compendium_LikedSunset_Ocean:       this.props.Compendium_LikedSunset_Ocean,
        Compendium_LikedSunset_Lake:        this.props.Compendium_LikedSunset_Lake,
        Compendium_LikedSunset_Mountains:   this.props.Compendium_LikedSunset_Mountains,
        Compendium_LikedSunset_Plains:      this.props.Compendium_LikedSunset_Plains,
        Compendium_LikedSunset_Purple:      this.props.Compendium_LikedSunset_Purple,
        Compendium_LikedSunset_Green:       this.props.Compendium_LikedSunset_Green,
        Compendium_LikedSunset_Other:       this.props.Compendium_LikedSunset_Other,
        Compendium_LikedSunset_OtherText:   this.props.Compendium_LikedSunset_OtherText,
      },
    };
  }
}
