"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _ObjectManager = _interopRequireDefault(require("../../../../units/rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Class used by GraphQL Server
class UserAccount {





  // Secret / Passport





  constructor(fields)










  {
    this.id = fields.id;
    this.UserAccount_artifact_id = fields.UserAccount_artifact_id;
    this.UserAccount_User_id = fields.UserAccount_User_id;
    this.UserAccount_Identifier = fields.UserAccount_Identifier;
    this.UserAccount_Secret = fields.UserAccount_Secret;
    this.UserAccount_Type = fields.UserAccount_Type;
    this.UserAccount_created_by = fields.UserAccount_created_by;
    this.UserAccount_created_on = fields.UserAccount_created_on;
    this.UserAccount_modified_on = fields.UserAccount_modified_on;
    this.UserAccount_modified_by = fields.UserAccount_modified_by;
  }}exports.default = UserAccount;


_ObjectManager.default.registerEntity('UserAccount', UserAccount, {});
//# sourceMappingURL=UserAccount.js.map