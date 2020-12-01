import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput, AsyncStorage, KeyboardAvoidingView
} from 'react-native';
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import APIs from '../data_apis';
import * as Expo from 'expo';
import axios from 'axios';
import Constants from 'expo-constants'
import MyInputAuth from '../components/inputAuth'
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import StylesAuth from './styles/authForms'
const {height, width} = Dimensions.get('window')
export default class RegisterScreen extends Component {
  constructor(){
    super();
    this.state={
    
      email:'',
      name:'',
      surname:'',
      password_1:'',
      password_2:'',
      error_name:'',
      error_surname:'',
    error_email:'',
    error_p1:'',
    error_p2:'',
    onErrorName:false,
    onErrorSurname:false,
    onErrorEmail:false,
    onErrorPassword:false,
    loading:false,
    disabled:true
    }
  }
  
  handleName = (text) => {
    
    
    this.setState({name: text})
    if (text == ''){
      this.setState({error_name:'Complete este campo'})
    }
    else{
      this.setState({error_name:'', onErrorName:false})
    }
    
  }
  handleSurname = (text) => {
    
    
    this.setState({surname: text})
    if (text == ''){
      this.setState({error_surname:'Complete este campo'})
    }
    else{
      this.setState({error_surname:'', onErrorSurname:false})
    }
    
  }

  handleEmail = (text) => {
    
    
    this.setState({email: text})
    if (text == ''){
      this.setState({error_email:'Complete este campo'})
    }
    else{
      this.setState({error_email:'', onErrorEmail:false})
    }
    
  }
  
  handlePassword_one = (text) => {
     
    this.setState({password_1: text, onErrorPassword:false, error_p1:''})
    if (text == ''){
      this.setState({error_p1:'Complete este campo'})
    }
    else{
      this.setState({error_p1:''})
    }
  }
  handlePassword_two = (text) => {
      
    this.setState({password_2: text, onErrorPassword:false})
    if (text == ''){
      this.setState({error_p2:'Complete este campo'})
    }
    else if(text != this.state.password_1){
      this.setState({error_p2:'Las contraseñas no coinciden', onErrorPassword:true})
    }
    else{
      this.setState({error_p2:''})
    }
  }

