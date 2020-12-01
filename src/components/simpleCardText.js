import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import Constants from 'expo-constants';

const {width, height} = Dimensions.get('screen')

export default class SimpleCardText extends React.Component {
  render() {
    return (
    <TouchableOpacity onPress={this.props.onPress} style={{height:70, width:width-40, backgroundColor:'#fff', borderRadius:7, flexDirection:'row', alignItems:'center', elevation:3, marginVertical:10}}>
        <View style={{height:75, width:75, alignItems:'center', justifyContent:'center'}}>
            <Image source={this.props.imageSrc} style={{width:46, height:46}}/>
        </View>
        <View style={{flex:1}}>
    <Text style={{fontSize:20, color:this.props.color, marginLeft:15}}>{this.props.texto}</Text>
        </View>
    </TouchableOpacity>
    );
  }
}

