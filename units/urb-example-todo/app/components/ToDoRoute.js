'use strict';

import Relay from 'react-relay';

export default class ToDoScreenRoute extends Relay.Route {
  static paramDefinitions = {
    status: {required: false},
  };
  static queries = {
    Viewer: () => Relay.QL`query { Viewer }`,
  };
  static routeName = 'ToDoScreenRoute';
}
