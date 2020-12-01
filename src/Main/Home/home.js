
import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Inicio from './inicio'
import Colors from '../../configs/colors'
import Chats from './Chats';


const root = createStackNavigator(
  {
    Inicio:{
      screen: Inicio,
      navigationOptions:{
      }
    },
    
    
    Chats:{
      screen:Chats,
      navigationOptions:{
        header:null
      }
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

const HomeScreen = createAppContainer(root);


export default HomeScreen;