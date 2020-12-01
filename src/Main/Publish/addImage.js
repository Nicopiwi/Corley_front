import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Input, CheckBox, Button, Image } from 'react-native-elements'
import Constants from 'expo-constants';
import { TextInput, Paragraph, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import MyInputAuth from '../../components/inputAuth'
const {width, height} = Dimensions.get("screen")
// You can import from local files


export default class PublishAddImage extends React.Component {
  constructor(){
    super()
    this.state={imageUri1:null, imageUri2:null, imageUri3:null, imageUri4:null, productName:'', modalVisibleImage:false, modalVisibleCategory:false, categoria:'Hogar', cambioCategoria:false, price:'', imageNum:1}
  }

  _showDialogImage = (imageNum) => this.setState({ modalVisibleImage: true, imageNum });
  _hideDialogImage = () => this.setState({ modalVisibleImage: false});
  _showDialogCategory = () => this.setState({ modalVisibleCategory: true });
  _hideDialogCategory = () => this.setState({ modalVisibleCategory: false, cambioCategoria:true});

  componentWillMount(){
    if(this.props.navigation.getParam('terminado')){
      this.props.navigation.setParams({params:{terminado:false}})
      this.props.navigation.navigate('MainScreen')
    }
  }
  
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    
    if (Constants.platform.ios) {
      await Permissions.askAsync(Permissions.CAMERA);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Disculpas, pero necesitamos permisos para la cámara!');
      }
    }
  }

  _pickImage = async () => {
    
    try{
      //this.setState({imageUri:'https://www.heavenimagenes.com/heavencommerce/781a8c66-fee1-4403-8ed0-099d1405833e/images/v2/ROMANTICA/1508011233211706_01_medium.jpg'})
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect:[4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        switch(this.state.imageNum){
          case 1:
            this.setState({ imageUri1: result.uri });
            break;
          case 2:
            this.setState({ imageUri2: result.uri });
            break;
          case 3:
            this.setState({ imageUri3: result.uri });
            break;
          case 4:
            this.setState({ imageUri4: result.uri });
            break;
        }
        
        this._hideDialogImage()
      }
    }
    catch(e){
      console.log('error')
      console.log(JSON.stringify(e))
    }
  };
  
