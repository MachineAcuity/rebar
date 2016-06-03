/* @flow */

import urb_example_compendium_ViewerFields from '../../units/urb-example-compendium/graphql/type/_ViewerFields'
import urb_example_ensayo_ViewerFields from '../../units/urb-example-ensayo/graphql/type/_ViewerFields'
import urb_example_todo_ViewerFields from '../../units/urb-example-todo/graphql/type/_ViewerFields'
import urb_example_translaticiarum_ViewerFields from '../../units/urb-example-translaticiarum/graphql/type/_ViewerFields'


export default {
  ...urb_example_compendium_ViewerFields,
  ...urb_example_ensayo_ViewerFields,
  ...urb_example_todo_ViewerFields,
  ...urb_example_translaticiarum_ViewerFields,
}
