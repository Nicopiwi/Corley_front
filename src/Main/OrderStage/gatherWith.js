import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Image, Button, Icon } from 'react-native-elements'
import { NavigationActions, StackActions } from 'react-navigation';
const {width, height} = Dimensions.get('screen')

export default class GatherWith extends Component {

  constructor(props){
    super(props)
    this.state = {directState:1}
  }

  static navigationOptions = ({navigation})=>{
    return{
      headerRight: (<Icon 
        onPress={()=>navigation.dispatch(goToProduct)}
        name='close' color="#e5e5e5" containerStyle={{paddingRight:12}}>
        </Icon>),
      
    }
  }

  componentDidMount(){
    console.log(this.props.navigation.state.params)
    if (!this.props.navigation.getParam('isOwner') && this.props.navigation.getParam('orderData').state == "Producto reservado"){
      this.setState({directState:1})
    }
    else if (this.props.navigation.getParam('isOwner') && this.props.navigation.getParam('orderData').state == "Producto reservado"){
      this.setState({directState:2})
    }
    else if (!this.props.navigation.getParam('isOwner') && this.props.navigation.getParam('orderData').state == "Producto en uso"){
      this.setState({directState:3})
    }
    else if (this.props.navigation.getParam('isOwner') && this.props.navigation.getParam('orderData').state == "Producto en uso"){
      this.setState({directState:4})
    }
  }

  _textToShow(){
    switch(this.state.directState){
      case 1: 
        return 'Encontrate con el dueño para ingresar el código y recibir el producto!'
      case 2: 
        return 'Esperá a que el cliente venga a buscar tu producto. Haz click en Siguiente para ver el codigo!'
      case 3: 
        return 'Disfrutá del producto. Haz click en siguiente para ver el codigo que deberá ingresar el dueño!'
      case 4: 
        return 'Esperá a que el cliente devuelva tu producto. Haz click en Siguiente para ingresar el codigo!'
    }
  }

  _handleNext(directState){
    switch(this.state.directState){
      case 1:
        this.props.navigation.navigate('InsertCode', this.props.navigation.state.params)
        break;
      case 2:
        this.props.navigation.navigate('ShowCode', this.props.navigation.state.params)
        break;
      case 3:
          this.props.navigation.navigate('ShowCode', this.props.navigation.state.params)
          break;
      case 4:
          this.props.navigation.navigate('InsertCode', this.props.navigation.state.params)
          break;
    }
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
    <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>{this.props.navigation.getParam('isOwner')?'Esperá':'Reunite!'}</Text>
              <Image source={require('../../../assets/undraw_people_tax.png')} containerStyle={{width:309, height:240, marginTop:30}}></Image>
              <View style={{width:200, marginTop:20}}>
    <Text style={{fontSize:18, textAlign:'center'}}>{this._textToShow()}</Text>
              </View>
              <Button title="Siguiente" onPress={()=>this._handleNext(this.state.directState)} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
        </View>
      </View>
    );
  }
}

//<Image source={require('../../../assets/undraw_people_tax5 1.png')} containerStyle={{width:309, height:240, marginTop:30}}>