_takePic = async() =>{
  try{
    //this.setState({imageUri:'https://www.heavenimagenes.com/heavencommerce/781a8c66-fee1-4403-8ed0-099d1405833e/images/v2/ROMANTICA/1508011233211706_01_medium.jpg'})
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect:[4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      switch(this.state.imageNum){
        case 1:
          this.setState({ imageUri1: result.uri });
          break;
        case 2:
          this.setState({ imageUri2: result.uri });
          break;
        case 3:
          this.setState({ imageUri3: result.uri });
          break;
        case 4:
          this.setState({ imageUri4: result.uri });
          break;
      }
      this._hideDialogImage()
    }
  }
  catch(e){
    console.log('error')
    console.log(JSON.stringify(e))
  }
}

  render() {
    return (
      <PaperProvider>
      <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={-230} behavior="padding">
      <ScrollView style={{flex:1}}>
      <View style={{alignItems:'center', marginTop:90}}>
            <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Añade un producto</Text>
            
          </View>
        <View style={{marginTop:35}}>
          <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold'}}>Imágenes</Text>
          <View style={{flex:1, flexDirection:'row'}}>
            
            <TouchableOpacity onPress={()=>this._showDialogImage(1)} style={{backgroundColor:'#B792DD', borderRadius:10, width:127, height:127, marginTop:16, alignItems:'center', justifyContent:'center', marginRight:10}}>
            <Image source={this.state.imageUri1?{uri:this.state.imageUri1}:require('../../../assets/Vector.png')} style={this.state.imageUri1?{width:128, height:128}:{width:54, height:54}}></Image>
              {/*<ImageBackground source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',}} style={{width:127, height:127, alignItems:'center', justifyContent:'center'}}></ImageBackground>*/}
            </TouchableOpacity>
            {this.state.imageUri1?(
            <TouchableOpacity onPress={()=>this._showDialogImage(2)} style={{backgroundColor:'#B792DD', borderRadius:10, width:127, height:127, marginTop:16, alignItems:'center', justifyContent:'center'}}>
            <Image source={this.state.imageUri2?{uri:this.state.imageUri2}:require('../../../assets/Vector.png')} style={this.state.imageUri2?{width:128, height:128}:{width:54, height:54}}></Image>
              {/*<ImageBackground source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',}} style={{width:127, height:127, alignItems:'center', justifyContent:'center'}}></ImageBackground>*/}
            </TouchableOpacity>):null
            }
          </View>
          {this.state.imageUri2?(
          <View style={{flex:1, flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>this._showDialogImage(3)} style={{backgroundColor:'#B792DD', borderRadius:10, width:127, height:127, marginTop:16, alignItems:'center', justifyContent:'center', marginRight:10}}>
            <Image source={this.state.imageUri3?{uri:this.state.imageUri3}:require('../../../assets/Vector.png')} style={this.state.imageUri3?{width:128, height:128}:{width:54, height:54}}></Image>
              {/*<ImageBackground source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',}} style={{width:127, height:127, alignItems:'center', justifyContent:'center'}}></ImageBackground>*/}
            </TouchableOpacity>
            {this.state.imageUri3?(
            <TouchableOpacity onPress={()=>this._showDialogImage(4)} style={{backgroundColor:'#B792DD', borderRadius:10, width:127, height:127, marginTop:16, alignItems:'center', justifyContent:'center'}}>
            <Image source={this.state.imageUri4?{uri:this.state.imageUri4}:require('../../../assets/Vector.png')} style={this.state.imageUri4?{width:128, height:128}:{width:54, height:54}}></Image>
              {/*<ImageBackground source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',}} style={{width:127, height:127, alignItems:'center', justifyContent:'center'}}></ImageBackground>*/}
            </TouchableOpacity>):null}
          </View>):null
          }
          <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold', marginTop:16}}>Nombre del producto</Text>
          <MyInputAuth 
          marginHorizontal={0}
          onChangeText={(text)=>{this.setState({productName:text})}} 
          value={this.state.productName}
          />
          <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold', marginTop:16}}>Precio por hora ($)</Text>
          <MyInputAuth 
          marginHorizontal={0} 
          keyboardType="number-pad"
          onChangeText={(text)=>{this.setState({price:text})}} 
          value={this.state.price}
          />
          <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold', marginTop:16}}>Categoría</Text>
          <Button title={this.state.cambioCategoria?this.state.categoria:"Elige una categoría"} onPress={this._showDialogCategory} 
          titleStyle={{color:'#B792DD', 
          textAlign:'left', alignSelf:'flex-start'}} 
          type="outline" 
          buttonStyle={{borderRadius:50, width:width-80, 
          borderColor:'#B792DD', marginVertical:10,
           marginTop:16, borderWidth:2, alignItems:'flex-start'}}></Button>
           </View>
        <Button title="Siguiente" onPress={()=>this.props.navigation.navigate('PublishDataGeneral', this.state)} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
        <Portal>
          <Dialog
             visible={this.state.modalVisibleCategory}
             onDismiss={this._hideDialogCategory}>
            <Dialog.Title>Elegí una categoría</Dialog.Title>
            <Dialog.Content>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.categoria==='Hogar'}
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  onPress={()=>this.setState({categoria:'Hogar'})}
                />
                <Text>Hogar</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.categoria==='Ropa'}
                  onPress={()=>this.setState({categoria:'Ropa'})}
                />
                <Text>Ropa</Text>
                
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  checked={this.state.categoria==='Herramientas'}
                  onPress={()=>{

                    this.setState({categoria:'Herramientas'})
                    console.log(this.state.categoria)
                  }}
                />
                <Text>Herramientas</Text>
                
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  checked={this.state.categoria==='Computacion'}
                  onPress={()=>this.setState({categoria:'Computacion'})}
                />
                <Text>Computación</Text>
                
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  uncheckedIcon='circle-o'
                  checked={this.state.categoria==='Videojuegos'}
                  onPress={()=>this.setState({categoria:'Videojuegos'})}
                />
                <Text>Videojuegos</Text>
                
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  checked={this.state.categoria==='Accesorios'}
                  onPress={()=>this.setState({categoria:'Accesorios'})}
                />
                <Text>Accesorios</Text>
                
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  uncheckedIcon='circle-o'
                  checked={this.state.categoria==='Deporte'}
                  onPress={()=>this.setState({categoria:'Deporte'})}
                />
                <Text>Deporte</Text>
                
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                  center
                  checkedColor="#470091"
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  containerStyle={{paddingVertical:2, marginVertical:2}}
                  checked={this.state.categoria==='Otros'}
                  onPress={()=>this.setState({categoria:'Otros'})}
                />
                <Text>Otros</Text>
                
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button title="ACEPTAR" onPress={this._hideDialogCategory} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
             visible={this.state.modalVisibleImage}
             onDismiss={this._hideDialogImage}>
            <Dialog.Content>
              <TouchableOpacity onPress={this._pickImage}><Text style={{ padding: 20, fontSize: 20 }}>Seleccionar foto</Text></TouchableOpacity>
              <TouchableOpacity onPress={this._takePic}><Text style={{ padding: 20, fontSize: 20 }}>Tomar foto</Text></TouchableOpacity>
            </Dialog.Content>
            
          </Dialog>
        </Portal>
       
      </ScrollView>
      </KeyboardAvoidingView>
      </PaperProvider>
    );
  }
}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    width:width,
    backgroundColor: '#e5e5e5',
    paddingLeft:20
  },
  smallText:{
    fontSize:13,
    fontStyle:'italic',
    alignItems:'center'
  },
  mediumText:{
    fontSize:18,
    marginBottom:10,
    fontWeight:'bold'
  },
  title:{
    fontSize:24,
    lineHeight:28,
    alignItems:'center'
  }
  
});
