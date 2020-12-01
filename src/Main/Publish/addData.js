import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity, KeyboardAvoidingView, Picker, ScrollView } from 'react-native';
//import { Input } from 'react-native-elements'
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';
import axios from 'axios'
import { Button } from 'react-native-elements'
import MyInputAuth from '../../components/inputAuth'
import { StackActions, NavigationActions } from 'react-navigation';
let {width, height} = Dimensions.get('window')

export default class PublishDataGeneral extends React.Component {
  constructor(props){
    super(props)
    this.state={timeLapsePrice:'Por hora', descripcion:'', marca:'', stock:'0'}
  }

  
  render() {
    return (
      
      <KeyboardAvoidingView style={styles.container}
      keyboardVerticalOffset = {-250}
      behavior = "padding">
        <ScrollView style={{flex:1}}>
        <View style={{alignItems:'center', marginTop:90}}>
            <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Añade un producto</Text>
            
          </View>
          <View style={{marginTop:35}}>
            <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold'}}>Descripción (opcional)</Text>
            <MyInputAuth 
            marginHorizontal={0} 
            multiline={true} 
            numberOfLines={7}
            onChangeText={(text)=>{this.setState({descripcion:text})}} 
            value={this.state.descripcion}
            ></MyInputAuth>
            <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold'}}>Marca (opcional)</Text>
            <MyInputAuth 
            marginHorizontal={0}
            onChangeText={(text)=>{this.setState({marca:text})}} 
            value={this.state.marca}
            />
            <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold'}}>Stock</Text>
            <MyInputAuth 
            marginHorizontal={0}
            keyboardType="number-pad"
            onChangeText={(text)=>{this.setState({stock:text})}} 
            value={this.state.stock}
            />
             <Button title="Siguiente" onPress={()=>this.props.navigation.navigate('PublishDataFurther',{...this.state, ...this.props.navigation.state.params})} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
          </View>
         
        </ScrollView>
      </KeyboardAvoidingView>
      
    );
  }
}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  smallText:{
    fontSize:13,
    fontStyle:'italic',
    alignItems:'center',
    alignSelf:'center'
  },
  mediumText:{
    fontSize:18,
    marginBottom:10,
    fontWeight:'bold'
  },
  title:{
    fontSize:24,
    lineHeight:28,
    alignItems:'center',
    alignSelf:'center'
  }
  
});