import { StyleSheet, Platform, StatusBar } from 'react-native';
import Colors from '../../configs/colors'
const StylesGeneral = StyleSheet.create({
    completeSafeArea:{
        flex:1,
        paddingTop:((Platform.OS==='android')?StatusBar.currentHeight:0)+30,
        backgroundColor:Colors.background
    }
})
export default StylesGeneral;