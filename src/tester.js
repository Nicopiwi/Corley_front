import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
} from 'react-native'
import Colors from './configs/colors'

export default class Tester extends Component {
  async componentDidMount(){

  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.lightBlue} />
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:Colors.primary
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

AppRegistry.registerComponent('App', () => App)
