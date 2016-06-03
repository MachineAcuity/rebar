import Compendium from '../model/Compendium'

export default function Compendium_getListOrCreate( objectManager )
{
  return objectManager.getListBy( 'Compendium', 'Compendium_User_id', objectManager.getViewerUserId( ) )
  .then( ( arr ) => {
    if( arr.length > 0 )
      return arr;
    else
    {
      const compendium = new Compendium( {
        Compendium_User_id: objectManager.getViewerUserId( ),
        Compendium_FirstTextInput: "",
        Compendium_RangedNumber: 0,
        Compendium_Excitement: 0,
        Compendium_FollowUpQuestion: "",
        Compendium_FavoriteMammal: 0,
        Compendium_FavoriteMammalOtherText: "",
        Compendium_LastText: "",
        Compendium_LikedSunset_Ocean: false,
        Compendium_LikedSunset_Lake: false,
        Compendium_LikedSunset_Mountains: false,
        Compendium_LikedSunset_Plains: false,
        Compendium_LikedSunset_Purple: false,
        Compendium_LikedSunset_Green: false,
        Compendium_LikedSunset_Other: false,
        Compendium_LikedSunset_OtherText: "",
      } );

      return objectManager.add( 'Compendium', compendium )
      .then( ( local_id ) => {
        compendium.id = local_id;
        return [ compendium ];
      } )
    }
  } )
  ;
}
