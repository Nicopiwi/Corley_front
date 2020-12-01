import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';


//Params: orderId, productImage, ownerImage
export default class AcceptReject extends React.Component {
  constructor(props){
      super(props)
      this.state = {days:false}
  }

componentDidMount(){
    console.log(this.props.navigation.state.params)
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop:95, fontSize:24, color:'#000', fontWeight:'bold'}}>Petición</Text>
        <View style={{marginTop:76}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            
            <Image source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }} style={{width:100, height:100, borderRadius:50}}></Image>

            <Image style={{width:75, height:20, marginLeft:15}} source={require('../../../assets/ArrowRight.png')} />

            <Image source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }} style={{width:100, height:100, marginLeft:15}}></Image>
          </View>

          <View style={{width:250, marginTop:30}}>
          <Text style={{color:'#747474'}}>
          
          </Text>
          </View>


          {
          (this.state.days)?(
            <View>
              <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>19/8</Text>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
              <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>20/8</Text>
            </View>
          ):(<View>
            <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>19/8</Text>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
            <Text style={{color:'#470091', fontSize:24, marginTop:15, textAlign:'center', fontWeight:'bold'}}>18hs - 22 hs</Text>
          </View>)
        }

        <Button title="Aceptar" titleStyle={{color:'green'}} type="outline" buttonStyle={{borderRadius:50, borderColor:'green', marginVertical:10, borderWidth:3, marginTop:50}}></Button>
        <Button title="Rechazar" titleStyle={{color:'red'}} type="outline" buttonStyle={{borderRadius:50, borderColor:'red', marginVertical:10, borderWidth:3, marginTop:15}}></Button>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#e5e5e5',
    padding: 8,
  },
});
