import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SettingsScreen from './settings'
import Colors from '../../configs/colors'
import AppSettingsScreen from './appSettings';
import ChangePassword from './changePassword';
import UserDataScreen from './changeUserData';
import MyPosts from './myPosts';


const root = createStackNavigator(
  {

    Settings:{
      screen: SettingsScreen,
      navigationOptions:{
        headerTransparent:true
      }
    },
    AppSettings:{
      screen: AppSettingsScreen,
      navigationOptions:{
        headerTitle:'Configuración'
      }
      
    },
    UserData:{
      screen: UserDataScreen,
      headerTitle:'Cambiar datos del usuario'
    },
    MyPosts:{
      screen: MyPosts,
    },
    Password:{
      screen: ChangePassword,
    }
    
  }, {
  activeTintColor:Colors.primary,
  inactiveTintColor:'grey',
  indicatorStyle:{backgroundColor:Colors.lightBlue},
}
);

const SettingsMain = createAppContainer(root);


export default SettingsMain;
  