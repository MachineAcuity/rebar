import ObjectManager from '../../../../graphql/ObjectManager'

// Class used by GraphQL Server
export default class Compendium
{
  constructor( fields )
  {
    this.id = fields.id;
    this.Compendium_User_id = fields.Compendium_User_id;
    this.Compendium_FirstTextInput = fields.Compendium_FirstTextInput;
    this.Compendium_RangedNumber = fields.Compendium_RangedNumber;
    this.Compendium_Excitement = fields.Compendium_Excitement;
    this.Compendium_FollowUpQuestion = fields.Compendium_FollowUpQuestion;
    this.Compendium_FavoriteMammal = fields.Compendium_FavoriteMammal;
    this.Compendium_FavoriteMammalOtherText = fields.Compendium_FavoriteMammalOtherText;
    this.Compendium_LastText = fields.Compendium_LastText;
    this.Compendium_LikedSunset_Ocean = fields.Compendium_LikedSunset_Ocean;
    this.Compendium_LikedSunset_Lake = fields.Compendium_LikedSunset_Lake;
    this.Compendium_LikedSunset_Mountains = fields.Compendium_LikedSunset_Mountains;
    this.Compendium_LikedSunset_Plains = fields.Compendium_LikedSunset_Plains;
    this.Compendium_LikedSunset_Purple = fields.Compendium_LikedSunset_Purple;
    this.Compendium_LikedSunset_Green = fields.Compendium_LikedSunset_Green;
    this.Compendium_LikedSunset_Other = fields.Compendium_LikedSunset_Other;
    this.Compendium_LikedSunset_OtherText = fields.Compendium_LikedSunset_OtherText;
  }
}

ObjectManager.registerEntity( 'Compendium', Compendium )
