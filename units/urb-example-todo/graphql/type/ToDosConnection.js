/* @flow weak */

import {connectionDefinitions} from "graphql-relay";

import ToDoType from "./ToDoType";

export default connectionDefinitions( {
  name: 'ToDos',
  nodeType: ToDoType,
} );
