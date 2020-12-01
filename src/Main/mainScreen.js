import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { StatusBar, SafeAreaView, View, AsyncStorage, Image} from 'react-native'
import { Badge, Icon, withBadge } from 'react-native-elements'
import { Button } from 'react-native-elements';
import HomeScreen from './Home/home';
import NotificationsScreen from './Notifications/index';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../configs/colors'
import SettingsMain from './Settings';
import Search from './search';
import PublishScreen from './Publish/index'


async function returnBadge(color){
  try{
    var numberOfNots = await AsyncStorage.getItem('numberOfNots')
    if (numberOfNots>0){
      const BadgedIcon = withBadge(numberOfNots)(Icon)
      return <BadgedIcon type="ionicon" name="md-notifications" color={color}/>
    }
    else{
      return <Ionicons name={'md-notifications'} size={24} color={color}></Ionicons>
    }
  }
  catch(e){
    return (<Ionicons name={'md-notifications'} size={24} color={color}></Ionicons>)
  }
  
}

async function returnBadgei(color){
  
    return (<Ionicons name={'md-notifications'} size={24} color={color}></Ionicons>)

  
}
const root = createBottomTabNavigator(
  {
    Home: {
        screen: HomeScreen,
        navigationOptions:{
          tabBarIcon:({tintColor})=>(
            <Image source={require('../../assets/Icons/Home.png')} style={{height:24, width:24, tintColor: tintColor}}/>
          ),
          header:null,
        }
    },
    Search:{
      screen: Search,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <Image source={require('../../assets/Icons/Search.png')} style={{height:24, width:24, tintColor: tintColor}}/>
        ),
        header:null,
      }
  },
  Publish:{
    screen:PublishScreen,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(
        <Image source={require('../../assets/Icons/Add.png')} style={{height:24, width:24, tintColor: tintColor}}/>
      ),
      tabBarVisible:false,
      headerTransparent:true,
      
    }
},
    Notifications:{
      screen: NotificationsScreen,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <Image source={require('../../assets/Icons/Notifications.png')} style={{height:24, width:24, tintColor: tintColor}}/>
        ),
        header:null,
      }
    },
    
    
    SettingsMain:{
        screen: SettingsMain,
        navigationOptions:{
          tabBarIcon:({tintColor})=>(
            <Ionicons name={'md-person'} size={24} color={tintColor}></Ionicons>
          ),
          header:null,
        }
    },

    

  }, {
  defaultNavigationOptions:{
    tabBarLabel:<View></View>,
  },
  tabBarOptions:{
    activeTintColor:Colors.background,
    inactiveTintColor:'#A9A9A9',
    initialRouteName:'SettingsMain',
    style:{
      backgroundColor:'#470091'
    }
  }
}
);

const MainScreen = createAppContainer(root);
export default MainScreen;