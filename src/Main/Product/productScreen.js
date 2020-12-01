import * as React from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, BackHandler, ActivityIndicator, ScrollView, ImageBackground, Dimensions, AsyncStorage, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { Image, Rating, Button, Avatar, Icon } from 'react-native-elements'
import Colors from '../../configs/colors'
const {height, width} = Dimensions.get("screen")
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios';
import APIs from '../../data_apis';
import { Ionicons } from '@expo/vector-icons'
import { MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, } from 'react-native-popup-menu';
import ImageCarousel from '../../components/carouselProducto'
import { FlatList } from 'react-native-gesture-handler';
import MyInputAuth from '../../components/inputAuth';
import { TextInput, Paragraph, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';

const returnToMain = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: windowToGo})],
});

let windowToGo = ''

export default class ProductScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {user:{}, ownerProfile:{}, userOrders:'', userOrdersNoApproved:[], userOrdersUse:[], userOrdersReserved:[], owner: {}, userImage:'', productImages:[], myComment:'', comments:[], ownerName:'', option:1, selectedOrder:false, selectedOrderData:{}, ordersVisible:false}
    this.handleBackButtonClicka = this.handleBackButtonClicka.bind(this);
    this.backHandlerProduct = null;
  }


  _showDialogOrder = () => this.setState({ ordersVisible: true });
  _hideDialogOrder = () => this.setState({ ordersVisible: false});

  async componentDidMount(){
    //console.log(this.props.navigation.state.params)
    
    try{
      const userId = await AsyncStorage.getItem('userId')
      if (userId){
        this.backHandlerProduct = BackHandler.addEventListener('hardwareBackPressProduct', this.handleBackButtonClicka);
      }
      console.log(userId)
      let user = await axios.get(userId)
      this.setState({user:user.data})
      
      await this._getOwnerInfo()
      await this._getUserImage()
      await this._getProductImages()
      await this._getProductComments()
      await this._getUserOrders()

      console.log('ord')
    console.log(this.props.navigation.getParam('isOwner') && (this.state.userOrdersNoApproved.length>0||this.state.userOrdersUse.length>0||this.state.userOrdersReserved.length>0))
    console.log(this.props.navigation.getParam('isOwner'))
    console.log((this.state.userOrdersNoApproved.length>0||this.state.userOrdersUse.length>0||this.state.userOrdersReserved.length>0))
    }
    catch(e){
      console.log(e)
    }
    
  }

  async componentWillUnmount() {
    const userId = await AsyncStorage.getItem('userId')
    if (userId){
      this.backHandlerProduct.remove()
    }
  }

  async handleBackButtonClicka() {
    let usrid = await AsyncStorage.getItem('userId')
    windowToGo = usrid?'MainScreen':'Welcome'
    this.props.navigation.dispatch(returnToMain);
    return true;
  }

  _listToShowOrders(){
    switch(this.state.option){
      case 1:
        console.log(this.state.userOrdersNoApproved)
        return this.state.userOrdersNoApproved
      case 2:
        return this.state.userOrdersReserved
      case 3:
        return this.state.userOrdersUse
      
    }
  }

  renderMyBody(){
    console.log(this.state.selectedOrder)
    if (this.state.selectedOrder){
      console.log(this.state.selectedOrder)
      return (
        <View style={{flex:1}}>
        <View style={{flex:1}}>
          <View style={styles.botoneraListas}>
            <TouchableOpacity onPress={()=>this.setState({option:1, selectedOrder:false})}>
            <Text style={this.state.option===1?styles.optionBotoneraHighlighted:styles.optionBotonera}>Esperando</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({option:2, selectedOrder:false})}>
              <Text style={this.state.option===2?styles.optionBotoneraHighlighted:styles.optionBotonera}>Reservados</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={this.state.option===3?styles.optionBotoneraHighlighted:styles.optionBotonera} onPress={()=>this.setState({option:3, selectedOrder:false})}>En Uso</Text>
            </TouchableOpacity>
          </View>
        </View>
      <View style={{alignItems:'center'}}>
        <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Proveedor</Text>
      <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.props.navigation.getParam('isOwner')?this.state.ownerName:`${this.state.user.first_name} ${this.state.user.last_name}`}</Text>
        <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Solicitante</Text>
        <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{!this.props.navigation.getParam('isOwner')?this.state.ownerName:`${this.state.user.first_name} ${this.state.user.last_name}`}</Text>
        <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Plazo de uso</Text>
        {
          this.state.selectedOrderData.start_date!==this.state.selectedOrderData.end_date?(
            <View>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.startDate}</Text>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.endDate}</Text>
            </View>
          ):(<View>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.startDate}</Text>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.hourStart} - {this.state.selectedOrderData.hourEnd}</Text>
          </View>)
        }
        <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Código de orden</Text>
        <Text style={{color:'#470091', fontWeight:'bold', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.codigo}</Text>
      </View>
      </View>
      )
    }
    else{
      return (<View style={{flex:1, height:600}}><View style={{flex:1}}>
          <View style={styles.botoneraListas}>
            <TouchableOpacity onPress={()=>this.setState({option:1, selectedOrder:false})}>
            <Text style={this.state.option===1?styles.optionBotoneraHighlighted:styles.optionBotonera}>Esperando</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({option:2, selectedOrder:false})}>
              <Text style={this.state.option===2?styles.optionBotoneraHighlighted:styles.optionBotonera}>Reservados</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={this.state.option===3?styles.optionBotoneraHighlighted:styles.optionBotonera} onPress={()=>this.setState({option:3})}>En Uso</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop:20}}>
        <FlatList
          data={this._listToShowOrders()}
          keyExtractor={item=>item.url}
          style={{paddingBottom:10}}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>this.setState({selectedOrder:true, selectedOrderData:item})}>
              <Text>Orden del {item.startDate}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
        </View>)
    }
  }


  //TRABAJAR CON ESTO
  async _getUserOrders(){
    let userId = await AsyncStorage.getItem('userId')
    let userPkParts= userId.split('/')
    let userPk = userPkParts[userPkParts.length-2]
    const uri = this.props.navigation.getParam('isOwner')?`${APIs.rest.orders}?product_owner__id=${userPk}`:`${APIs.rest.orders}?client__id=${userPk}&product_owner__id=`
    try{
      console.log(uri)
      let userOrders = await axios.get(uri)
      let orderTokens = await axios.get(APIs.rest.ordertokengen)
      let productOrdersReserved=[]
      let productOrdersUse=[]
      let productOrdersNoApproved=[]
      let newProductOrdersReserved=[]
      let newProductOrdersUse=[]
      if (userOrders.data != []){
        productOrdersReserved = userOrders.data.filter(e=>e.product===this.props.navigation.getParam('productId') && e.state==="Producto reservado")
        productOrdersUse = userOrders.data.filter(e=>e.product===this.props.navigation.getParam('productId') && e.state==="Producto en uso")
        productOrdersNoApproved = userOrders.data.filter(e=>e.product===this.props.navigation.getParam('productId') && e.state==="Esperando confirmacion del dueño")
      }
      var withCodeReserved = productOrdersReserved.map(order=>{
        var token = orderTokens.data.filter(token=>{
          return token.order === order.url
        })
        order.token = token[0]
        newProductOrdersReserved.push(order)
      })
      var withCodeUse = productOrdersUse.map(order=>{
        var token = orderTokens.data.filter(token=>{
          return token.order === order.url
        })
        order.token = token[0]
        newProductOrdersUse.push(order)
      })
      this.setState({userOrdersReserved:newProductOrdersReserved, userOrdersUse:newProductOrdersUse, userOrdersNoApproved:productOrdersNoApproved})
      console.log(this.state.userOrdersReserved)
    }
    catch(e){
      console.log('Error en get orders')
      console.log(e)
    }
    //Falta filtrarlos
  }

  async _postComment(){
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
      let res = await axios.post(APIs.rest.productcomments,{
        who_commented:userId,
        //when_commented:`01/11/2019`,
        comment:this.state.myComment,
        product:this.props.navigation.getParam('productId')
      })
      var newComment = res.data
      this.setState({comments:[...this.state.comments, newComment]})
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
          title:'Nuevo comentario',
          body:`[${this.state.ownerName}] Te han comentado la publicación de ${this.props.navigation.getParam('title')}: ${this.state.myComment}
          `,
          sound:'default',
          _displayInForeground: true,
          data:{
            productParams:this.props.navigation.state.params,
            comment:this.state.myComment,
            title:'Nuevo comentario',
            type:'Comentario',
            imageId:null,
            imageUri:this.props.navigation.getParam('imageSrc').uri,
            receiver:this.props.navigation.getParam('ownerId'),
            message:`Te han comentado la publicación de ${this.props.navigation.getParam('title')}`,
            },
          'content-available':true
      })
    }
    catch(e){
      console.log(e)
    }
  }

  async _getOwnerInfo(){
    axios.defaults.headers = {
      //'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth
    }
    try{
      let owner = await axios.get(this.props.navigation.getParam("ownerId"))
      this.setState({owner:owner.data, ownerProfile:owner.data.profile, ownerName:`${owner.data.first_name} ${owner.data.last_name}`})
      //console.log(this.state.ownerProfile)
    }
    catch(e){
      console.log(e)
    }
    
  }

  async _getUserImage(){
    
    let imagesResponse = await axios.get(APIs.rest.userimages)
    var owner = imagesResponse.data.filter(image=>{
      return image.user === this.props.navigation.getParam('ownerId')
    })
    
    if (owner.length>0){
      console.log('hola')
      this.setState({userImage:owner[0].photos})
      //console.log(owner[0])
    }
    
  }

  async _getProductImages(){
    let imagesResponse = await axios.get(APIs.rest.productimages)
    var images = imagesResponse.data.filter(image=>{
      return image.product === this.props.navigation.getParam('productId')
    })
    
    this.setState({productImages:images})
    console.log(this.state.productImages)
    
  }

  async deleteProduct(){
    
    try{
      let res = await axios.delete(this.props.navigation.getParam("productId"))
      console.log(res)
      this.props.navigation.dispatch(returnToMain);
    }
    catch(e){
      console.log(e)
    }
    
  }
  

  async receiveProduct({navigation}){
    let userId = await AsyncStorage.getItem('userId')
    var date1 = new Date("06/30/2019"); 
    var date2 = new Date("07/30/2019"); 

    var Difference_In_Time = date2.getTime() - date1.getTime(); 
    var Difference_In_Hours = Difference_In_Time / (1000 * 3600); 
    var price = Difference_In_Hours * 10 //Cambiar luego cuando esté la opcion de por día. ESTA HARDCODEADO
    try{

      let res = await axios.post(APIs.rest.orders,{
        price:price,
        start_date:date1,
        final_date:date2,
        state:'Buenos Aires',
        product_owner:'https://echitosto.pythonanywhere.com/api/users/4/',
        client:userId
      })
      //console.log(res)
    }
    catch(e){
      console.log(e)
    }
  }

