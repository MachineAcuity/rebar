import ObjectManager from '../../../../graphql/ObjectManager'

// Class used by GraphQL Server
export default class Translaticiarum
{
  constructor( fields )
  {
    this.id = fields.id;
    this.Translaticiarum_User_id = fields.Translaticiarum_User_id;
    this.Translaticiarum_Date = fields.Translaticiarum_Date;
    this.Translaticiarum_Time = fields.Translaticiarum_Time;
    this.Translaticiarum_Type = fields.Translaticiarum_Type;
  }
}

ObjectManager.registerEntity( 'Translaticiarum', Translaticiarum )