  _irASiguiente = ()=>{
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) || this.state.name==='a'){
      this.props.navigation.navigate('SecondRegister', {
        first_name:this.state.name, 
        last_name:this.state.surname, 
        email: this.state.email, 
        password: this.state.password_1})
      }
      else if (this.state.email==='' || this.state.name==='' || this.state.surname==='' || this.state.password_1==='' || this.state.password_2===''  || this.state.password_1!==this.state.password_2){
        this.setState({error_name:'Complete o corrija los campos indicados'})
      }
    else{
      this.setState({onErrorEmail:true, error_email:'Introduzca un mail valido'})
    }
    
  }
  
  render() {
    
    return (
      
      <LinearGradient colors={['#2B0062', '#2B0263']}
       start={{ x: 0, y: 1 }}
       end={{ x: 1, y: 0 }}
       style={styles.container}>
       <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={-280} behavior="padding">
       <ScrollView style={{flex:1, padding:8}}>
        <View style={styles.content}>
         <View style={{width:229, height:130, marginLeft:40}}>
            <Text style={styles.titulo}>{`CREA UNA CUENTA EN CORLEY`}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <MyInputAuth placeholder="Nombre" 
              onChangeText={this.handleName}
              onError={this.state.onErrorName}
              terminarError={()=>this.setState({onErrorName:false, name:'', error_name:''})}
              errorText={this.state.error_name}
              value={this.state.name}
            />
            <MyInputAuth placeholder="Apellido" 
              onChangeText={this.handleSurname}
              onError={this.state.onErrorSurname}
              terminarError={()=>this.setState({onErrorSurname:false, surname:'', error_surname:''})}
              errorText={this.state.error_surname}
              value={this.state.surname}
            />
            <MyInputAuth placeholder="Email" 
            onChangeText={this.handleEmail} 
            onError={this.state.onErrorEmail}
            terminarError={()=>this.setState({onErrorEmail:false, email:'', error_email:''})}
            autoCompleteType="email"
            keyboardType="email-address"
            errorText={this.state.error_email}
            textContentType="emailAddress"
            value={this.state.email}
            />
            <MyInputAuth 
            isPassword 
            placeholder="Contraseña" 
            value={this.state.password_1}
            onChangeText={this.handlePassword_one} 
            onError={this.state.onErrorPassword}
            errorText={this.state.error_p1}
            terminarError={()=>this.setState({onErrorPassword:false, passoword:'', error_p1:''})}/>
            <MyInputAuth 
            isPassword 
            placeholder="Confirmar Contraseña" 
            value={this.state.password_2}
            onChangeText={this.handlePassword_two} 
            onError={this.state.onErrorPassword}
            errorText={this.state.error_p2}
            terminarError={()=>this.setState({onErrorPassword:false, passoword:'',error_p2:''})}/>
          </View>
        </View>
        <View style={{alignItems:'center', marginTop:10, paddingBottom:10}}>
            <Button title="SIGUIENTE" onPress={this._irASiguiente} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
            <Button title="YA TENGO CUENTA" onPress={()=>this.props.navigation.navigate('Login')} titleStyle={{color:'#7B38C2'}} type="outline" buttonStyle={{borderRadius:50, width:width-80, borderColor:'#7B38C2', marginVertical:10, borderWidth:3}}></Button>
          </View>
       </ScrollView>
       </KeyboardAvoidingView>
       </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  fondo: {
      backgroundColor: '#5BC0EB',
      height: height,
      width: width
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  titulo:{
    fontSize:36,
    fontWeight:'900',
    lineHeight:40,
    //fontFamily:'Red Hat Display',
    color:'#fff'
  },
  content:{
    flex:1, 
    marginTop:70,
  },
});

/* 

<KeyboardAvoidingView style={StylesAuth.wrapper}>



      <ScrollView style={StylesAuth.form}>
          <Input
            label="Mail"
            placeholder='vos@algo.com'
            leftIconContainerStyle={{paddingRight: 15}}
            leftIcon={{ type: 'font-awesome', name: 'user'}}
            containerStyle={{marginBottom:20}}
            onChangeText={this.handleEmail}
            autoCompleteType='email'
            errorMessage={this.state.error_email}
          />
          <Input
            label="Nombre"
            leftIconContainerStyle={{paddingRight: 15}}
            leftIcon={{ type: 'font-awesome', name: 'user'}}
            containerStyle={{marginBottom:20}}
            onChangeText={(text)=>{this.setState({name:text})}}
            autoCompleteType='name'
          />
          <Input
            label="Apellido"
            leftIconContainerStyle={{paddingRight: 15}}
            leftIcon={{ type: 'font-awesome', name: 'user'}}
            containerStyle={{marginBottom:20}}
            onChangeText={(text)=>{this.setState({surname:text})}}
            autoCompleteType='name'
          />
          <Input
            label="Contraseña"
            placeholder='********'
            leftIconContainerStyle={{paddingRight: 15}}
            leftIcon={{ type: 'font-awesome', name: 'lock'}}
            containerStyle={{marginBottom:20}}
            onChangeText={this.handlePassword_one}
            secureTextEntry={true}
            errorMessage={this.state.error_p1}
          />
          <Input
            label="Repetir Contraseña"
            placeholder='********'
            leftIconContainerStyle={{paddingRight: 15}}
            leftIcon={{ type: 'font-awesome', name: 'lock'}}
            containerStyle={{marginBottom:20}}
            onChangeText={this.handlePassword_two}
            secureTextEntry={true}
            errorMessage={this.state.error_p2}
          />
        <Button
        icon={{
          type:'font-awesome',
          name: "chevron-right",
          size: 15,
          color: "white"
        }}
        title="Crear cuenta"
        onPress={()=>this.register()}
      />
      </ScrollView>

      


      
      

    </KeyboardAvoidingView>
      */