import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList,  ImageBackground, Dimensions, Image, TouchableOpacity, ActivityIndicator, AsyncStorage, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import { getDataUser, uploadUserImage } from '../../redux/actions/userActions'
import Colors from '../../configs/colors';
import APIs from '../../data_apis'; 
import { Google } from 'expo';
import { Text, Avatar, Rating, Button, Icon } from 'react-native-elements';
import { withNavigationFocus } from "react-navigation";
import StylesGeneral from '../styles/general';
import CardPost from '../../components/cardPosts'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

const {height, width} = Dimensions.get('window');

function mapStateToProps (state){
  console.log('ea')
  console.log(state.auth)
  return {
    myUserData:state.userData
  }
}
class SettingsScreen extends Component {
  //_isMounted=false;
  constructor(){
    super()
    this.state = {user:{}, profile:{}, option:1, goodQualification:true, userId:'', userNumber:'', rating:{}, productStock:[], productsUse:[], productsReserved:[], userImage:'', imageId:''}
  }
  static navigationOptions = ({navigation})=>{
    return{
      headerRight: (<Icon 
        onPress={()=>navigation.navigate('AppSettings')}
        name='settings' color="#e5e5e5" containerStyle={{paddingRight:12}}>
        </Icon>),
      
    }
  }
 
  _defaultTextToShow(){
    switch(this.state.option){
      case 1:
        return 'Aquí aparecerán todos tus productos que tengan stock'
        break;
      case 2:
        return 'Aquí aparecerán todos los productos que reservaste'
        break;
      case 3:
        return 'Aquí aparecerán todos los productos que estés usando momentáneamente'
        break;
    }
  }

  _listToShow(){
    switch(this.state.option){
      case 1:
        return this.state.productStock
      case 2:
        return this.state.productsReserved
      case 3:
        return this.state.productsUse
    }
  }


  _pickImage = async () => {
    let userId = await AsyncStorage.getItem('userId')
    try{
      //this.setState({imageUri:'https://www.heavenimagenes.com/heavencommerce/781a8c66-fee1-4403-8ed0-099d1405833e/images/v2/ROMANTICA/1508011233211706_01_medium.jpg'})
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ userImage: result.uri });
        await this._uploadUserImage(userId)
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
    
    let uriParts = this.state.userImage.split('.');
    let fileType = uriParts[uriParts.length - 1];
    console.log(fileType)
    
    const dataImage = new FormData();

      dataImage.append('photos', {
          uri: this.state.userImage,
          type: `image/${fileType}`,
          name: `${this.state.user.email}${Math.floor(Math.random()*1000)}.${fileType}`
      });
      dataImage.append('user',userId)
      
      
    let res2 = await axios.post(APIs.rest.userimages,dataImage)
    this.props.uploadUserImage(this.state.userImage)
    if (this.state.imageId!=''){
      let resDelete = await axios.delete(this.state.imageId)
    }
    
  }

  async _getUserImage(userId){
    let imagesResponse = await axios.get(APIs.rest.userimages)
    var owner = imagesResponse.data.filter(image=>{
      return image.user === userId
    })
    if (owner.length>0){
      this.setState({userImage:owner[0].photos, imageId:owner[0].url})
    }
    this.props.uploadUserImage(owner[0].photos)
    
  }


  async componentDidMount(prevProps){
    console.log('usuario redux')
    console.log(this.props.myUserData)
    let userNumber = await AsyncStorage.getItem('userNumber')
    let userId = await AsyncStorage.getItem('userId')
    let atoken = await AsyncStorage.getItem('accToken')
    this.setState({userId})
    this.setState({userNumber})
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
          this.props.getDataUser(res.data)
          this.setState({user:res.data, profile:res.data.profile})
      }) 
      .catch(e=>console.log(JSON.stringify(e)))
      this._getUserImage(userId)
      this._makeProductsRequest(userId)
      this._makeReservedAndUseProductsRequest()
    }
    
  }


