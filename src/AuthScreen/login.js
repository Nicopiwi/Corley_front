import React, { Component } from 'react';
import {
  View, Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput, AsyncStorage, ScrollView,
  KeyboardAvoidingView, SafeAreaView, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { login } from '../redux/actions/userActions'
import { LinearGradient } from 'expo-linear-gradient'
import APIs from '../data_apis';
import * as Expo from 'expo';
import axios from 'axios';
import { SocialIcon, Input, Button } from 'react-native-elements';
import Colors from '../configs/colors'
import Constants from 'expo-constants'
import MyInputAuth from '../components/inputAuth'
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import StylesAuth from './styles/authForms';
const {height, width} = Dimensions.get('window')

class LoginScreen extends Component {
  constructor(){
    super();
    this.state={onErrorEmail:false, onErrorPassword:false, email:'', password:'', showPassword:false, valid:true, loading:false}
  }
  
  
  handleEmail = (text) => {
    this.setState({email: text})
  }
  handlePassword = (text) => {
      this.setState({password: text})
  }
  //Login comun
    login = async (email, pass) => {
      axios.defaults.headers = {
        //'Content-Type': 'application/json',
        'Authorization': APIs.rest.superUser.auth
      }
      const user = {
          email: email,
          username: email,
          password: pass
      }
      var prevEmail = email
      var prevPass = pass
      this.setState({loading:true})
      axios.post(
              APIs.rest.login,user
          )
          .then(async(res) => {
            console.log('Aca')
            this.props.login(res.data)
            await AsyncStorage.setItem('accToken', res.data.token)
            await AsyncStorage.setItem('userId', `${APIs.rest.users}${res.data.user.pk}/`)
            this
                .props
                .navigation
                .navigate('Loading', {hasLoggedIn:true}) }

          )
          .catch(e=>{
            this.setState({loading:false})
            console.log(e)
            this.setState({errorText:'Las credenciales son incorrectas', onErrorEmail:true, onErrorPassword:true, email, password:this.state.password})
          })

            
        
         
  }
  //Login con google
  signInWithGoogleAsync = async () =>{
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: APIs.android_client_id,
        iosClientId: APIs.ios_client_id,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        await AsyncStorage.setItem('googleToken',result.accessToken)
        /* Cuando db este terminada
          this.login(result.user.name,result.user.password)
        */
        this.props.navigation.navigate('Home',{user:result.user})
      } else {
        console.log('Cancelado')
      }
    } catch (e) {

      console.log(e);
    }
  }
  render() {
    if(this.state.loading){
      return (<LinearGradient colors={['#e5e5e5', '#e6e6e6']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{justifyContent:'center', alignItems:'center', flex:1}}>
      <ActivityIndicator size="large" color={Colors.primary} />
      </LinearGradient>)
    }
    
    return (
      <LinearGradient colors={['#2B0062', '#2B0263']}
       start={{ x: 0, y: 1 }}
       end={{ x: 1, y: 0 }}
       style={styles.container}>
       <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={-230} behavior="padding">
       <ScrollView style={{flex:1, padding:3}}>
       <View style={styles.content}>
         <View style={{width:229, height:130, marginLeft:40}}>
            <Text style={styles.titulo}>{`INICIA SESIÓN EN CORLEY`}</Text>
          </View>
          <View style={{alignItems:'center', marginTop:20}}>
            <MyInputAuth placeholder="Email" 
            onChangeText={(text)=>{this.setState({email:text, onErrorEmail:false, errorText:''})}} 
            onError={this.state.onErrorEmail}
            terminarError={()=>this.setState({onErrorEmail:false, email:'', errorText:''})}
            autoCompleteType="email"
            keyboardType="email-address"
            errorText={this.state.errorText}
            textContentType="emailAddress"
            value={this.state.email}
            />
            <MyInputAuth 
            isPassword 
            placeholder="Contraseña" 
            value={this.state.password}
            onChangeText={(text)=>{this.setState({password:text, onErrorPassword:false, errorText:''})}} 
            onError={this.state.onErrorPassword}
            terminarError={()=>this.setState({onErrorPassword:false, passoword:'', errorText:''})}/>
          </View>

          <TouchableOpacity style={{marginLeft:40, paddingTop:25}} 
          onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
          <Text style={{color:'#fff'}}>Olvidé mi contraseña</Text></TouchableOpacity>

          <View style={{alignItems:'center', marginTop:10}}>
            <Button title="INICIAR SESIÓN" onPress={()=>this.login(this.state.email, this.state.password)} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
            <Button title="NO TENGO CUENTA" onPress={()=>this.props.navigation.navigate('Register')} titleStyle={{color:'#7B38C2'}} type="outline" buttonStyle={{borderRadius:50, width:width-80, borderColor:'#7B38C2', marginVertical:10, borderWidth:3}}></Button>
          </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
      
    );
  }
}
export default connect(null, {login})(LoginScreen)

const styles = StyleSheet.create({
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




