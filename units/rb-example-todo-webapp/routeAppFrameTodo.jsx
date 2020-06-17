// @flow

import Route from 'found/Route'
import Async from 'react-code-splitting'
import { graphql } from 'react-relay'
import React from 'react'

const ToDoList = (props) => <Async load={import('./components/ToDoList')} componentProps={props} />

const ToDoScreen = (props) => (
  <Async load={import('./components/ToDoScreen')} componentProps={props} />
)

const ToDoListQuery = graphql`
  query routeAppFrameTodo_ToDoList_Query($status: String!) {
    Viewer {
      ...ToDoList_Viewer
    }
  }
`

export default (
  <Route
    key="todo"
    path="todo"
    Component={ToDoScreen}
    query={graphql`
      query routeAppFrameTodo_ToDoScreen_Query {
        Viewer {
          ...ToDoScreen_Viewer
        }
      }
    `}
  >
    <Route
      Component={ToDoList}
      query={ToDoListQuery}
      prepareVariables={(params) => ({ ...params, status: 'any' })}
    />
    <Route path=":status" Component={ToDoList} query={ToDoListQuery} />
  </Route>
)
