import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import ChatList from './chatList';
import ChatScreen from './chatScreen';
const Root = createStackNavigator({
  ChatList: {
    screen: ChatList,
    navigationOptions:({navigation})=>{
      return {
        headerTitle:'Inbox',
        headerTitleStyle:{color:'#fff'},
        headerLeftContainerStyle:{paddingLeft:20},
        headerLeft:<Icon 
            onPress={()=>navigation.navigate('Inicio')}
            name='arrow-back'
            color='#fff'
            style={{paddingLeft:20, marginLeft:20}}>
            </Icon>
      }
    }
  },
  ChatScreen: {
    screen: ChatScreen,
    
  },
  
  
},{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: '#470091',
      headerTitleStyle:{
        color:'#fff'
      }
    },
  }
});

const Chats = createAppContainer(Root);
export default Chats;