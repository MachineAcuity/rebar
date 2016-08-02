'use strict';

import React, {
  AppRegistry,
} from 'react-native';

import ApplicationMain from './app/components/ApplicationMain';
import AppRegistryName from './configuration/app/AppRegistryName';


AppRegistry.registerComponent( AppRegistryName, ( ) => ApplicationMain );
