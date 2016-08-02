import React from 'react'
import { Scene } from 'react-native-router-flux'

import ViewerQuery from '../../app/ViewerQuery'

import Login from '../../units/urb-account-management/app/components/Login'
import ToDoScreen from '../../units/urb-example-todo/app/components/ToDoScreen'


export default function routes ( MenuButton )
{
  return(
    <Scene key="main" tabs hideTabBar>
      <Scene key="home_login" title="Login" component={ Login } leftButton={ MenuButton } />
      <Scene key="home_ToDo" leftButton={ MenuButton }>
        <Scene key="home_ToDo_List" title="To Do" component={ ToDoScreen } queries={ ViewerQuery } />
      </Scene>
    </Scene>
  )
}
