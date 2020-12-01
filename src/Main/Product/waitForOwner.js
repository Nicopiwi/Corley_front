import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Image, Button, Icon } from 'react-native-elements'
import { NavigationActions, StackActions } from 'react-navigation';
const {width, height} = Dimensions.get('screen')

export default class WaitForOwner extends Component {

  constructor(){
    super()
  }

  static navigationOptions = ({navigation})=>{
    return{
        headerLeft: null,
      headerRight: (<Icon 
        onPress={()=>navigation.dispatch(goToProduct)}
        name='close' color="#e5e5e5" containerStyle={{paddingRight:12}}>
        </Icon>),
      
    }
  }

  componentDidMount(){
    console.log(this.props.navigation.state.params)
  }
goToProduct = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
});
_handleBack(){
  this.props.navigation.navigate('ProductScreen')
}

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor:'#e5e5e5' }}>
        <Icon 
        onPress={()=>this.props.navigation.dispatch(this.goToProduct)}
        name='close' color="#4a4a4a" containerStyle={{paddingRight:12, position:'absolute', right:20, top:20}}>
        </Icon>
        <View style={{alignItems:'center', marginTop:90}}>
              <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Esperá a la aceptación del dueño!</Text>
              <Image source={require('../../../assets/sentOrder.png')} containerStyle={{width:309, height:240, marginTop:30}}></Image>
              <View style={{width:200, marginTop:20}}>
              <Text style={{fontSize:18, textAlign:'center'}}>El dueño podrá aceptar o rechazar tu petición</Text>
              </View>
              <Button title="Aceptar" onPress={()=>this.props.navigation.dispatch(this.goToProduct)} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
        </View>
      </View>
    );
  }
}