import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import GatherWith from './gatherWith'
import InsertCode from './insertCode';
import ShowCode from './showCode'
import Ratings from './ratings'

const Root = createStackNavigator({
  GatherWith:{
    screen: GatherWith,
    navigationOptions:{
      header:null
    }
  },

  InsertCode:{
    screen: InsertCode,
    navigationOptions:{
      headerTransparent:true
    }
  },

  ShowCode:{
    screen: ShowCode,
    navigationOptions:{
      headerTransparent:true
    }
  },

  Ratings:{
    screen: Ratings,
    navigationOptions:{
      headerTransparent:true
    }
  },
  /*
  AcceptReject:{
    screen:AcceptReject,
    navigationOptions:{
      headerTransparent:true
    }
  }
  */
});


const OrderStage = createAppContainer(Root);
export default OrderStage;