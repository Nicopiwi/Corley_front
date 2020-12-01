import React, { Component } from 'react';
import { Text, View, Image, FlatList, AsyncStorage } from 'react-native';
import Notification from '../../components/notification'
import { Notifications } from 'expo'
import axios from 'axios'
import APIs from '../../data_apis'
import { NavigationActions, StackActions } from 'react-navigation';

export default class MisPublicaciones extends Component {
  acceptOrder= async(order)=>{
    try{
      let res = await axios.patch(order, {state:'Producto reservado'})
    }
    
    catch(e){
      console.log(e)
    }
  }

  declineOrder= async(order)=>{
    try{
      let res = await axios.delete(order)
    }
    catch(e){
      console.log(e)
    }
    
  }

  goToOrderStage = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'GatherWith'})],
  });
  goToProduct = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'ProductScreen'})],
  });
  constructor(props){
    super(props)
    this.state={notData:[]}
  }
  async _getNotifications(userId){
    
    let nots = await axios.get(APIs.rest.notifications)
    let notsUser = nots.data.filter(el => el.notification_receiver === userId)
    console.log(notsUser)
    this.setState({notData:notsUser})
    console.log(this.state.notData)
  }
  async componentDidMount(){
    let userId = await AsyncStorage.getItem('userId')
    this._getNotifications(userId)
    this.listener = Notifications.addListener(this.listen)
  }
  componentWillUnmount(){
    this.listener && Notifications.removeListener(this.listen)
  }

  handleNext(){
    this.deleteNotification()
  }
  async deleteNotification(notificationId){
    let newNotifications = this.state.notData.filter(el => el.url !== notificationId)
    this.setState({notData:newNotifications})
    try{
      let deletedItem = await axios.delete(notificationId)
    }
    catch(e){
      console.log(e)
    }
  }

  async saveNotification(data){
    try{
      console.log({
        title:data.title,
        message:data.message,
        notification_type:'Chat',
        notification_receiver:data.receiver,
        image:null
      })
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      let postData = await axios.post('https://echitosto.pythonanywhere.com/api/pushnotifications/',{
        title:data.title,
        message:data.message,
        notification_type:'Chat',
        notification_receiver:data.receiver,
      })
      console.log(postData)
      return postData
    }
    catch(e){
      console.log(e)
    }
  }
  listen = ({origin, data}) =>{
    console.log('hooollaaaa')
    console.log(data)
    
    postData=this.saveNotification(data)
    this.setState({notData:[...this.state.notData, postData]})
    
  }

  static navigationOptions = ({navigation}) => {
    return{
      //headerTitle:(<View><Image source={require('../../../assets/corli_logo.png')} style={{width:30, height:30, alignSelf:'center'}}></Image></View>),
      
      headerTitleStyle: { 
          textAlign:"center", 
          alignItems:'center',
          justifyContent:'center',
          alignSelf:'center',
          position: 'absolute',
          left: 160,
          paddingLeft:30,
          flex:1,
          color:'#fff'
      },
      headerLeft:<View style={{width:360, alignItems:"center", justifyContent:'center'}}><Image source={require('../../../assets/corli_logo.png')} style={{width:34, height:34, alignSelf:'center'}}></Image></View>,
      headerStyle: {
        backgroundColor: '#470091',
        textAlign:"center", 
      },
      headerLayoutPreset: 'center',
    }
    
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor:'#e5e5e5' }}>
        {this.state.notData.length > 0?(
          <FlatList
          data={this.state.notData.slice().reverse()}
          style={{flex:1, backgroundColor:'#e5e5e5'}}
          keyExtractor={item=>item.url}
          renderItem={({ item }) => (
            <Notification title={item.title} 
            test={()=>{console.log('notificacion')}} 
            onDelete={()=>this.deleteNotification(item.url)}
            noClose={!(item.notification_type=='Order')}
            handleNext={this.handleNext}
            description={item.message}/>
          )}
        />
        
        ):(
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
             <Text style={{color:'#4a4a4a', fontSize:18, fontFamily:'RedHat-Regular'}}>Todavía no tenés notificaciones</Text>
          </View>

        )}
        
      </View>
    );
  }
}