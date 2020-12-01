import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ProductNav from './Product';
import MainScreen from './mainScreen';
import ForeignNav from './UsuarioAjeno'
import OrderStage from './OrderStage'
const Root = createStackNavigator({
  
  MainScreen:{
    screen:MainScreen,
    navigationOptions:{header:null}
  },
  Product: {
    screen: ProductNav,
    navigationOptions:{header:null}
  },
  ForeignNav:{
    screen: ForeignNav,
    navigationOptions:{header:null}
  },
  OrderStage:{
    screen:OrderStage,
    navigationOptions:{header:null}
  }
  
  
});

const MainNav = createAppContainer(Root);
export default MainNav;