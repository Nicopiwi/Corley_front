//MainNav Level

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ForeignProfile from './foreignUserProfile';
import ForeignProducts from './foreignUserProducts';
const Root = createStackNavigator({
  ForeignProfile: {
    screen: ForeignProfile,
    navigationOptions:{
      headerTransparent:true
    }
  },
  ForeignProducts: {
    screen: ForeignProducts
  }
  
}, {defaultNavigationOptions:{
  headerTransparent:true}});

const ForeignNav = createAppContainer(Root);
export default ForeignNav;