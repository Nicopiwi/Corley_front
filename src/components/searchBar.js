import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Input, Icon } from 'react-native-elements'
let {width, height} = Dimensions.get('window')


export default class SearchBar extends React.Component {
  constructor(){
    super()
    this.state={onError:false}
  }
  
  
  render() {
    return (
        
        <View style={styles.searchBar}>
          <Icon name="search" type="ionicons" containerStyle={{padding:17}} color="#7b38c2"></Icon>
          <TextInput style={{flex:1, color:'#b792dd'}} 
          placeholder={this.props.placeholder} 
          placeholderStyle={{fontStyle:'italic' }} 
          placeholderTextColor="#e2d4f0"
          value={this.props.value}
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={this.props.onChangeText}></TextInput>
        </View>
          
    );
  }
}

const styles = StyleSheet.create({
    searchBar:{
        height:55,
        backgroundColor:'#fff',
        marginVertical:10,
        width:width-35,
        borderRadius:50,
        marginHorizontal:17,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
  
});