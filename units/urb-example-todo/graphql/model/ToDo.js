import ObjectManager from '../../../../graphql/ObjectManager'

// Class used by GraphQL Server
export default class ToDo
{
  constructor( fields )
  {
    this.id = fields.id;
    this.ToDo_User_id = fields.ToDo_User_id;
    this.ToDo_Text = fields.ToDo_Text;
    this.ToDo_Complete = fields.ToDo_Complete;
  }
}

ObjectManager.registerEntity( 'ToDo', ToDo )
