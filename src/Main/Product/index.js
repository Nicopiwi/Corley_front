//MainNav Level
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements'
import ProductScreen from './productScreen';
import ProductSettings from './productSettings';
import OrderScreen from './orderScreen';
import OrderList from './ordersList';
import ChoosePaymentMethod from './choosePaymentMethod';
import CardData from "./cardData";
import AcceptReject from './acceptReject'
import EndPayment from './endPayment'
import WaitForOwner from './waitForOwner'

const Root = createStackNavigator({
  ProductScreen: {
    screen: ProductScreen,
    navigationOptions:{
        header:null
    }
  },
  ProductSettings: {
    screen: ProductSettings,
    navigationOptions:{
      headerTransparent:true
    }
  },
  
  OrderScreen:{
    screen:OrderScreen,
    navigationOptions:{
      headerTransparent:true
    }
  },
  OrderList:{
    screen:OrderList,
  },
  ChoosePaymentMethod:{
    screen:ChoosePaymentMethod,
    navigationOptions:{
      headerTransparent:true
    }
  },

  CardData:{
    screen: CardData,
    navigationOptions:{
      headerTransparent:true
    }
  },

  AcceptReject:{
    screen:AcceptReject,
    navigationOptions:{
      headerTransparent:true
    }
  },

  EndPayment:{
    screen:EndPayment,
    navigationOptions:{
      headerTransparent:true
    }
  },

  WaitForOwner:{
    screen:WaitForOwner,
    navigationOptions:{
      headerTransparent:true
    }
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerTransparent:true,
      headerRight:(<Button 
         onPress={()=>navigation.navigate('ProductScreen')}
         buttonStyle={{backgroundColor:'transparent'}}  icon={{name:'close', color:'#8a8a8a'}}>
     </Button>)
    }
    
  }
});


const ProductNav = createAppContainer(Root);
export default ProductNav;