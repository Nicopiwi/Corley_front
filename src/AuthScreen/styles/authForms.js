import { StyleSheet, StatusBar } from 'react-native';
import Colors from '../../configs/colors';
const StylesAuth = StyleSheet.create({
    backButton:{
        borderRadius: 40,
        position: 'absolute',
        backgroundColor:'transparent',
        width: 50,
        height: 50,
        left: 20,
        top:20
    },
    forwardButton:{
        borderRadius: 40,
        backgroundColor: '#9cd9f3',
        width: 50,
        position:'absolute',
        height: 50,
        left: 290,
        bottom: 10
    },
    wrapper: {
      display: 'flex',
      justifyContent:'center',
      paddingTop:96,
      flex: 1,
      backgroundColor: Colors.primary,
    },
    form:{
      flex:1,
      //paddingTop:StatusBar.currentHeight,
      borderBottomWidth:0.5,
      borderBottomColor:'#fff',
      paddingLeft:15,
    },
    last:{
      padding:20,
      
    },
    scrollViewWrapper: {
      marginTop: 70,
      flex: 1,
      padding: 0,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    
    loginHeader: {
      fontSize: 30,
      color: 'white',
      fontWeight: '300',
      borderBottomWidth:0.5,
      borderBottomColor:Colors.lightBlue,
      marginBottom: 40,
      position:'absolute',
      left:22,
    },
    notificationWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  export default StylesAuth;