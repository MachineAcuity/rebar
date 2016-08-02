import ObjectManager from '../../../../graphql/ObjectManager'

// Class used by GraphQL Server
export default class PrimeNumber
{
  constructor( fields )
  {
    this.id = fields.id;
    this.PrimeNumber_NumericValue = fields.PrimeNumber_NumericValue;
    this.PrimeNumber_TextValue = fields.PrimeNumber_TextValue;
  }
}

ObjectManager.registerEntity( 'PrimeNumber', PrimeNumber )
