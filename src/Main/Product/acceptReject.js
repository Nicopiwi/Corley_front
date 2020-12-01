import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios'
import APIs from '../../data_apis';
import { StackActions, NavigationActions } from 'react-navigation';

const returnToMain = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
});

//Params: orderId, productImage, ownerImage
export default class AcceptReject extends React.Component {
  constructor(props){
      super(props)
      this.state = {days:false}
  }

componentDidMount(){
    console.log(this.props.navigation.state.params)
}

goToMain(){
  this.props.navigation.dispatch(returnToMain);
}


async _acceptRequest(order, title, ownerName){
  try{
    let userId = order.client
    let userIdArr = userId.split('/')
    let userPk = userIdArr[userIdArr.length-2]
    let expoPush = await axios.get(`${APIs.rest.pushnotifications}?user__id=${userPk}`)
      var expoPushData = expoPush.data
      if (expoPushData.length>0){
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
            title:'Nueva notificación',
            body:`${ownerName} te ha aceptado la orden de ${title}. Fijate en tu lista de productos reservados
            `,
            sound:'default',
            _displayInForeground: true,
            
            'content-available':true
        })
        console.log('sentpush')
      }
      console.log(order.url)
      axios.defaults.headers = {
        'Accept': 'application/json',  
          'Content-Type': 'application/json', 
          'Authorization': APIs.rest.superUser.auth
      }
    let res = await axios.patch(order.url, {state:'Producto reservado'})
    //console.log(order.url)
    //console.log(res)
    let tokenRes = await axios.post(APIs.rest.ordertokengen,{
      token_owner: "",
      token_client: "",
      already_entered: false,
      order: res.data.url
    })
    console.log(tokenRes.data)
    this.props.navigation.navigate('GatherWith', {orderData:res.data, isOwner:this.props.navigation.getParam('isOwner'), title:this.props.navigation.getParam('title'), tokenData:tokenRes.data})
    
  }
  catch(e){
    console.log(JSON.stringify(e))
  }
}

async _rejectRequest(order, title, ownerName){
  
  try{
    let userId = order.client
    let userIdArr = userId.split('/')
    let userPk = userIdArr[userIdArr.length-2]
    let expoPush = await axios.get(`${APIs.rest.pushnotifications}?user__id=${userPk}`)
      var expoPushData = expoPush.data
      if (expoPushData.length>0){
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
            title:'Nueva notificación',
            body:`${ownerName} te ha rechazado la orden de ${title}.
            `,
            sound:'default',
            _displayInForeground: true,
            
            'content-available':true
        })
        console.log('sentpush')
      }
      axios.defaults.headers = {
        'Accept': 'application/json',  
          'Content-Type': 'application/json', 
          'Authorization': APIs.rest.superUser.auth
      }
    let res = await axios.delete(order.url)
    //console.log(res)
    this.props.navigation.dispatch(returnToMain);
  }
  catch(e){
    console.log(e)
  }
}

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
        <Text style={{marginTop:95, fontSize:24, color:'#000', fontWeight:'bold'}}>Petición</Text>
        <View style={{marginTop:76}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            
            <Image source={require('../../../assets/user_corley.png')} style={{width:100, height:100, borderRadius:50}}></Image>

            <Image style={{width:75, height:20, marginLeft:15}} source={require('../../../assets/ArrowRight.png')} />

            <Image source={this.props.navigation.getParam('imageSrc')} style={{width:100, height:100, marginLeft:15}}></Image>
          </View>

          <View style={{width:250, marginTop:30}}>
          <Text style={{color:'#747474'}}>
          
          </Text>
          </View>


          {
          (this.props.navigation.getParam('order').final_date !== this.props.navigation.getParam('order').start_date)?(
            <View>
              <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>{this.props.navigation.getParam('order').start_date}</Text>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
              <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>{this.props.navigation.getParam('order').final_date}</Text>
            </View>
          ):(<View>
            <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>19/8</Text>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
            <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>18hs - 22 hs</Text>
          </View>)
        }

        <Button onPress={()=>this._acceptRequest(this.props.navigation.getParam('order'), this.props.navigation.getParam('title'), this.props.navigation.getParam('ownerName'))} title="Aceptar" titleStyle={{color:'green'}} type="outline" buttonStyle={{borderRadius:50, borderColor:'green', marginVertical:10, borderWidth:3, marginTop:50}}></Button>
        <Button onPress={()=>this._rejectRequest(this.props.navigation.getParam('order'), this.props.navigation.getParam('title'), this.props.navigation.getParam('ownerName'))}  title="Rechazar" titleStyle={{color:'red'}} type="outline" buttonStyle={{borderRadius:50, borderColor:'red', marginVertical:10, borderWidth:3, marginTop:15}}></Button>
        
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#e5e5e5',
    padding: 8,
  },
});
