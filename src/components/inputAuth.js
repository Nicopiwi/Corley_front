import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Input, Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
let {width, height} = Dimensions.get('window')


export default class MyInputAuth extends React.Component {
  constructor(props){
    super(props)
    this.state={onError:false}
  }
  componentDidMount(){
    
  }
  /*
  Props
  -terminarError()
  -onErr
  -errorText
  */
  render() {
    return (
      
            <View style={styles.inputAuthContainer}>
              {this.props.errorText?<Text style={styles.inputTextError}>{this.props.errorText}</Text>:null}
              <View style={this.props.onErr?[styles.inputAuth, styles.inputOnError]:
                [styles.inputAuth, {marginHorizontal:this.props.marginHorizontal, height:this.props.multiline?200:55, borderRadius:this.props.multiline?7:50, width:this.props.width}]}>
                <View style={{alignSelf:'center', flex:1}}>
                  <TextInput placeholder={this.props.placeholder} 
                  style={{marginRight:25, paddingHorizontal:25, paddingTop:this.props.multiline?20:0, color:this.props.onErr?"#FF6464":this.props.color, flex:1, textAlignVertical:this.props.multiline?'top':'center'}}
                  placeholderTextColor="#B792DD"
                  secureTextEntry={this.props.isPassword}
                  onChangeText={this.props.onChangeText}
                  value={this.props.value}
                  multiline={this.props.multiline}
                  numberOfLines={this.props.numberOfLines}
                  keyboardType={this.props.keyboardType}
                  onFocus={this.props.onFocus}
                  />       
                </View>      
                {this.props.onErr?<Icon name="close" size={20} onPress={this.props.terminarError} color="#fff" containerStyle={{backgroundColor:'#FF6464', borderRadius:10, padding:2, alignSelf:'center', marginRight:12}}/>:null}
              </View>
            </View>
             
          
    );
  }
}

MyInputAuth.propTypes = {
  marginHorizontal:PropTypes.number
};

MyInputAuth.defaultProps={

marginHorizontal:27,
color:'#000',
width:width-80

}


const styles = StyleSheet.create({
  inputAuth:{
    backgroundColor:'#f2f2f2',
    //height:55,
    marginVertical:10,
    //borderRadius:50,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  inputAuthContainer:{
    //fontFamily:'Red Hat Display',
  },
  inputOnError:{
    borderWidth:3,
    borderColor: '#FF6464'
  },
  inputTextError:{
    fontStyle:'italic',
    color:'#FF6464',
    marginLeft:40,
    marginTop:10,
  }
  
});