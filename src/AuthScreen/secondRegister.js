import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput, AsyncStorage, KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import { saveTemporaryRegister } from '../redux/actions/authActions'
import { login } from '../redux/actions/userActions'
import { LinearGradient } from 'expo-linear-gradient'
import APIs from '../data_apis';
import * as Expo from 'expo';
import axios from 'axios';
import Constants from 'expo-constants'
import MyInputAuth from '../components/inputAuth'
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import StylesAuth from './styles/authForms'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../configs/colors'
const {height, width} = Dimensions.get('window')


function mapStateToProps (state) {
  return{
    savedPhoto:state.auth.data.savedPhoto,
    savedPhone:state.auth.data.savedPhone,
    savedLocation:state.auth.data.savedLocation,
  }
}
class SecondRegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      location:this.props.savedLocation,
      phone:this.props.savedPhone,
      error_location:'',
      error_phone:'',
      loading:false,
      disabled:true,
      imageUri:this.props.savedPhoto,
      loading:false,
      loadingMessage:''
    }
  }
  
  componentDidMount() {
    this.getPermissionAsync();
  }

  _handleLocation = (text)=>{
    this.setState({location:text})
  }

  _handlePhoneNumber = (text)=>{
    
    this.setState({phone:text})
  }

  getPermissionAsync = async () => {
    
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Disculpas, pero necesitamos permisos para la cámara!');
      }
    }
  }

  _pickImage = async () => {
    
    try{
      //this.setState({imageUri:'https://www.heavenimagenes.com/heavencommerce/781a8c66-fee1-4403-8ed0-099d1405833e/images/v2/ROMANTICA/1508011233211706_01_medium.jpg'})
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ imageUri: result.uri });
      }
    }
    catch(e){
      console.log('error')
      console.log(JSON.stringify(e))
    }
  };

  async _uploadUserImage(userId){
    var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
    RCTNetworking.clearCookies(()=>{});
    let uriParts = this.state.imageUri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    console.log(fileType)
    
    const dataImage = new FormData();

      dataImage.append('photos', {
          uri: this.state.imageUri,
          type: `image/${fileType}`,
          name: `${this.props.navigation.getParam('email')}.${fileType}`
      });
      dataImage.append('user',userId)
      
      
    let res2 = await axios.post(APIs.rest.userimages,dataImage)
  }

  //Login comun
  

  register = async () => {
      const phoneValid=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      if (phoneValid.test(this.state.phone)||this.state.phone===''){
        var endVal = this.state.imageUri?4:3
        this.setState({loading:true, loadingMessage:`1/${endVal}`})
        const user = {
          email: this.props.navigation.getParam('email'), 
          first_name: this.props.navigation.getParam('first_name'), 
          last_name: this.props.navigation.getParam('last_name'),
          password: this.props.navigation.getParam('password'),
          profile:{
            city:this.state.location,
            phone_number:!this.state.phone===''?parseInt(this.state.phone):null
          }
        }
        this.props.saveTemporaryRegister({savedPhoto:this.state.imageUri, savedLocation:this.state.location, savedPhone:this.state.phone})
        try{
          axios.defaults.headers = {
            'Authorization': APIs.rest.superUser.auth,
          }
          
          let response = await axios.post(APIs.rest.users, user)
          this.setState({loadingMessage:`2/${endVal}`})
          console.log(JSON.stringify(response))
          let loginResponse = await axios.post(APIs.rest.login, {
            email:this.props.navigation.getParam('email'),
            username:this.props.navigation.getParam('email'),
            password:this.props.navigation.getParam('password'),
            city:this.state.location,
            phone_number:parseInt(this.state.phone)
          })
          console.log(JSON.stringify(loginResponse))
          this.setState({loadingMessage:`3/${endVal}`})
          await AsyncStorage.setItem('accToken', loginResponse.data.token)
          await AsyncStorage.setItem('userId',`${APIs.rest.users}${loginResponse.data.user.pk}/`);
          // AsyncStorage.setItem('userNumber',loginResponse.data.user.pk);
          if (this.state.imageUri){
            await this._uploadUserImage(`${APIs.rest.users}${loginResponse.data.user.pk}/`)
          }
          
          this.setState({loadingMessage:`${endVal}/${endVal}`})
          this.setState({loading:false})
          this.props.saveTemporaryRegister({savedPhoto:'', savedLocation:'', savedPhone:''})
          this.props.login(loginResponse.data)
          this.props.navigation.navigate('Loading',{hasLoggedIn:true})
        }
        catch(e){
          this.setState({loading:false})
          console.log(JSON.stringify(e))
          this.props.navigation.navigate('Register')
        }
      }
      else{
        this.setState({error_phone:'Introduzca un número válido'})
      }
      
      
      
  }
  
  render() {
    if(this.state.loading){
      return (<LinearGradient colors={['#e5e5e5', '#e6e6e6']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{justifyContent:'center', alignItems:'center', flex:1}}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text>{this.state.loadingMessage}</Text>
      </LinearGradient>)
    }
    return (
      
      <LinearGradient colors={['#2B0062', '#2B0263']}
       start={{ x: 0, y: 1 }}
       end={{ x: 1, y: 0 }}
       style={styles.container}>
       <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={-230} behavior="padding">
       <ScrollView style={{flex:1, padding:8}}>
       <View style={styles.content}>
        <View style={{marginLeft:40}}>
          <Avatar
          size="xlarge"
          rounded
          overlayContainerStyle={{backgroundColor:'transparent'}}
          containerStyle={{backgroundColor:'transparent', borderWidth:3}}
          source={this.state.imageUri?{uri:this.state.imageUri}:require('../../assets/camera.png')}
          onPress={this._pickImage}
          />
        </View>
        <View style={{alignItems:'center', marginTop:40}}>
          <MyInputAuth 
          placeholder="Ciudad"
          value={this.state.location}
          onChangeText={this._handleLocation}
          ></MyInputAuth>
          <MyInputAuth placeholder="Número de teléfono"
          value={this.state.phone}
          errorText={this.state.error_phone}
          onChangeText={this._handlePhoneNumber}></MyInputAuth>
        </View>
       </View>
        <View style={{alignItems:'center', marginTop:10, paddingBottom:10}}>
            <Button title="REGISTRARSE" onPress={this.register} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
            <Button title="YA TENGO CUENTA" onPress={()=>this.props.navigation.navigate('Login')} titleStyle={{color:'#7B38C2'}} type="outline" buttonStyle={{borderRadius:50, width:width-80, borderColor:'#7B38C2', marginVertical:10, borderWidth:3}}></Button>
        </View>
          </ScrollView>
          </KeyboardAvoidingView>
       </LinearGradient>
    );
  }
}

export default connect(mapStateToProps, { saveTemporaryRegister, login })(SecondRegisterScreen)

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