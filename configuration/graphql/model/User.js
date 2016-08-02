// Class used by GraphQL Server
export default class User
{
  constructor( fields )
  {
    this.id = fields.id
    this.User_AccountName = fields.User_AccountName
    this.User_AccountPassword = fields.User_AccountPassword
    this.User_DisplayName = fields.User_DisplayName
    this.User_ProfilePhoto = fields.User_ProfilePhoto
    this.User_Email = fields.User_Email
    this.User_PhoneNumberMobile = fields.User_PhoneNumberMobile
    this.User_Locale = fields.User_Locale
    this.UserToken2 = fields.UserToken2
  }
}
