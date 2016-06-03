import React from 'react'
import { Scene } from 'react-native-router-flux'


import TabIcon from '../../app/components/TabIcon'

import ToDoScene from '../../units/urb-example-todo/app/components/ToDoScene'
import Login from '../../units/urb-account-management/app/components/Login'

export default function routes ( MenuButton )
{
  return <Scene key="main" tabs={true}>
    <Scene key="home_login" component={Login} title="Login" hideTabBar={true} icon={TabIcon} leftButton={MenuButton} initial={true}/>
    <Scene key="home_ToDo" component={ToDoScene} title="To Do" hideTabBar={true} icon={TabIcon} leftButton={MenuButton}/>
  </Scene>
}
