import React, { Component } from 'react';
import { Text, View, StatusBar, Platform, FlatList, ActivityIndicator, AsyncStorage, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { saveList } from '../../redux/actions/productActions'
import CardPost from '../../components/cardPosts'
import Ionicons from '@expo/vector-icons'
import { Header, Image, Icon } from 'react-native-elements'
import axios from 'axios'
import APIs from '../../data_apis';
import Colors from '../../configs/colors'
import { ScrollView } from 'react-native-gesture-handler';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
const { height, width } = Dimensions.get('screen')

const mapStateToProps = (state) => {
  return { products : state.product.list }
};

class Inicio extends Component {
  
  constructor(props){
    super(props)
    this.state = {loading:false, refreshing:false, firstList:[], productsList:[], noConnection:false}
  }

  static navigationOptions = ({navigation}) => {
    return{
      //headerTitle:(<View><Image source={require('../../../assets/corli_logo.png')} style={{width:30, height:30, alignSelf:'center'}}></Image></View>),
      headerRight: (<Icon 
        onPress={()=>navigation.navigate('ChatList')}
        name='chat' color="#fff" containerStyle={{paddingRight:12}}>
        </Icon>),
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
      headerLeft:<View style={{width:width, alignItems:"center", justifyContent:'center'}}><Image source={require('../../../assets/corli_logo.png')} style={{width:34, height:34, alignSelf:'center'}}></Image></View>,
      headerStyle: {
        backgroundColor: '#470091',
        textAlign:"center", 
      },
      headerLayoutPreset: 'center',
    }
    
  }
 async _makeProductsRequest(){
    let userId = await AsyncStorage.getItem('userId')
    
    axios.defaults.headers = {
      //'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth
    }
    try{

      //GET PRODUCTS
      var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
      RCTNetworking.clearCookies(()=>{});
      let response = await axios.get(APIs.rest.products)
      console.log(response)
      let imagesResponse = await axios.get(APIs.rest.productimages)
      let usersResponse = await axios.get(APIs.rest.users)
      var newProductsWithImages = []
      var productsWithImage = response.data.map((product, key)=>{
        var imgs = imagesResponse.data.filter(image=>{
          return image.product === product.url
        })
        product.imageSrc = imgs[0]?{uri:imgs[0].photos}:null
        var owner = usersResponse.data.filter(user=>{
          return user.url === product.owner_id
        })
        product.owner = owner[0]?`${owner[0].first_name} ${owner[0].last_name}`:null
        product.isOwner = owner[0].url === userId
        newProductsWithImages.push(product)
      })
      this.setState({firstList:newProductsWithImages})
      this.setState({loading:false, refreshing:false})
      this.props.saveList(newProductsWithImages.reverse())
    }
    catch(e){
      console.log(e)
      this.setState({loading:false})
      this.setState({noConnection:true})
      //this._makeProductsRequest()
    }  
  }  

 async componentDidMount (){
    if (this.props.products.length===0){
      this.setState({loading:true})
    }    
    await this._makeProductsRequest();
    this.setState({loading:false})
 }
 
 _loadMore=()=>{
   this.setState({refreshing:true})
   this._makeProductsRequest();
 }
 
  render() {
    const products = this.props.products
    if (this.state.loading) {
      return (<View style={{justifyContent:'center', alignItems:'center', flex:1, backgroundColor:'#e5e5e5'}}>
      
        <ActivityIndicator size="large" color={Colors.primary} />
        </View>)
    }
    else if (this.state.noConnection){
      return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Image source={require('../../../assets/noConnection.png')} style={{width:292, padding:30, height:220, borderRadius:50}}>
          </Image>
          <Text style={{marginTop:36, fontWeight:'bold', fontSize:20}}>Parece que no tenés conexión!</Text>
          <Text style={{fontSize:20, textAlign:'center', color:'#747474', padding:30}}>Conectate a Internet para seguir usando Corley</Text>
      </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:Colors.background }}>
        
        <View style={{flex: 1, backgroundColor:Colors.background}}>
            <FlatList
              data={products}
              keyExtractor={item=>item.url}
              renderItem={({ item }) => (
                <CardPost title={item.name} 
                description={item.description} 
                rating={Math.floor(Math.random() * 5) + 1 }
                publicador={item.owner}
                pricePerHour={item.price_per_hour}
                isOwner={item.isOwner}
                ownerId={item.owner_id}
                productId={item.url}
                stock={item.stock}
                brand={item.brand}
                category={item.category}
                imageSrc={item.imageSrc?item.imageSrc:{uri:'https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg'}}/>
              )}
            />
        </View>
        
      </View>
    );
  }
}

export default connect(mapStateToProps, { saveList })(Inicio)