async _toggleProductOnDisplay(){
  try{
    let res = await axios.patch(this.props.navigation.getParam("productId"),
    {is_on_display:!this.props.navigation.getParam('onStock')})
    console.log(res)
    this.props.navigation.dispatch(returnToMain);
  }
  catch(e){
    console.log(e)
  }
}

  async _getProductComments(){
    try{
      let results = await axios.get(APIs.rest.productcomments)
      //console.log(results)
      var comments_results = results.data.filter(comment=>{
        return comment.product === this.props.navigation.getParam('productId')
      })
      this.setState({comments:comments_results})
      console.log(this.state.comments)
      //console.log(product_results)
    }
    catch(e){
      console.log(e)
    }

  }
  
  _handleProductImages=()=>{
    let newImages=[]
    if(this.state.productImages.length===0){
      newImages.push({photos:''})
      newImages.push({photos:'https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg'})
      newImages.push({photos:''})
      return newImages
    }
    if(this.state.productImages.length===1){
      newImages.push({photos:''})
      newImages.push({photos:this.state.productImages[0].photos})
      newImages.push({photos:''})
      return newImages
    }
    if(this.state.productImages.length===2){
      newImages.push({photos:this.state.productImages[0].photos})
      newImages.push({photos:this.state.productImages[1].photos})
      newImages.push({photos:''})
      return newImages
    }
    return this.state.productImages
    
  }

  render() {
    return(
      <PaperProvider>
      <KeyboardAvoidingView style={styles.container}
      keyboardVerticalOffset={-250} behavior="padding"
      >
      <ScrollView style={{flex:1}}>
      {this.props.navigation.getParam('isOwner')?(
          <Menu style={{position:'absolute', top:20, right:20}}>
            <MenuTrigger customStyles={{triggerWrapper:{padding:5}}} children={<Ionicons size={24} name="md-more"></Ionicons>}/>
            <MenuOptions placement="left">
              <MenuOption onSelect={() => this.props.navigation.navigate('ProductSettings',{photos:this.state.productImages})} text='Modificar producto' />
              <MenuOption onSelect={onPress=()=>this.deleteProduct()} >
                <Text style={{color: 'red'}}>Eliminar producto</Text>
              </MenuOption>
              
            </MenuOptions>
          </Menu>):null}
          <Icon 
          onPress={()=>this.props.navigation.navigate('MainScreen')}
          name='arrow-back' containerStyle={{position:'absolute', top:20, left:20}}>
          </Icon>
        <View style={styles.priceCard}>
          <View style={{marginLeft:17, marginTop:7}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:'#470091', fontSize:30, fontWeight:'bold'}}>${this.props.navigation.getParam('pricePerHour')}</Text>
              <Text style={{color:'#470091', fontSize:30}}> p/hr</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              {/* Poner formas de pago */}
            </View>
          </View>
        </View>
        <View style={{width:width, height:287, alignItems:'center', justifyContent:'center'}}>
        {/*<View style={{position:'absolute', top:20, right:20}}>*/}
          
        <View style={{height:175}}>
          <ImageCarousel 
          initialIndex={this.state.productImages.length>1?0:1}
          data={this._handleProductImages()}
          pagingEnable={this.state.productImages.length>1}/>
          
         </View>
        </View>
        <View style={{width:width, height:157, backgroundColor:'#470091'}}>
          <Text style={styles.titleStyle}>{this.props.navigation.getParam("title")}</Text>

        </View>
        <View style={{paddingBottom:80}}>
          <View style={{marginTop:33, marginLeft:15}}>
            <Text style={styles.infoStyleHeading}>Categoría</Text>
            <Text style={styles.infoStyle}>{this.props.navigation.getParam("category")}</Text>
            <Text style={styles.infoStyleHeading}>Marca</Text>
            <Text style={styles.infoStyle}>{this.props.navigation.getParam('brand', '-')}</Text>
            <Text style={styles.infoStyleHeading}>Stock</Text>
            <Text style={styles.infoStyle}>{this.props.navigation.getParam('stock', '-')}</Text>
            <Text style={styles.infoStyleHeading}>Descripción</Text>
          
              <Text style={styles.infoStyle}>{this.props.navigation.getParam("description")}</Text>
            
          </View>
        </View>
        
        <View style={{height:280, width:width, backgroundColor:'#2B0062'}}>
          <View style={{marginLeft:17, marginTop:17}}>
            <Text style={{fontSize:24, fontWeight:'bold', lineHeight:24, color:'#fff'}}>Dueño</Text>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', marginTop:17, alignItems:'center'}}>
                  <Avatar
                    rounded
                    size="medium"
                    source={this.state.userImage!=''?{uri:this.state.userImage}:require('../../../assets/user_corley.png')}
                  />
  <Text style={{marginLeft:17, color:'#fff', fontSize:18, fontWeight:'bold'}}>{this.state.ownerName}</Text>
                </View>
                {!this.props.navigation.getParam("isOwner")?(
                  <Button title="Contactar"  
                  buttonStyle={{borderRadius:6, width:125, height:27,
                    backgroundColor:'#7B38C2', 
                    }}
                    onPress={()=>this.props.navigation.navigate('ForeignProfile', {foreignUserId:this.props.navigation.getParam('ownerId')})}></Button>
                ):null
                  }
              </View>
              <View style={{marginLeft:45}}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
              <Icon name="pin-drop" color="#fff" containerStyle={{padding:8}}></Icon>
              {this.state.ownerProfile.city?(
                <Text style={styles.infoStyleOwner}>Vive en <Text style={[styles.infoStyleOwner, {fontWeight:'bold'}]}>{this.state.ownerProfile.city}, {this.state.ownerProfile.country}</Text></Text>
              ):<Text style={styles.infoStyleOwner}>Vive en <Text style={[styles.infoStyleOwner, {fontWeight:'bold'}]}>Argentina</Text></Text>}
                
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="phone" color="#fff" containerStyle={{padding:8}}></Icon>
                {this.state.ownerProfile.phone_number?
                  (<Text style={styles.infoStyleOwner}>+54 9 <Text style={[styles.infoStyleOwner, {fontWeight:'bold'}]}>{this.state.ownerProfile.phone_number}</Text></Text>):
                  (<Text style={styles.infoStyleOwner}>No provisto</Text>)
                }
                </View>
              
              {
                this.state.ownerProfile.goodQualification?(
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="thumb-up" color="#fff" containerStyle={{padding:8}}></Icon>
                    <Text style={styles.infoStyleOwner}>Calificación <Text style={[styles.infoStyleOwner, {fontWeight:'bold'}]}>Muy Buena</Text></Text>
                  </View>
                ):null
              }
              </View>
          </View>
          
          
        </View>
        <View style={{width:width}}>
        <Text style={{color:'#7B38C2', fontSize:20, marginHorizontal:24, marginTop:10, fontFamily:'RedHat-Regular'}}>{this.state.comments.length>0?'Opiniones':'Este producto no tiene opiniones aún'}</Text>
          <View style={{flex:1, height:this.state.comments.length>4?300:null, marginVertical:16}}>
            <FlatList
              data={this.state.comments.slice().reverse()}
              keyExtractor={item=>item.url}
              inverted
              renderItem={({ item }) => (
                <View style={{backgroundColor:'white', 
                fontFamily:'RedHat-Regular', 
                fontSize:14, borderRadius:10, 
                padding:16, marginVertical:10, marginHorizontal:24}}>
                  <Text>{item.comment}</Text>
                </View>
              )}
            >
            
            </FlatList>
            
          </View>
          <MyInputAuth  
            multiline={true} 
            numberOfLines={4}
            onChangeText={(text)=>{this.setState({myComment:text})}} 
            value={this.state.myComment}
            ></MyInputAuth>
            <Button title="Comentar"
            buttonStyle={{borderRadius:50, width:160, 
              backgroundColor:'#7B38C2', marginVertical:20, marginLeft:27}} onPress={()=>{this._postComment()}}></Button>
          <View style={{flex:1, alignItems:'center', justifyContent:'center', height:120}}>
          {this.props.navigation.getParam('isOwner')?
            null:(<Button title="Alquilar producto" onPress={()=>this.props.navigation.navigate('OrderScreen', {...this.props.navigation.state.params, ...{publicador: this.state.ownerName}})}  
              buttonStyle={{borderRadius:50, width:width-80, 
                backgroundColor:'#7B38C2', 
            }
            }
            disabled={this.props.navigation.getParam('stock')===0}
              disabledStyle={{borderRadius:50, width:width-80, 
                backgroundColor:'#7B38C2', 
                }}></Button>)}

              { /* Botón ver órdenes , {userOrdersReserved:this.state.userOrdersReserved, userOrdersNoApproved:this.state.userOrdersNoApproved, userOrdersUse:this.state.userOrdersUse, ownerName:this.state.ownerName, userName:`${this.state.user.first_name} ${this.state.user.last_name}`, 
              isOwner:this.props.navigation.getParam('isOwner')*/ }
              {(this.state.userOrdersNoApproved.length>0||this.state.userOrdersUse.length>0||this.state.userOrdersReserved.length>0)?(
              <TouchableOpacity style={{marginVertical:10}} onPress={()=>this.props.navigation.navigate('OrderList',{userOrdersReserved:this.state.userOrdersReserved, userOrdersNoApproved:this.state.userOrdersNoApproved, userOrdersUse:this.state.userOrdersUse, ownerName:this.state.ownerName, userName:`${this.state.user.first_name} ${this.state.user.last_name}`, 
              isOwner:this.props.navigation.getParam('isOwner'), imageSrc:this.props.navigation.getParam('imageSrc'), title:this.props.navigation.getParam('title')})}>
                {this.props.navigation.getParam('isOwner')?(
                <Text style={{color:'#4a4a4a', fontSize:18, fontWeight:'bold'}}>VER ORDENES</Text>):(<Text style={{color:'#4a4a4a', fontSize:18, fontWeight:'bold'}}>VER MIS ORDENES</Text>)
                }
                </TouchableOpacity>):null
              }
          </View>
        </View>
        <Portal>
        <Dialog
          style={{elevation:10}}
             visible={this.state.ordersVisible}
             onDismiss={this._hideDialogOrder}>
               
            <Dialog.Content style={{elevation:10}}>
              <View style={styles.root}>
              {this.renderMyBody()}
              </View>
              
            </Dialog.Content>
            
          </Dialog>
          </Portal>
      </ScrollView>
      </KeyboardAvoidingView>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e5e5e5',
  },

  //Dialog

  root:{
    height:height-200,
    //backgroundColor:'#f2f2f2',
    //borderRadius:7
  },
  botoneraListas:{
    flexDirection:'row',
    paddingVertical:10,
    //alignItems:'space-around',
    justifyContent:'space-around',
    width:width-70
  },
  optionBotonera:{
    color:'#B792DD',
    fontSize: 14,
    lineHeight: 19,
    paddingBottom:5,
  },
  optionBotoneraHighlighted:{
    color:'#470091',
    fontSize: 14,
    lineHeight: 19,
    borderBottomWidth:3,
    borderBottomColor:'#470091',
    paddingBottom:5,
  },


  //--------------

  titleStyle:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
    marginTop:24,
    marginLeft:15,
    fontFamily:'RedHat-Regular'
    
  },
  infoStyle:{
    fontSize: 18,
    lineHeight: 24,
    marginTop:7,
    color:'#4A4A4A',
    fontFamily:'RedHat-Regular'
  },
  infoStyleHeading:{
    fontSize: 18,
    marginTop:10,
    lineHeight: 24,
    color:'#4A4A4A',
    fontWeight:'bold',
    fontFamily:'RedHat-Regular'
  },
  infoStyleOwner:{
    fontSize: 14,
    lineHeight: 19,
    color:'#fff',
    fontFamily:'RedHat-Regular'
  },
  priceCard:{
    width:width-36,
    height:110,
    borderRadius:10,
    position:'absolute',
    backgroundColor:'#fff',
    elevation:3,
    fontFamily:'RedHat-Regular',
    top:367,
    left:18
  },
  
});

