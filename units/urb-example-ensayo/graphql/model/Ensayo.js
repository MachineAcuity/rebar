import ObjectManager from '../../../../graphql/ObjectManager'

// Class used by GraphQL Server
export default class Ensayo
{
  constructor( fields )
  {
    this.id = fields.id;
    this.Ensayo_User_id = fields.Ensayo_User_id;
    this.Ensayo_Title = fields.Ensayo_Title;
    this.Ensayo_Description = fields.Ensayo_Description;
    this.Ensayo_Content = fields.Ensayo_Content;
  }
}

ObjectManager.registerEntity( 'Ensayo', Ensayo )
