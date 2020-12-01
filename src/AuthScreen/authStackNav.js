import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import RegisterScreen from './register';
import LoginScreen from './login';
import Welcome from './welcome';
import ForgotPassword from './forgotPassword'
import Colors from '../configs/colors';
import SecondRegisterScreen from './secondRegister';
const transparentHeader = {
  position: 'absolute',
  backgroundColor: 'transparent',
  zIndex: 100,
  top: 0,
  left: 0,
  borderBottomWidth:0,
  right: 0
};
const root = createStackNavigator({
  
  Welcome: {
    screen: Welcome,
    navigationOptions: {header: null}
  }, 
  
  Login: {
    screen: LoginScreen,

    navigationOptions: {headerTransparent:true
      
    }},
  
  Register: {
    screen: RegisterScreen,
    navigationOptions: {headerTransparent:true
      
    }
  },
  SecondRegister:{
    screen: SecondRegisterScreen,
    navigationOptions: {headerTransparent:true
      
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions:{headerTransparent:true
      
      } 
      
  }
  
  
}, {defaultNavigationOptions:{
  initialRouteName:'Welcome',
  gesturesEnabled:true,
  headerTintColor:'#fff',
  headerBackgroundTransitionPreset:'translate'

}
});

const AuthScreen = createAppContainer(root);
export default AuthScreen;