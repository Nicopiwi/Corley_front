import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Divider, Card, Button, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios'
import { Row } from 'native-base';

const {height, width} = Dimensions.get('window');

class CardPost extends React.Component {
    constructor(props){
      super(props)
    }

    //Esto está totalmente mal. Guardar en redux el producto seleccionado
    resetProduct = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Product', params:this.props})],
    });

    componentDidMount(){
      console.log(this.props.imageSrc)
    }
    
    _modifyTitle(t){
      if (t.length>16){
        return t.substring(0,16)+'(...)'
        
      }
      return t
    }
    _modifyDesc(d){
      if (d.length>60){
        return d.substring(0,60)+'(...)'
        
      }
      return d
    }
    render() {
        return (
          <View style={styles.container}>
          <View style={styles.card}>
            <View style={{width:136, height:144}}>
              <Image size={100} style={{width:100,height:100, margin:18}} source={this.props.imageSrc}/>
            </View>
            <View style={{marginVertical:18}}>
              <Text style={styles.cardTitle}>{this._modifyTitle(this.props.title)}</Text>
              <View style={{width:150, height:40}}>
                <Text style={styles.cardDescription}>{this._modifyDesc(this.props.description)}</Text>
              </View>
              {this.props.stock===0&&<Text style={{fontSize:12, fontWeight:"400", fontFamily:'RedHat-Regular'}}>SIN STOCK</Text>}
              <View style={this.props.stock===0?{flexDirection:'row', justifyContent:'space-between'}:null}>
                <Text style={{marginTop:7, color:'#949494', fontStyle:'italic', fontWeight:'500', fontFamily:'RedHat-Regular'}}>{`$${this.props.pricePerHour} p/hr`}</Text>
                <TouchableOpacity style={{marginTop:7}} onPress={()=> this.props.navigation.dispatch(this.resetProduct)}><Text>VER</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View> 
          );}
}

CardPost.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    publicador: PropTypes.string,
    rating: PropTypes.number,
    isOwner: PropTypes.bool.isRequired,
    onStock: PropTypes.bool
};

//El atributo 'order' puede tener los siguientes valores
//None -> No hay orden momentaneamente
//Reserved -> La orden del cliente está en el estado de reservado
//Use -> La orden del cliente está en el estado de uso

CardPost.defaultProps={
  imageSrc:{uri:'https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg'},
  publicador: 'Usuario de Corley',
  onStock:true,
  order:'None'
}


export default withNavigation(CardPost);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e5e5e5',
    fontFamily:'RedHat-Regular',
    paddingBottom: 15,
  },
  card:{
    width:width-36,
    height:144,
    marginHorizontal:18,
    flexDirection:'row',
    backgroundColor:'#fff',
    fontFamily:'RedHat-Regular',
    borderRadius:7,
    elevation:2
  },
  cardTitle:{
    fontSize:18,
    fontWeight:"600",
    fontFamily:'RedHat-Regular',
    lineHeight:22
  },
  cardDescription:{
    fontSize:12,
    color:'#bababa',
    fontFamily:'RedHat-Regular',

  }
  });
  