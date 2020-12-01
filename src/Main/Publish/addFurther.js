import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, KeyboardAvoidingView, ActivityIndicator, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import APIs from '../../data_apis';
import axios from 'axios'
import { StackActions, NavigationActions } from 'react-navigation';
let {width, height} = Dimensions.get('window')
const resetForm = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
});
export default class PublishDataFurther extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selected:0,
      disabled:false,
      selectedCash:false,
      selectedCredit:false,
      selectedDebito:false,
      selectedMP:false,
      loading:false,
      loadingMessage:''
    }
  }
  static navigationOptions = ({navigation})=>{
    return{
      header: navigation.state.params.loading ? null : undefined
    }
  }
  componentDidMount=()=>{
    console.log(this.props.navigation.state.params)
  }
  async uploadImage(myProps, imageUri, prodId, imgNum){
    // CODIGO PARA SUBIR LA IMAGEN
    

    let uriParts = imageUri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    console.log(fileType)
    
    const dataImage = new FormData();

      dataImage.append('photos', {
          uri: imageUri,
          type: `image/${fileType}`,
          name: `${myProps.productName}${imgNum}.${fileType}`
      });
      dataImage.append('product',prodId)
      
      
    let res2 = await axios.post(APIs.rest.productimages,dataImage)
  }
  async publicarProducto(){
  
    var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
    RCTNetworking.clearCookies(()=>{});
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': APIs.rest.superUser.auth
    }
    axios.defaults.withCredentials=true;
    let myProps = this.props.navigation.state.params
    let userId = await AsyncStorage.getItem('userId')
    this.setState({disabled:true, loading:true, loadingMessage:'Cargando datos...'})
    this.props.navigation.setParams({ 
      loading: true
    });
    try{
      console.log(APIs.rest.products,{
        name:myProps.productName,
        owner_id:userId,
        description:myProps.descripcion,
        price_per_hour:myProps.price?parseInt(myProps.price):0,
        stock:myProps.stock?parseInt(myProps.stock):0,
        discount:0,
        brand:myProps.marca,
        hours_to_rent:0,
        is_on_display:true,
        category:myProps.categoria?myProps.categoria:'Otros'
      })
      let res = await axios.post(APIs.rest.products,{
        name:myProps.productName,
        owner_id:userId,
        description:myProps.descripcion,
        price_per_hour:myProps.price?parseInt(myProps.price):0,
        stock:myProps.stock?parseInt(myProps.stock):0,
        discount:0,
        brand:myProps.marca,
        hours_to_rent:0,
        is_on_display:true,
        category:myProps.categoria?myProps.categoria:'Otros'
      })
      console.log(JSON.stringify(res))
      let prodId = res.data.url
      console.log(prodId)
      this.setState({loadingMessage:'Cargando Imágenes...'})
      if (myProps.imageUri1 && !myProps.imageUri2 && !myProps.imageUri3 && !myProps.imageUri4){
        await this.uploadImage(myProps,myProps.imageUri1,prodId, 1)
      }
      else if (myProps.imageUri2 && !myProps.imageUri3 && !myProps.imageUri4){
        await this.uploadImage(myProps,myProps.imageUri1,prodId, 1)
        await this.uploadImage(myProps,myProps.imageUri2,prodId, 2)
      }
      else if (myProps.imageUri3 && !myProps.imageUri4){
        await this.uploadImage(myProps,myProps.imageUri1,prodId, 1)
        await this.uploadImage(myProps,myProps.imageUri2,prodId, 2)
        await this.uploadImage(myProps,myProps.imageUri3,prodId, 3)
      }
      else if (myProps.imageUri4){
        await this.uploadImage(myProps,myProps.imageUri1,prodId, 1)
        await this.uploadImage(myProps,myProps.imageUri2,prodId, 2)
        await this.uploadImage(myProps,myProps.imageUri3,prodId, 3)
        await this.uploadImage(myProps,myProps.imageUri4,prodId, 4)
      }
      this.setState({disabled:false})
      this.props.navigation.dispatch(resetForm);
    }
    catch(e){
      console.log(JSON.stringify(e))
      this.setState({disabled:false, loading:false})
      this.props.navigation.setParams({ 
        loading: false
      });
    }
    
  }
  render() {
    if (this.state.loading){
      return(
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
      
          <ActivityIndicator size="large" color={'#7B38C2'} />
          <Text>{this.state.loadingMessage}</Text>
        </View>
      )
    }
    return (
      <KeyboardAvoidingView style={styles.container}
      keyboardVerticalOffset = {-250}
      behavior = "padding">
        <ScrollView style={{flex:1}}>
      
          <View style={{alignItems:'center', marginTop:90}}>
            <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Añade un producto</Text>
            
          </View>
          <View style={{marginTop:25, flex:1}}>
            <Text style={styles.mediumText}>
              Seleccionar metodo de pago
            </Text>
            <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>
            <TouchableOpacity style={{borderColor:this.state.selectedCredit?'#7B38C2':'#e5e5e5', 
              borderWidth:2, padding:10
            }} onPress={()=>this.setState({selectedCredit:!this.state.selectedCredit})}>
                <Image source={require('../../../assets/creditCard.png')}
                PlaceholderContent={<ActivityIndicator />}
                style={{ width: 87, height: 87 }}
                />
                <Text style={styles.smallText}>Credito</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style={{borderColor:this.state.selectedDebito?'#7B38C2':'#e5e5e5', 
              borderWidth:2, padding:10
            }} onPress={()=>this.setState({selectedDebito:!this.state.selectedDebito})}>
                <Image source={require('../../../assets/creditCard.png')}
                PlaceholderContent={<ActivityIndicator />}
                style={{ width: 87, height: 87 }}
                
                />
                <Text style={styles.smallText}>Debito</Text>
            </TouchableOpacity>
            </View>
            <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>
            <TouchableOpacity onPress={()=>this.setState({selectedCash:!this.state.selectedCash})} style={{borderColor:this.state.selectedCash?'#7B38C2':'#e5e5e5', 
              borderWidth:2, padding:10
            }}>
                <Image source={require('../../../assets/money.png')}
                PlaceholderContent={<ActivityIndicator />}
                style={{ width: 87, height: 87 }}
                />
                <Text style={styles.smallText}>Efectivo</Text>
              
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({selectedMP:!this.state.selectedMP})} style={{borderColor:this.state.selectedMP?'#7B38C2':'#e5e5e5', 
              borderWidth:2, padding:10
            }}>
                <Image source={require('../../../assets/mercadoPago.png')}
                PlaceholderContent={<ActivityIndicator />}
                style={{ width: 87, height: 87 }}
                />
              <Text style={styles.smallText}>Mercado pago</Text>
            </TouchableOpacity>
            </View>
          </View>
          
          <View style={{alignItems:'center', marginTop:20, paddingBottom:10}}>
            <View>
            <Button disabled={this.state.disabled} title="Terminar" onPress={()=>this.publicarProducto()} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
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

