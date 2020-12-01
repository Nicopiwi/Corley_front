import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, AsyncStorage, KeyboardAvoidingView} from 'react-native';
import Constants from 'expo-constants';
import { Image, Rating, Button, CheckBox } from 'react-native-elements'
import Colors from '../../configs/colors'
import { StackActions, NavigationActions } from 'react-navigation';
import { TextInput, Paragraph, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import APIs from '../../data_apis';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import MyInputAuth from '../../components/inputAuth'
import PropTypes from 'prop-types';

const {height, width} = Dimensions.get("screen")

const returnToMain = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
});



export default class ProductSettings extends React.Component {
  constructor(){
    super()
    this.state={imageUri1:null, imageUri2:null, imageUri3:null, imageUri4:null, imageUri1Changed:null, imageUri2Changed:null, imageUri3Changed:null, imageUri4Changed:null, productName:'', modalVisibleImage:false, modalVisibleCategory:false, categoria:'Hogar', cambioCategoria:false, price:'', imageNum:1}
  }

  componentDidMount = async()=>{
    this.getPermissionAsync()
    switch(this.props.navigation.getParam('photos').length){
      case 1:
        this.setState({imageUri1:this.props.navigation.getParam('photos')[0].photos})
        break;
      case 2:
        this.setState({imageUri1:this.props.navigation.getParam('photos')[0].photos, imageUri2:this.props.navigation.getParam('photos')[1].photos})
        break;
      case 3:
        this.setState({imageUri1:this.props.navigation.getParam('photos')[0].photos,imageUri2:this.props.navigation.getParam('photos')[1].photos,
        imageUri3:this.props.navigation.getParam('photos')[2].photos})
        break;
      case 4:
        this.setState({imageUri1:this.props.navigation.getParam('photos')[0].photos, imageUri2:this.props.navigation.getParam('photos')[1].photos,
        imageUri3:this.props.navigation.getParam('photos')[2].photos, imageUri4:this.props.navigation.getParam('photos')[3].photos
        })
        break;
        
    }
    
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

  _showDialogImage = (imageNum) => this.setState({ modalVisibleImage: true, imageNum });
  _hideDialogImage = () => this.setState({ modalVisibleImage: false});
  _showDialogCategory = () => this.setState({ modalVisibleCategory: true });
  _hideDialogCategory = () => this.setState({ modalVisibleCategory: false, cambioCategoria:true});

  async modifyProduct(){
    
    try{
      let res = await axios.patch(this.props.navigation.getParam("productId"))
      this.props.navigation.dispatch(returnToMain);
    }
    catch(e){
      console.log(e)
    }
    
  }
  async updatePhotos(){
    var myPhotos = [this.state.imageUri1, this.state.imageUri2, this.state.imageUri3, this.state.imageUri4]
    try{
      this.props.navigation.getParam('photos').map(async (photo, index)=>{
        if (photo.photos!==myPhotos[index]){
          
          const dataImage = new FormData();

            dataImage.append('photos', {
                uri: photo.photos,
            });
            dataImage.append('user',userId)
      
          await axios.patch(myPhotos[index].url, dataImage)
        }
      })
    }
    catch(e){

    }
  }
  render() {

    
    return (
      <PaperProvider>
      <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={-230} behavior="padding">
        <ScrollView style={{flex:1}}>
          <View style={{alignItems:'center', marginTop:90}}>
            <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Configuración del producto</Text>
          </View>
          <View style={{marginTop:35, paddingLeft:20}}>
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
            <Text style={{fontSize:18, lineHeight:24, fontWeight:'bold', marginTop:16}}>Precio por hora</Text>
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

            <Button title="Guardar" onPress={()=>this.updatePhotos()}  
              buttonStyle={{borderRadius:50, width:width-80, 
                backgroundColor:'#7B38C2', 
            }
            }
              disabledStyle={{borderRadius:50, width:width-80, 
                backgroundColor:'#7B38C2', 
                }}></Button>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
                  onIconPress={()=>this.setState({categoria:'Hogar'})}
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
                  onIconPress={()=>this.setState({categoria:'Ropa'})}
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
                  onIconPress={()=>this.setState({categoria:'Herramientas'})}
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
                  onIconPress={()=>this.setState({categoria:'Computacion'})}
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
                  onIconPress={()=>this.setState({categoria:'Videojuegos'})}
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
                  onIconPress={()=>this.setState({categoria:'Accesorios'})}
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
                  onIconPress={()=>this.setState({categoria:'Deporte'})}
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
                  onIconPress={()=>this.setState({categoria:'Otros'})}
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
      </PaperProvider>
    );
  }
}

ProductSettings.propTypes = {
  photos: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.background,
  },
  
});