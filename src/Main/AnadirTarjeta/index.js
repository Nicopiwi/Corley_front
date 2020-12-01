import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const Root = createStackNavigator({
 
  
}, {headerMode:'none'});

const CardNav = createAppContainer(Root);
export default CardNav;