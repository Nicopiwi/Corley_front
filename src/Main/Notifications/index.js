import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

import Otros from './otros'
import MisPublicaciones from './posts'
import Colors from '../../configs/colors'


const root = createStackNavigator(
  {
    MisPublicaciones:{
      screen: MisPublicaciones,
    },
    Otros:{
      screen:Otros,
      
    }
  }, {
  
  activeTintColor:Colors.primary,
  inactiveTintColor:'grey',
  indicatorStyle:{backgroundColor:Colors.lightBlue},
  style:{
    paddingTop:(Platform.OS==='android')?StatusBar.currentHeight:0,
  },
}
);

const NotificationsClass = createAppContainer(root);


export default class NotificationsScreen extends React.Component{
  render(){
    return(
    <SafeAreaView style={{flex:1}}>
      <NotificationsClass/>
    </SafeAreaView>);
  }
}