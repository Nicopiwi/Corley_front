import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements'
import CreditCard from '../../components/credit-card';
import MyInputAuth from '../../components/inputAuth'
const {width, height} = Dimensions.get('screen')
import DatePicker from 'react-native-datepicker'
export default class CardData extends Component {

  constructor(props){
    super(props)
    this.state = {focusedBack:false, name:'', cardNumber:'', fechaDeVencimiento: '', ccv:'', codigoPostal:''}
  }
  _showExpiry(){
    let a = this.state.fechaDeVencimiento.split('/')
    if (a.length < 2){
      return this.state.fechaDeVencimiento
    }
    else{
      return a[0]+a[1]
    }
  }
  render() {
    
    return (
      <ScrollView style={styles.container}>
          <View style={{alignItems:'center', marginTop:90}}>
            <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Datos de la tarjeta</Text>
          </View>
          <View style={{marginTop:22, alignItems:'center'}}>
            <CreditCard
              type="visa"
              width={width-80}
              bar={'true'}
              bgColor="#470091"
              height={180}
              name={this.state.name}
              expiry={this._showExpiry()}
              ccv={this.state.ccv}
              number={this.state.cardNumber}
              focused={this.state.focusedBack?'cvc':'name'}
            />
            <KeyboardAvoidingView style={{height:300, width}}
      keyboardVerticalOffset = {-250}
      behavior = "padding">
            <ScrollView style={{marginTop:20, flex:1}}>
              <MyInputAuth
              placeholder="Nombre del titular"
              onChangeText={(text)=>{this.setState({name:text})}}
              value={this.state.name}
              color="#470091"
              onFocus={()=>this.setState({focusedBack:false})}
              />
              <MyInputAuth
              placeholder="Número de tarjeta"
              onChangeText={(text)=>{this.setState({cardNumber:text})}}
              value={this.state.cardNumber}
              color="#470091"
              onFocus={()=>this.setState({focusedBack:false})}
              />
              <MyInputAuth
              placeholder="Fecha de vencimiento (AÑO/MES)"
              onChangeText={(text)=>{this.setState({fechaDeVencimiento:text})}}
              value={this.state.fechaDeVencimiento}
              color="#470091"
              onFocus={()=>this.setState({focusedBack:false})}
              />
              <View style={{marginTop:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <MyInputAuth
                placeholder="CCV"
                onChangeText={(text)=>{this.setState({ccv:text})}}
                value={this.state.ccv}
                marginHorizontal={5}
                color="#470091"
                width={135}
                onFocus={()=>this.setState({focusedBack:true})}
                />
                <MyInputAuth
                placeholder="Código postal"
                onChangeText={(text)=>{this.setState({codigoPostal:text})}}
                value={this.state.codigoPostal}
                color="#470091"
                width={135}
                marginHorizontal={5}
                onFocus={()=>this.setState({focusedBack:false})}
                />
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <View style={{alignItems:'center'}}>
            <Button title="Siguiente" buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#e5e5e5',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });