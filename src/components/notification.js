import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator, AsyncStorage} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Divider, Card, Button, Rating, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';
import axios from 'axios'
const {height, width} = Dimensions.get('window');
class Notification extends React.Component {

  
  componentDidMount(){
    this.props.test()
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
            {!this.props.noClose?(
              <View style={{flex:1, alignItems:'flex-end'}}>
                <Button 
                onPress={this.props.onDelete}
                buttonStyle={{backgroundColor:'transparent', alignSelf:'flex-end'}} icon={{name:'close', size:15, color:'#8a8a8a'}}>
                
                </Button>
              </View>
            ):null}
            
        
          <View style={styles.card}>
          
            <View style={{width:136, height:144, alignItems:'center', justifyContent:'center'}}>
              <Avatar source={require('../../assets/user_cor.png')} size="large"/>
            </View>
            <View style={{marginVertical:18}}>
              <Text style={styles.cardTitle}>{this._modifyTitle(this.props.title)}</Text>
              <View style={{width:150, height:40}}>
                <Text style={styles.cardDescription}>{this._modifyDesc(this.props.description)}</Text>
              </View>
              <Button title="VER" onPress={this.props.handleNext} buttonStyle={{borderRadius:50, width:150, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
            </View>
          </View>
        </View> 
          );}
}

export default withNavigation(Notification);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e5e5e5',
    padding: 8,
    elevation:2
  },
  card:{
    width:width-36,
    height:144,
    marginHorizontal:18,
    flexDirection:'row',
    backgroundColor:'#fff',
    borderRadius:7
  },
  cardTitle:{
    fontSize:18,
    fontWeight:"600",
    lineHeight:22
  },
  cardDescription:{
    fontSize:12,
    color:'#bababa',

  }
  });
  