//Para el back
//Cambiar los nombres a los states (Esperando confirmacion del dueño, Producto reservado,
//Producto en uso, Tiempo de uso finalizado, Fin)
//Permitir que las ordenes puedan ser requeridas mediante el userId del cliente
//Permitir que las imagenes de los productos puedan ser requeridas enviando un array de
//ids de productos

  async _makeReservedAndUseProductsRequest(){
    var newProductsReserved = []
    var newProductsUse = []
    try{
    // Recibo las ordenes hechas por el usuario, y las claifico
      let userId = await AsyncStorage.getItem('userId')
      let userPkParts= this.state.userId.split('/')
      let userPk = userPkParts[userPkParts.length-2]
      let usersResponse = await axios.get(APIs.rest.users)
      let userOrders = await axios.get(`${APIs.rest.orders}?client__id=${userPk}&product_owner__id=`)
      let ordersReserved = userOrders.data.filter((order)=>{
        return order.state==='Producto reservado'
      })
      let ordersUse = userOrders.data.filter((order)=>{
        return order.state==='Producto en uso'
      })
      //console.log(ordersReserved)
      //Obtengo un array de productos y otro de dueños para cada grupo
      
      let ordersReservedProducts = ordersReserved.map(el=>el.product)
      let ordersReservedProductsIds = ordersReservedProducts.map(el => el.split('/')[el.split('/').length-2]).join(',')
      let ordersUseProducts = ordersUse.map(el=>el.product)
      let ordersUseProductsIds =ordersUseProducts.map(el => el.split('/')[el.split('/').length-2]).join(',')
      let ordersReservedOwners = ordersReserved.map(el=>el.product_owner)
      let ordersUseOwners = ordersUse.map(el=>el.product_owner)

      //Obtengo los productos y las imagenes de cada grupo
      
      let productsReservedImagesResponse = await axios.get(`${APIs.rest.productimages}${ordersReservedProductsIds!=''?`?products=${ordersReservedProductsIds}`:'?products=-1'}`)
      let productsReservedResponse = await axios.get(`${APIs.rest.products}${ordersReservedProductsIds!=''?`?id=${ordersReservedProductsIds}`:'?id=-1'}`)

      let productsUseResponse = await axios.get(`${APIs.rest.products}${ordersUseProductsIds!=''?`?id=${ordersUseProductsIds}`:'?id=-1'}`)
      //console.log(productsUseResponse)
      let productsUseImagesResponse = await axios.get(`${APIs.rest.productimages}${ordersUseProductsIds!=''?`?products=${ordersUseProductsIds}`:'?products=-1'}`)
      //console.log(productsUseImagesResponse)
      
      //Caracterizo a los productos
      
      var productsReservedWithImage = productsReservedResponse.data.map((product, key)=>{

        //Consigo todas las ordenes de cada producto
        let productOrders = userOrders.data.filter(e=>e.product===product.url)
        let productOrdersId = productOrders.map(el => el.url.split('/')[el.url.split('/').length-2]).join(',')
        product.ordersId=productOrdersId
        var imgs = productsReservedImagesResponse.data.filter(image=>{
          return image.product === product.url
        })
        product.imageSrc = imgs[0]?{uri:imgs[0].photos}:null
        product.owner = 'Nico Rozen'
        var owner = usersResponse.data.filter(user=>{
          return user.url === product.owner_id
        })
        product.owner = owner[0]?`${owner[0].first_name} ${owner[0].last_name}`:null
        product.isOwner = owner[0].url === userId
        product.isOwner = false
        newProductsReserved.push(product)
      })
      var productsUseWithImage = productsUseResponse.data.map((product, key)=>{
        let productOrders = userOrders.data.filter(e=>e.product===product.url)
        let productOrdersId = productOrders.map(el => el.url.split('/')[el.url.split('/').length-2]).join(',')
        var imgs = productsUseImagesResponse.data.filter(image=>{
          return image.product === product.url
        })
        product.imageSrc = imgs[0]?{uri:imgs[0].photos}:null
        product.owner = 'Nico Rozen'
        product.ordersId=productOrdersId
        product.isOwner = false
        var owner = usersResponse.data.filter(user=>{
          return user.url === product.owner_id
        })
        product.owner = owner[0]?`${owner[0].first_name} ${owner[0].last_name}`:null
        product.isOwner = owner[0].url === userId
        newProductsUse.push(product)
      })
      
      //Los asigno
      
      this.setState({productsUse:newProductsUse, productsReserved:newProductsReserved})
      console.log(this.state.productsReserved)
    }

    catch(e){
      console.log(e)
      console.log('Error en makeReserved')
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
        product.owner = `${this.props.myUserData.first_name} ${this.props.myUserData.last_name}`
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
  /*
  componentDidMount(){
    this._makeReservedAndUseProductsRequest()
  }
  */
  logOutGoogle = async () => {
    
    await AsyncStorage.removeItem('googleToken')
    console.log('yes')
    
  }
  

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={{flex:1}}>
      <ImageBackground source={this.props.myUserData.userImage?{uri:this.props.myUserData.userImage}:null} style={{width:width, height:287, alignItems:'center', justifyContent:'center'}}>
        <View style={{width:width+10, height:287, backgroundColor:`rgba(43,0,98,${this.props.myUserData.userImage?'0.85':'1'})`, alignItems:'center', justifyContent:'center'}}>
          <Avatar
            rounded
            size="xlarge"
            onPress={()=>this._pickImage()}
            source={this.props.myUserData.userImage?{uri:this.props.myUserData.userImage}:require('../../../assets/user_cor.png')}
            showEditButton
            imageProps={{PlaceholderContent:<ActivityIndicator />}}
          />
          <Text style={styles.nameStyle}>{this.props.myUserData.first_name} {this.props.myUserData.last_name}</Text>
          </View>
        </ImageBackground>
        <View style={{width:width, height:157, backgroundColor:'#470091', alignItems:'center', justifyContent:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
          <Icon name="pin-drop" color="#fff" containerStyle={{padding:8}}></Icon>
          {this.props.myUserData.city?(
            <Text style={styles.infoStyle}>Vive en <Text style={[styles.infoStyle, {fontWeight:'bold'}]}>{this.props.myUserData.city?this.props.myUserData.city:'No provisto'}, {this.props.myUserData.country}</Text></Text>
          ):<Text style={styles.infoStyle}>Vive en <Text style={[styles.infoStyle, {fontWeight:'bold'}]}></Text></Text>}
            
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="phone" color="#fff" containerStyle={{padding:8}}></Icon>
            {this.props.myUserData.phone_number?
              (<Text style={styles.infoStyle}>+54 9 <Text style={[styles.infoStyle, {fontWeight:'bold'}]}> {this.props.myUserData.phone_number}</Text></Text>):
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
            
          
        </View>
        <View style={{flex:1}}>
          <View style={styles.botoneraListas}>
            <TouchableOpacity onPress={()=>this.setState({option:1})}>
            <Text style={this.state.option===1?styles.optionBotoneraHighlighted:styles.optionBotonera}>Mi Stock</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({option:2})}>
              <Text style={this.state.option===2?styles.optionBotoneraHighlighted:styles.optionBotonera}>Reservados</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={this.state.option===3?styles.optionBotoneraHighlighted:styles.optionBotonera} onPress={()=>this.setState({option:3})}>En Uso</Text>
            </TouchableOpacity>
          </View>
        </View>
        {(this.state.productStock.length===0 && this.state.option===1) || (this.state.productsUse.length===0 && this.state.option===3)||(this.state.productsReserved.length===0 && this.state.option===2)?(
          <View style={{width:width, height:height/2.5, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'#4a4a4a', fontSize:18, fontFamily:'RedHat-Regular'}}>No hay nada para mostrar</Text>
            <Text style={{color:'#4a4a4a', fontSize:18, fontFamily:'RedHat-Regular', marginHorizontal:15, textAlign:'center'}}>{this._defaultTextToShow()}</Text>
          </View>
          
        ):(
        <FlatList
          data={this._listToShow()}
          keyExtractor={item=>item.url}
          style={{paddingBottom:10}}
          renderItem={({ item }) => (
            <CardPost title={item.name} 
            description={item.description} 
            rating={Math.floor(Math.random() * 5) + 1 }
            publicador={item.owner}
            pricePerHour={item.price_per_hour}
            isOwner={item.isOwner}
            ownerId={item.owner_id}
            stock={item.stock}
            brand={item.brand}
            productId={item.url}
            ordersId={item.ordersId}
            category={item.category}
            imageSrc={item.imageSrc?item.imageSrc:{uri:'https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg'}}/>
          )}
        />)}
      </ScrollView>
      </View>
    );
  }
}
export default connect(mapStateToProps, { getDataUser, uploadUserImage })(withNavigationFocus(SettingsScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e5e5e5',
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
