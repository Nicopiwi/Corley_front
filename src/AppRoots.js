import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AsyncStorage } from 'react-native'
import AuthScreen from './AuthScreen/authStackNav';
import Loading from './loading';
import MainNav from './Main/mainNav';


const Root = createSwitchNavigator({
  Authentification: {
    screen: AuthScreen,
    navigationOptions: {header: null}
  },
  
  Main: {
    screen: MainNav,
    navigationOptions: {
      header:null
    },
  },
  Loading: {
    screen: Loading,
    navigationOptions: {
      header:null
    },
  },
  
}, {
  initialRouteName: 'Loading',
});

//const AppRoots = createAppContainer(root);
const AppRoots = createAppContainer(Root);
export default AppRoots;