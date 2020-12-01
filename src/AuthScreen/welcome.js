import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage, Dimensions} from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import Colors from '../configs/colors';
import { LinearGradient } from 'expo-linear-gradient'
import Carousel from 'simple-carousel-react-native';
import * as Expo from 'expo';
const {width, height} = Dimensions.get('screen')
export default class Welcome extends Component {
  //Login con google
  constructor(){
    super()
    
  }
  async componentDidMount(){
    await AsyncStorage.removeItem('accToken')
    await AsyncStorage.removeItem('userId')
  }
  render() {
    return (
      <LinearGradient style={styles.container} colors={['#e5e5e5', '#e5e5e5']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}>
        <View style={styles.carousel}>
        <Carousel backgroundColor='transparent' color={Colors.primary} height={height-120} bubbleHeight={7} bubbleWidth={7}>
          <View style={styles.carousel}>
          <Text style={{fontSize:24, fontWeight:'bold'}}>
              ¡Bienvenido a Corley!
            </Text>
            <View style={{justifyContent:'center', marginTop:20}}>
          <Image
            source={require('../../assets/undraw_missed_chances_k3cq.png')}
            style={{ width: 310, height: 225, marginVertical:22}}
          />
          </View>
          <View style={{width:220, height:64, marginTop:10}}>
            <Text style={{fontSize:18, textAlign:'center'}}>
              Corley es la primera aplicación en la Argentina que promueve Sharing Economy!
            </Text>
            </View>
          </View>
          
          <View style={styles.carousel}>
          <Text style={{fontSize:24, fontWeight:'bold'}}>
              Generá
            </Text>
            <View style={{justifyContent:'center', marginTop:20}}>
          <Image
            source={require('../../assets/undraw_business_deal_cpi9.png')}
            style={{ width: 310, height: 225, marginVertical:22}}
          />
          </View>
          <View style={{width:220, height:64, marginTop:10}}>
            <Text style={{fontSize:18, textAlign:'center'}}>
              Una ganancia asegurada poniendo en alquiler lo que ya no necesitás
            </Text>
            </View>
          </View>
          
          <View style={styles.carousel}>
          <Text style={{fontSize:24, fontWeight:'bold'}}>
              Empezá
            </Text>
            <View style={{justifyContent:'center', marginTop:20}}>
          <Image
            source={require('../../assets/undraw_celebration_0jvk.png')}
            style={{ width: 310, height: 225, marginVertical:22}}
          />
          </View>
          <View style={{width:220, height:64, marginTop:10}}>
            <Text style={{fontSize:18, textAlign:'center'}}>
              A alquilar o poner algo en alquiler para generar ganancia con Corley !
            </Text>
            </View>
          </View>
        </Carousel>
        </View>
        
        <View style={styles.below}>
          <View style={{flex:1, margin:20, justifyContent:'center',flexDirection:'row'}}>
            <View style={styles.buttonView}>
            <Button title="Login" onPress={()=>this.props.navigation.navigate('Login')} buttonStyle={{borderRadius:50, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
            </View>
            <Button title="Crear cuenta" onPress={()=>this.props.navigation.navigate('Register')} titleStyle={{color:'#7B38C2'}} type="outline" buttonStyle={{borderRadius:50, paddingHorizontal:20, borderColor:'#7B38C2', marginVertical:10, borderWidth:3}}></Button>
          </View>
        </View>
        
      </LinearGradient>

    );
  }
}

const styles = StyleSheet.create({
    container:{flex: 1, alignItems:'center'},
    carousel: {flex: 2, alignItems: "center", justifyContent:'center', flexGrow:2, color:'#fff', paddingBottom:20},
    below:{
      justifyContent:'center',
      flexDirection:'row',
      alignItems:'center'
    },
    buttonView:{
      width:150,
      marginHorizontal:10
    }

    
})