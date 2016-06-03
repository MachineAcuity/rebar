/* @flow weak */

const AccountNameLengthMin = 4
const AccountPasswordLengthMin = 4
const AccountPasswordStrengthMin = 30
const AccountPasswordStrengthGood = 80
const AccountNameAlias = "Account Name"

function AccountNameAdditionalValidation( )
{
  return true
}

export
{
  AccountNameLengthMin,
  AccountPasswordLengthMin,
  AccountPasswordStrengthMin,
  AccountPasswordStrengthGood,
  AccountNameAlias,
  AccountNameAdditionalValidation,
}
