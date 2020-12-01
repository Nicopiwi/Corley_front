import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, BackHandler, ImageBackground, Dimensions, Image, TouchableOpacity, ActivityIndicator, AsyncStorage, SafeAreaView } from 'react-native';
import Colors from '../../configs/colors';
import APIs from '../../data_apis'; 
import { Ionicons } from '@expo/vector-icons'
import { Text, Avatar, Rating, Button, Icon } from 'react-native-elements';
import { withNavigationFocus } from "react-navigation";
import StylesGeneral from '../styles/general';
import CardPost from '../../components/cardPosts'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, } from 'react-native-popup-menu';
  import { TextInput, Paragraph, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';

const {height, width} = Dimensions.get('window');
class ForeignProfile extends Component {
  //_isMounted=false;
  constructor(props){
    super(props)
    this.state = {optionsDialogOpen:false, user:{}, profile:{}, option:1, goodQualification:true, userId:'', userNumber:'', rating:{}, productStock:[], productsUse:[], productsReserved:[], userImage:'', imageId:''}
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  _showDialogOptions = () => this.setState({ optionsDialogOpen:true});
  _hideDialogOptions = () => this.setState({ optionsDialogOpen:false});
/*
static navigationOptions = {
  headerRight: <Icon name="more-vert" onPress={()=>this._showDialogOptions()} containerStyle={{paddingRight:10}} color='#fff' size={24}></Icon>
}

*/

handleBackButtonClick() {
  this.props.navigation.navigate('ProductScreen');
  return true;
}
  async _getUserImage(userId){
    let imagesResponse = await axios.get(APIs.rest.userimages)
    var owner = imagesResponse.data.filter(image=>{
      return image.user === userId
    })
    if (owner.length>0){
      this.setState({userImage:owner[0].photos, imageId:owner[0].url})
    }
    
  }

  async createChat(ownerId){
    let userId = await AsyncStorage.getItem('userId')
    let existingChat = {}
    var existe = false
    try{
      let chats = await axios.get(APIs.rest.chat)
      for (let i = 0; i < chats.data.length; i++){
        if (chats.data[i].user1==userId && chats.data[i].user2==ownerId){
          existe = true
          existingChat = chats.data[i]
        }
      }
      if (!existe){
        let chatRes = await axios.post(APIs.rest.chat,{chat_token:'', user1:userId, user2:ownerId})
        let chatToken = chatRes.data.chat_token
        let chatId = chatRes.data.url
        console.log(chatToken)
        this.props.navigation.navigate('ChatScreen', {chatToken, userId})
      }
      else{
        let chatToken = existingChat.chat_token
        let chatId = existingChat.url
        this.props.navigation.navigate('ChatScreen', {chatToken, userId})
      }
      
    }
    catch(e){
      console.log(e)
    }
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  async componentDidMount(prevProps){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    let userId = this.props.navigation.getParam('foreignUserId')
    let atoken = await AsyncStorage.getItem('accToken')
    this.setState({userId})
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth,
    }
    axios.defaults.withCredentials=true;
    if(this.props.isFocused){
      var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
      RCTNetworking.clearCookies(()=>{});

      //Datos del usuario

      axios.get(userId)
      .then(res =>{ 
          this.setState({user:res.data, profile:res.data.profile})
      }) 
      .catch(e=>console.log(JSON.stringify(e)))
      this._getUserImage(userId)
      this._makeProductsRequest(userId)
    }
    
  }
  async _makeProductsRequest(userId){
    axios.defaults.headers = {
      //'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth
    }
    try{
  
      //GET PRODUCTS
      var newProductsStock = []

      let response = await axios.get(APIs.rest.products)
      var newProducts=[]
      var filterUserProducts = response.data.filter(prod=>{
        return prod.owner_id === userId
      })
      let imagesResponse = await axios.get(APIs.rest.productimages)
      
      var productsFilterStock = filterUserProducts.map((product, key)=>{
        var imgs = imagesResponse.data.filter(image=>{
          return image.product === product.url
        })
        product.owner = `${this.state.user.first_name} ${this.state.user.last_name}`
        product.imageSrc = imgs[0]?{uri:imgs[0].photos}:null
        product.isOwner = true
        newProductsStock.push(product)
      })
      this.setState({productStock:newProductsStock})
      
    }
    catch(e){
      console.log(e)
    }  
      
      
     
  }  
  componentWillUnmount(){
    this._isMounted=false
  }
  

  render() {
    return (
      <PaperProvider>
      <View style={styles.container}>
        
      <ScrollView style={{flex:1}}>
      
      <ImageBackground source={this.state.userImage?{uri:this.state.userImage}:null} style={{width:width, height:287, alignItems:'center', justifyContent:'center', elevation:-1}}>
        <View style={{width:width+10, height:287, backgroundColor:`rgba(43,0,98,${this.state.userImage?'0.85':'1'})`, alignItems:'center', justifyContent:'center'}}>
          <Avatar
            rounded
            size="xlarge"
            source={this.state.userImage?{uri:this.state.userImage}:require('../../../assets/user.png')}
            imageProps={{PlaceholderContent:<ActivityIndicator />}}
          />
          <Text style={styles.nameStyle}>{this.state.user.first_name} {this.state.user.last_name}</Text>
          </View>
        </ImageBackground>
        <View style={{width:width, height:157, backgroundColor:'#470091', alignItems:'center', justifyContent:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
          <Icon name="pin-drop" color="#fff" containerStyle={{padding:8}}></Icon>
          {this.state.profile.city?(
            <Text style={styles.infoStyle}>Vive en <Text style={[styles.infoStyle, {fontWeight:'bold'}]}>{this.state.profile.city}, {this.state.profile.country}</Text></Text>
          ):<Text style={styles.infoStyle}>Vive en <Text style={[styles.infoStyle, {fontWeight:'bold'}]}></Text></Text>}
            
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="phone" color="#fff" containerStyle={{padding:8}}></Icon>
            {this.state.profile.phone_number?
              (<Text style={styles.infoStyle}>+54 9 <Text style={[styles.infoStyle, {fontWeight:'bold'}]}> {this.state.profile.phone_number}</Text></Text>):
              (<Text style={styles.infoStyle}>No provisto</Text>)
            }
            </View>
          
          {
            this.state.goodQualification?(
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="thumb-up" color="#fff" containerStyle={{padding:8}}></Icon>
                <Text style={styles.infoStyle}>Calificación <Text style={[styles.infoStyle, {fontWeight:'bold'}]}>Muy Buena</Text></Text>
              </View>
            ):null
          }
            <Icon name="more-vert" onPress={()=>this._showDialogOptions()} containerStyle={{paddingRight:10, position:'absolute', top:25, right:10}} color='#fff' size={24}></Icon>
          
        </View>
        <View style={{flex:1}}>
          <View style={styles.botoneraListas}>
            <TouchableOpacity onPress={()=>this.setState({option:1})}>
            <Text style={this.state.option===1?styles.optionBotoneraHighlighted:styles.optionBotonera}>Su stock</Text>
            </TouchableOpacity>
          </View>
        </View>
        {(this.state.productStock.length===0 && this.state.option===1) || (this.state.productsUse.length===0 && this.state.option===2)||(this.state.productsReserved.length===0 && this.state.option===3)?(
          <View style={{width:width, height:height/2.5, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'#4a4a4a', fontSize:18, fontFamily:'RedHat-Regular'}}>No hay nada para mostrar</Text>
          </View>
          
        ):(
        <FlatList
          data={this.state.productStock}
          keyExtractor={item=>item.url}
          style={{paddingBottom:10}}
          renderItem={({ item }) => (
            <CardPost title={item.name} 
            description={item.description} 
            rating={Math.floor(Math.random() * 5) + 1 }
            publicador={item.owner}
            pricePerHour={item.price_per_hour}
            isOwner={false}
            ownerId={item.owner_id}
            brand={item.brand}
            productId={item.url}
            category={item.category}
            imageSrc={item.imageSrc?item.imageSrc:{uri:'https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg'}}/>
          )}
        />)}
        <Portal>
          <Dialog
             visible={this.state.optionsDialogOpen}
             onDismiss={this._hideDialogOptions}>
            <Dialog.Content>
              <TouchableOpacity onPress={()=>this.createChat(this.props.navigation.getParam('foreignUserId'))}><Text style={{ padding: 20, fontSize: 20 }}>Enviar mensaje</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>console.log('denuncio')}><Text style={{ padding: 20, fontSize: 20, color:'red' }}>Denunciar usuario</Text></TouchableOpacity>
            </Dialog.Content>
            
          </Dialog>
        </Portal>
      </ScrollView>
      </View>
      </PaperProvider>
    );
  }
}
export default withNavigationFocus(ForeignProfile)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    fontFamily:'RedHat-Regular'
  },
  nameStyle:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
    marginTop:24,
    fontFamily:'RedHat-Regular'
    
  },
  infoStyle:{
    fontSize: 14,
    lineHeight: 19,
    color:'#fff',
    fontFamily:'RedHat-Regular'
  },
  botoneraListas:{
    flexDirection:'row',
    paddingVertical:10,
    //alignItems:'space-around',
    justifyContent:'space-around',
    fontFamily:'RedHat-Regular',
    width:width
  },
  optionBotonera:{
    color:'#B792DD',
    fontSize: 14,
    lineHeight: 19,
    paddingBottom:5,
    fontFamily:'RedHat-Regular'
  },
  optionBotoneraHighlighted:{
    color:'#470091',
    fontSize: 14,
    lineHeight: 19,
    borderBottomWidth:3,
    borderBottomColor:'#470091',
    paddingBottom:5,
    fontFamily:'RedHat-Regular'
  },
})