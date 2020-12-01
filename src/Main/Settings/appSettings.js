import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { resetUser } from '../../redux/actions/userActions'
import axios from 'axios'
import APIs from '../../data_apis'; 
import Colors from '../../configs/colors';
import SimpleCardText from '../../components/simpleCardText'
class AppSettingsScreen extends Component {
  constructor(props){
    super(props)
  }
  logOut = async()=>{
    var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
    RCTNetworking.clearCookies(()=>{});
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth
    }
    try{
      let r = await axios.post(APIs.rest.logout)
      this.deletePushNotificationsToken()
      await AsyncStorage.removeItem('accToken')
      await AsyncStorage.removeItem('userId')
      this.props.resetUser()
      this.props.navigation.navigate('Loading')
    }
    catch(e){
      console.log(JSON.stringify(e))
    }    
  }

  deletePushNotificationsToken=async()=>{
    let userId = await AsyncStorage.getItem('userId')
    let userIdArr = userId.split('/')
    let userPk = userIdArr[userIdArr.length-2]
    try{
      await axios.delete(`${APIs.rest.pushnotifications}?user__id=${userPk}`)
    }
    catch(e){
      console.log('error eliminando push')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor:'#e5e5e5', alignItems:'center'}}>
        <SimpleCardText texto="Cambiar datos" imageSrc={require('../../../assets/Icons/EditarUsuario.png')} onPress={()=>this.props.navigation.navigate('UserData')}></SimpleCardText>
        <SimpleCardText texto="Cambiar contraseña" imageSrc={require('../../../assets/user_cor.png')} onPress={()=>this.props.navigation.navigate('UserData')}></SimpleCardText>
        <SimpleCardText texto="Ayuda" imageSrc={require('../../../assets/Icons/Ayuda.png')} onPress={()=>this.props.navigation.navigate('UserData')}></SimpleCardText>
        <SimpleCardText texto="Acerca de" imageSrc={require('../../../assets/Icons/About.png')} onPress={()=>this.props.navigation.navigate('UserData')}></SimpleCardText>
        <SimpleCardText texto="Cerrar sesión" onPress={()=>this.logOut()} imageSrc={require('../../../assets/Icons/SignOut.png')}></SimpleCardText>
      </View>
    );
  }
}

export default connect(null, { resetUser })(AppSettingsScreen)
