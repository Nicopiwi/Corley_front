import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, KeyboardAvoidingView, ActivityIndicator, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { TextInput, Paragraph, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import APIs from '../../data_apis';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios'
let {width, height} = Dimensions.get('window')

data = [{payment:'Cash'}, {payment:'Credit'}, {payment:'Debito'}, {payment:'MP'}]

export default class EndPayment extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selected:0,
      selectedPaymentName:data[0],
      disabled:false,
      selectedCash:false,
      selectedCredit:false,
      selectedDebito:false,
      selectedMP:false,
      productData:this.props.navigation.state.params,
      price:0
    }
  }
  goToOrderStage = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'OrderStage'})],
  });
  componentDidMount(){
    console.log('Hii')
    console.log(this.props.navigation.state.params)
    var date1 = new Date(this.props.navigation.getParam('start_date')); 
      var date2 = new Date(this.props.navigation.getParam('final_date')); 

      //Funciona solo entre dias
      var Difference_In_Hours=0
      var Difference_In_Time = date2.getTime() - date1.getTime(); 
      Difference_In_Hours = Difference_In_Time / (1000 * 3600); 
    
    
    var price = this.props.navigation.getParam('days')?(this.props.navigation.getParam('hourEnd')-this.props.navigation.getParam('hourStart'))*this.props.navigation.getParam('pricePerHour'):Difference_In_Hours * this.props.navigation.getParam('pricePerHour') //Cambiar luego cuando esté la opcion de por día. ESTA HARDCODEADO
    this.setState({price})
  }
  async orderProduct(params){
    let userId = await AsyncStorage.getItem('userId')
    console.log(this.state.final_date)
    console.log(userId)
    var Difference_In_Hours=0
    console.log(params.days)
    if (!params.days){
      var date1 = new Date(params.start_date); 
      var date2 = new Date(params.final_date); 

      var Difference_In_Time = date2.getTime() - date1.getTime(); 
      Difference_In_Hours = Difference_In_Time / (1000 * 3600); 
    }
    else{
      Difference_In_Hours = params.hourEnd - params.hourStart
    }
    
    var price = Difference_In_Hours * params.pricePerHour //Cambiar luego cuando esté la opcion de por día. ESTA HARDCODEADO
    this.setState({price})
    console.log(params.days?params.dateParticular:params.start_date)
    try{
      var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
      RCTNetworking.clearCookies(()=>{});
      let res = await axios.post(APIs.rest.orders,{
        price:price,
        start_date:params.days?params.dateParticular:params.start_date,
        final_date:params.days?params.dateParticular:params.final_date,
        state:'Buenos Aires',
        product:params.productId,
        product_owner:params.ownerId,
        //En verdad es Esperando confirmacion del dueño
        state:'Esperando confirmacion del dueño',
        client:userId
      })
      
      console.log(res)

      let respatch = await axios.patch(this.props.navigation.getParam('productId'),{
        stock:params.stock-1
      })
      console.log(respatch)
      
    }
    catch(e){
      console.log(e)
    }
  }

  async _sendPushNotification(){
    let userId = this.props.navigation.getParam("ownerId")
    let userIdArr = userId.split('/')
    let userPk = userIdArr[userIdArr.length-2]
    let today = new Date()
    console.log(`${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`)
    axios.defaults.headers = {
      'Authorization': APIs.rest.superUser.auth
    }
    console.log(userPk)
    try{
      let expoPush = await axios.get(`${APIs.rest.pushnotifications}?user__id=${userPk}`)
      var expoPushData = expoPush.data
      let destination = expoPushData.map(el=>el.token)
      console.log(destination)
      axios.defaults.headers = {
        'Accept': 'application/json',  
        'Content-Type': 'application/json', 
        'accept-encoding': 'gzip, deflate',   
        'host': 'exp.host'  
      }
      let sendPush = await axios.post(APIs.expo.push,
        {to:destination,
          title:'Nueva petición',
          body:`Te han solicitado el uso de ${this.props.navigation.getParam('title')}`,
          sound:'default',
          priority:'high',
          _displayInForeground: true,
          data:{
            //productParams:this.props.navigation.state.params,
            title:'Nueva petición!',
            type:'Orden',
            userId:userId,
            imageId:null,
            imageUri:this.props.navigation.getParam('imageSrc').uri,
            receiver:this.props.navigation.getParam('ownerId'),
            message:`Te han solicitado el uso de ${this.props.navigation.getParam('title')}`,
            },
          'content-available':true
      })
    }
    catch(e){
      console.log(e)
    }
  }

  paymentImage=(paymentName)=>{
    switch(paymentName.payment){
      case 'Cash':
        return require('../../../assets/money.png')
      case 'MP':
        return require('../../../assets/mercadoPago.png')
      case 'Credit':
        return require('../../../assets/creditCard.png')
      case 'Debito':
        return require('../../../assets/creditCard.png')
    }
  }

  _handleNext(){
    
    this._sendPushNotification()
    this.orderProduct(this.props.navigation.state.params)
    this.props.navigation.navigate('WaitForOwner')
  }
  
  render() {
    
    return (
      <KeyboardAvoidingView style={styles.container}
      keyboardVerticalOffset = {-250}
      behavior = "padding">
        <ScrollView style={{flex:1}}>
      
          <View style={{alignItems:'center', marginTop:90}}>
            <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Finalizar pago</Text>
            
          </View>
          <View style={{marginTop:25, flex:1, alignItems:'center'}}>
            <Text style={styles.mediumText}>
              TOTAL
            </Text>
            <View style={{marginTop:30, fontWeight:'bold', color:'#470091'}}>
    <Text style={{fontSize:25, }}>$ {this.state.price}</Text>
            </View>
            </View>
            
            
          <View style={{alignItems:'center', marginTop:20, paddingBottom:10}}>
            <View>
            <Button disabled={this.state.disabled} title="Terminar" onPress={()=>this._handleNext()} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
            </View>
          </View>
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:'#e5e5e5'
  },
  smallText:{
    fontSize:13,
    fontStyle:'italic',
    alignItems:'center',
    marginTop:10,
    alignSelf:'center',
  },
  mediumText:{
    fontSize:18,
    marginBottom:10,
    fontWeight:'bold',
    marginLeft:20
  },
  title:{
    fontSize:24,
    lineHeight:28,
    alignItems:'center'
  }
  
});
//this.state.paymentName==='Cash'?this.props.navigation.navigate('CardData'):console.log('hola')}