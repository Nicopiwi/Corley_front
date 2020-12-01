import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Image, Button, Icon } from 'react-native-elements'
import { NavigationActions, StackActions } from 'react-navigation';
const {width, height} = Dimensions.get('window')

codigo = '123456'

export default class ShowCode extends React.Component {
    constructor(){
        super(props)
        this.state = {codigo: '123456'}
    }
    goToMain = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
    });

  _textToShow(){
    if (this.props.navigation.getParam('isOwner')){
      return 'Muéstrale a tu cliente el siguiente código. Es el que debe ingresar para recibir el producto'
    }
    else{
      return 'Este es el código que deberás mostrar al dueño una vez que se lo devuelvas. A partir de ahí termina la transacción.'
    }
  }

    componentDidMount(){
        if (this.props.navigation.getParam('isOwner')){
            this.setState({codigo:this.props.navigation.getParam('tokenData').token_owner})
        }
        else{
            this.setState({codigo:this.props.navigation.getParam('tokenData').token_client})
        }
    }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor:'#e5e5e5' }}>
        <Icon 
        onPress={()=>console.log('hola')}
        name='close' color="#4a4a4a" containerStyle={{paddingRight:12, position:'absolute', right:20, top:30}}>
        </Icon>
        <View style={{alignItems:'center', marginTop:90}}>
              <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Orden de producto</Text>
              <View style={{width:200, marginTop:120, alignItems:'center'}}>
              <Text style={{fontSize:18, textAlign:'center', fontWeight:'bold', color:'#8a8a8a'}}>Código de orden</Text>
                <View style={{marginTop:25, flexDirection:'row'}}>
                  <Text style={{fontSize:40, fontWeight:'bold', color:'#7B38C2'}}>{this.state.codigo[0]}</Text>
                  <Text style={{fontSize:40, marginLeft:15, fontWeight:'bold', color:'#7B38C2'}}>{this.state.codigo[1]}</Text>
                  <Text style={{fontSize:40, marginLeft:15, fontWeight:'bold', color:'#7B38C2'}}>{this.state.codigo[2]}</Text>
                  <Text style={{fontSize:40, marginLeft:15, fontWeight:'bold', color:'#7B38C2'}}>{this.state.codigo[3]}</Text>
                  <Text style={{fontSize:40, marginLeft:15, fontWeight:'bold', color:'#7B38C2'}}>{this.state.codigo[4]}</Text>
                  <Text style={{fontSize:40, marginLeft:15, fontWeight:'bold', color:'#7B38C2'}}>{this.state.codigo[5]}</Text>
                </View>
    <Text style={{fontSize:18, color:'#000', textAlign:'center', width:width-80, marginTop:120, alignItems:'center'}}>{this._textToShow()}</Text>
              </View>

              <Button title="Cerrar" onPress={()=>this.props.navigation.dispatch(this.goToMain)} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:20}}></Button>
        </View>
      </View>
    );
  }
}
