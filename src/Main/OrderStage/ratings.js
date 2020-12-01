import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Image, Button, Icon, Rating } from 'react-native-elements'
const {width, height} = Dimensions.get('window')
import StarRating from 'react-native-star-rating';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Ratings extends React.Component {
  constructor(){
    super()
    this.state = {
    providerRating:0,
    productRating:0
    }
  }
  
  ratingCompletedProvider(rating) {
    this.setState({providerRating:rating})
  }
  goToMain = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
  });

  ratingCompletedProduct(rating) {
    console.log(rating)
    this.setState({productRating:rating})
    console.log(this.state.productRating)
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor:'#e5e5e5' }}>
        <Icon 
        onPress={()=>console.log('hola')}
        name='close' color="#4a4a4a" containerStyle={{paddingRight:12, position:'absolute', right:20, top:30}}>
        </Icon>
        <View style={{alignItems:'center', marginTop:90}}>
              <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Ordena de producto</Text>
              <View style={{width:200, marginTop:120, alignItems:'center'}}>
              <Text style={{fontSize:18, textAlign:'center', color:'#4a4a4a'}}>Calificá al proveedor</Text>
              <View style={{marginTop:10}}>
                <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.providerRating}
                selectedStar={(rating) => this.ratingCompletedProvider(rating)}
                fullStarColor={'#470091'}
              />
            </View>

            <Text style={{fontSize:18, textAlign:'center', color:'#4a4a4a', marginTop:20}}>Calificá al producto</Text>
              <View style={{marginTop:10}}>
                <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.productRating}
                selectedStar={(rating) => this.ratingCompletedProduct(rating)}
                fullStarColor={'#470091'}
              />
            </View>
              </View>

              <Button title="Listo" onPress={()=>this.props.navigation.dispatch(this.goToMain)} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginTop:100}}></Button>
              <Button title="OMITIR" onPress={()=>this.props.navigation.dispatch(this.goToMain)} titleStyle={{color:'#7B38C2'}} type="outline" buttonStyle={{borderRadius:50, width:width-80, borderColor:'#7B38C2', marginVertical:10, borderWidth:3}}></Button>
        </View>
      </View>
    );
  }
}
