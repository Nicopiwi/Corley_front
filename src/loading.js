import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Image
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from './configs/colors'
import * as Font from 'expo-font';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import axios from 'axios'
import APIs from './data_apis';

export default class Loading extends Component {
  constructor(props){
    super(props)
    this.state={loadedFont:false}
  }


  registerForPushNotificationsAsync = async () => {
    console.log('push')
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    try {
      // Get the token that uniquely identifies this device
      let pushToken = await Notifications.getExpoPushTokenAsync();
      console.log(pushToken)
      // POST the token to your backend server from where you can retrieve it to send push notifications.
      AsyncStorage.setItem("pushToken", pushToken)
      axios.defaults.headers = {
        'Authorization': APIs.rest.superUser.auth,
      }
      let userId = await AsyncStorage.getItem('userId')
      console.log(userId)
      await axios.post(APIs.rest.pushnotifications, {
        token:pushToken,
        user:userId
      })
    } catch (error) {
      console.log(error);
    }
  }

  async initFont() {
    try {
      await Font.loadAsync({
        "RedHat-Regular": require('../assets/RedHatText-Regular.ttf'),
      })
      this.setState({loadedFont:true})
    } catch (e) {
      console.log(e)
    }
  }

  async componentDidMount(){
    var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
    RCTNetworking.clearCookies(()=>{});
    try{
      let atok = await AsyncStorage.getItem('accToken')
      console.log(atok)
      await this.initFont()
      if (this.props.navigation.getParam('hasLoggedIn', false)){
        await this.registerForPushNotificationsAsync()
      }
      this.props.navigation.navigate(atok?'Main':'Authentification')
    }
    catch(e){
      console.log(e)
    }
    
    
  }
  render() {
    return (
        <LinearGradient colors={['#e5e5e5', '#e5e5e5']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}>
          {/*
          <Image source={require('../assets/corley_splash.png')} style={{width:300, height:300}}></Image>
          <Text style={{marginTop:20, fontSize:24, color:'white', fontFamily:this.state.loadedFont?'RedHat-Regular':null}}>Corley</Text>
          */}
          <ActivityIndicator size="large" color={Colors.primary} />
        
        </LinearGradient>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

AppRegistry.registerComponent('App', () => App)
