import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput, AsyncStorage, ScrollView,
  KeyboardAvoidingView, 
} from 'react-native';
import APIs from '../data_apis';
import * as Expo from 'expo';
import axios from 'axios';
import Colors from '../configs/colors'
import {Ionicons} from '@expo/vector-icons';
import { Button } from 'react-native-elements'
import MyInputAuth from '../components/inputAuth'
import StylesAuth from './styles/authForms';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
const {height, width} = Dimensions.get('window')

export default class ForgotPassword extends Component {
  constructor(){
    super();
    this.state={email:'',password:'', showPassword:false, valid:true, loading:false}
  }
  handleEmail = (text) => {
    this.setState({email: text})
  }
  handlePassword = (text) => {
      this.setState({password: text})
  }
  //Login comun
    
  render() {
    
    return (
      <LinearGradient colors={['#2B0062', '#2B0072']}
       start={{ x: 0, y: 1 }}
       end={{ x: 1, y: 0 }}
       style={styles.container}>
       <View style={styles.content}>
        <View style={{width:2*width/3, height:130, marginLeft:40}}>
            <Text style={styles.titulo}>{`RECUPERA TU CONTRASEÑA DE CORLEY`}</Text>
          </View>
          <View style={{alignItems:'center', marginTop:40}}>
            <MyInputAuth placeholder="Email">

            </MyInputAuth>
          </View>
          <View style={{alignItems:'center', marginTop:10}}>
            <Button title="Enviar" buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
           
          </View>
        </View>
        
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