/* @flow */

import urb_account_management_mutations from '../../units/urb-account-management/graphql/mutation/_mutations'

import urb_example_compendium_mutations from '../../units/urb-example-compendium/graphql/mutation/_mutations'
import urb_example_ensayo_mutations from '../../units/urb-example-ensayo/graphql/mutation/_mutations'
import urb_example_todo_mutations from '../../units/urb-example-todo/graphql/mutation/_mutations'
import urb_example_translaticiarum_mutations from '../../units/urb-example-translaticiarum/graphql/mutation/_mutations'


export default {
  ...urb_account_management_mutations,

  ...urb_example_compendium_mutations,
  ...urb_example_ensayo_mutations,
  ...urb_example_todo_mutations,
  ...urb_example_translaticiarum_mutations,
}
