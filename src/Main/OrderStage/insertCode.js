import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios'
import { NavigationActions, StackActions } from 'react-navigation';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import APIs from '../../data_apis';

export default class InsertCode extends React.Component {
  constructor(props){
    super(props)
  }

  goToMain = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
  });
  async _onFinishCheckingCode(isVali, cod){
    let checkCode = this.props.navigation.getParam('isOwner')?this.props.navigation.getParam('tokenData').token_client:this.props.navigation.getParam('tokenData').token_owner
    console.log(checkCode)
    if (cod===checkCode){
      if (!this.props.navigation.getParam('isOwner')){
        this._makeProductUse()
      }
      else{
        this._finishTransaction()
      }
    }
  }
  
  _miCodigo(code){
    console.log('hola')
  }

  async _makeProductUse(){
    let res = await axios.patch(this.props.navigation.getParam('orderData').url, {state: 'Producto en uso'})
    console.log(res)
    alert('Felicitaciones, ya estas usando el producto')
    this.props.navigation.dispatch(this.goToMain)
  }

  async _finishTransaction(){
    let res = await axios.delete(this.props.navigation.getParam('orderData').url)
    console.log(res)
    alert('La transacción ha terminado')
    this.props.navigation.dispatch(this.goToMain)
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{alignItems:'center', marginTop:90}}>
              <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Ingresá el código</Text>
              
        </View>
        <CodeInput
          ref="codeInputRef2"
          keyboardType="numeric"
          codeLength={6}
          autoFocus={true}
          compareWithCode={this.props.navigation.getParam('isOwner')?this.props.navigation.getParam('tokenData').token_owner:this.props.navigation.getParam('tokenData').token_client}
          onCodeChange={(code)=>this._miCodigo(code)}
          codeInputStyle={{ fontWeight: '800', height:80, width:43, backgroundColor:'#fff', color:'#7B38C2', fontSize:40, borderRadius:7}}
          onFulfill={(isValid, code) => this._onFinishCheckingCode(isValid, code)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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