import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements'
import axios from 'axios'
import APIs from '../../data_apis';
import { StackActions, NavigationActions } from 'react-navigation';

const resetForm = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Settings'})],
});
export default class UserDataScreen extends Component {
  constructor(){
    super()
    this.state={usuario:{}, nombre: '',apellido: '', pais:''}
  }
  async componentDidMount(){
    let googleTok=await AsyncStorage.getItem('googleToken')
    let userId=await AsyncStorage.getItem('userId')
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth,
    }
    axios.defaults.withCredentials=true;
    axios.get(userId)
    .then(response=>{
      console.log(JSON.stringify(response))
      this.setState({usuario:response.data, 
         nombre:response.data.first_name,
         apellido:response.data.last_name,
         pais: response.data.profile.country,
        })
    })
    .catch(e=>console.log(e))
  }
  async changeUserData(){
    var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
    RCTNetworking.clearCookies(()=>{});
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth
    }

//Todo: cambiar los keys de email y password para que no esten hardcodeados. 
//Ademas, implementar el reset de react navigation, para que vuelva a llamar a la api

    var newData={
      first_name:this.state.nombre,
      last_name:this.state.apellido,
      
    }
  
   await axios.patch(this.state.usuario.url, 
        newData
   )
    .then(response=>{
      console.log(JSON.stringify(response))
      this.props.navigation.dispatch(resetForm)
    })
    .catch(e=>{
      //alert('Error en el servidor')
      console.log(e)
    })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Input
          label="Nombre"
          value={this.state.nombre}
          onChangeText={(text)=>{this.setState({nombre:text})}}
        />
        <Input
          label="Apellido"
          value={this.state.apellido}
          onChangeText={(text)=>{this.setState({apellido:text})}}
        />
        <Input
          label="Pais"
          value={this.state.pais}
          onChangeText={(text)=>{this.setState({pais:text})}}
        />
        
        <Button
          icon={{
            type:'font-awesome',
            name: "chevron-right",
            size: 15,
            color: "white"
          }}
          title="Guardar Usuario"
          onPress={()=>this.changeUserData()}
      />
      </View>
    );
  }
}

