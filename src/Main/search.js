import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements'
//import { SearchBar } from 'react-native-elements';
import SearchBar from '../components/searchBar'
import StylesGeneral from './styles/general';
import axios from 'axios'
import APIs from '../data_apis';
import CardPost from '../components/cardPosts';
import SimpleCardText from '../components/simpleCardText'
import Colors from '../configs/colors'
import { Chip } from 'react-native-paper';
export default class Search extends Component {
  constructor(){
    super()
    this.state = {searchText: '',show:true, category:'', hasSearched:false, hasCategory:false, resultsList:[], userId:'', loading:false}
  }

  _deleteCategory(){
    this.setState({category:'', hasCategory:false})
  }

  _returnView(){
    if(this.state.loading){
      return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
     
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )
    }
    else{
      if (this.state.resultsList.length>0){
        console.log('a')
        return(
          <FlatList
          data={this.state.resultsList}
          keyExtractor={item=>item.url}
          renderItem={({ item }) => (
            <CardPost title={item.name}
            description={item.description}
            rating={Math.floor(Math.random() * 5) + 1 }
            publicador={item.owner}
            pricePerHour={item.price_per_hour}
            isOwner={item.isOwner}
            ownerId={item.owner_id}
            stock={item.stock}
            productId={item.url}
            category={item.category}
            imageSrc={item.imageSrc?item.imageSrc:{uri:'https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg'}}/>
          )}
         
        />
        )
      }
      else{
        return <View/>
      }
    }
  }

  updateSearch = search => {
    this.setState({ searchText: search });
    if (this.state.searchText===''){
      this.setState({hasSearched:false})
    }
  };
  async componentDidMount(){
    let userId = await AsyncStorage.getItem('userId')
    this.setState({userId})
  }
  _search = async()=>{
    var newProductsWithImages = []
    this.setState({hasSearched:true, loading:true})
    console.log('Chau')
    try{
      const uri = `${APIs.rest.products}?name=${this.state.searchText}+${this.state.category?this.state.category:''}`
      let response = await axios.get(uri)
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
        product.isOwner = owner[0].url === this.state.userId
        newProductsWithImages.push(product)
      })
      console.log(newProductsWithImages)
      this.setState({resultsList:newProductsWithImages, loading:false})
    }
    catch(e){
      console.log(e)
    }
  }

 
  render() {
    return (
      <View style={StylesGeneral.completeSafeArea}>
        <SearchBar
          placeholder="Probá con generador eléctrico"
          onChangeText={this.updateSearch}
          value={this.state.searchText}
          onSubmitEditing={this._search}
          lightTheme
          />
        {!this.hasSearched ? (
          <ScrollView style={{flex:1}}>
          
          {!this.state.hasCategory?(
            <View>
              <View style={{marginBottom:10, alignItems:'center'}}>
              <SimpleCardText onPress={()=>this.setState({category:'Jardin', hasCategory:true})} color="#7B38C2" imageSrc={require('../../assets/Categorias2/Jardin.png')} texto="Jardin"></SimpleCardText>
              <SimpleCardText onPress={()=>this.setState({category:'Computacion', hasCategory:true})} color="#7B38C2" imageSrc={require('../../assets/Categorias2/Computacion.png')} texto="Computación"></SimpleCardText>
              <SimpleCardText onPress={()=>this.setState({category:'Deporte', hasCategory:true})} color="#7B38C2" imageSrc={require('../../assets/Categorias2/Deporte.png')} texto="Deporte"></SimpleCardText>
              <SimpleCardText onPress={()=>this.setState({category:'Accesorios', hasCategory:true})} color="#7B38C2" imageSrc={require('../../assets/Categorias2/Accesorios.png')} texto="Accesorios"></SimpleCardText>
              <SimpleCardText onPress={()=>this.setState({category:'Hogar', hasCategory:true})} color="#7B38C2" imageSrc={require('../../assets/Categorias2/Hogar.png')} texto="Hogar"></SimpleCardText>
              <SimpleCardText onPress={()=>this.setState({category:'Otros', hasCategory:true})} color="#7B38C2" imageSrc={require('../../assets/Categorias/undraw_questions.png')} texto="Otros"></SimpleCardText>
              {/*<SimpleCardText onPress={()=>this.setState({category:'+', hasSearched:true})} color="#7B38C2" imageSrc={require('../../assets/corli_logo.png')} texto="Sin filtro"></SimpleCardText>*/}

              {/*
              <TouchableOpacity onPress={()=>this.setState({category:'Hogar'})} style={{width:165, height:190, borderRadius:7, backgroundColor:'#fff', marginRight:15, marginLeft:5}}>
                <View style={{flex: 1}}>
                <Image containerStyle={{width:94, height:94, marginTop:10}} source={require('../../assets/Categorias/undraw_coming_home_52ir.png')}></Image>
                </View>
                <Text style={{ fontSize: 20, color:'#7B38C2', position:'absolute', top:145, left:10}}>Hogar</Text>
              </TouchableOpacity>
              */}
            </View>
            
            
            
          </View>
          ):(<View>
            {
              this.state.category!==''?(
                <Chip style={{width:120, marginLeft:20}} onClose={() => this._deleteCategory()}>{this.state.category!='+'?this.state.category:'Sin filtro'}</Chip>):null
            }
          </View>)}
        
          </ScrollView>):(
            <View style={{flex:1}}>
            
            {this._returnView()}
            </View>
          )
        }
      </View>
    );
  }
}