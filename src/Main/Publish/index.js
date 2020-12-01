import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { Button } from 'react-native-elements'
import { AsyncStorage } from 'react-native'

import PublishAddImage from './addImage'
import PublishDataGeneral from './addData'
import PublishDataFurther from './addFurther'

const resetForm = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen', params:{terminado:true} })],
});

const Root = createStackNavigator({
 PublishAddImage:{
   screen:PublishAddImage,
 },
 PublishDataGeneral:{
  screen:PublishDataGeneral,
},
PublishDataFurther:{
  screen: PublishDataFurther
}
  
  
}, {
  defaultNavigationOptions:({navigation})=>{return{
    headerTransparent:true,
    headerRight:
     
       <Button 
           onPress={()=>navigation.dispatch(resetForm)}
           buttonStyle={{backgroundColor:'transparent'}}  icon={{name:'close', color:'#8a8a8a'}}>
       </Button>
     
  }
}
});

//const AppRoots = createAppContainer(root);
const PublishScreen = createAppContainer(Root);
export default PublishScreen;