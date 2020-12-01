import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TextInput, Dimensions, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
const { height, width } = Dimensions.get('window')
import PubNubReact from 'pubnub-react';
import axios from 'axios';
messages = [{text:'Holaa', foreign:false}, {text:'Como estás? Te cuentoo, el pruducto no está en stock ahora, pero lo va estar en unas semanas', foreign:true}, {text:'Bueno la reconcha de tu madre, no te alquilo nada', foreign:false}]

export default class App extends React.Component {
  constructor(){
    super()
    this.state={messages:[], _myId:1, userIds:[], messageIds:[], myMessage:''}
    this.pubnub = new PubNubReact({ publishKey: 'pub-c-79a9b7b8-3392-4104-8357-a5e3144ef2b3', subscribeKey: 'sub-c-adc0e014-0a15-11ea-993a-32c7c2eb6eff' });
    this.pubnub.init(this);
  }
  async deleteChat(){
    await axios.delete(this.props.navigation.getParam('chatId',''))
  }
  async getUserId(){
    let userId = await AsyncStorage.getItem('userId')
    return userId
  }
 async componentDidMount() {
   let userId = await AsyncStorage.getItem('userId')
   let userPkParts= userId.split('/')
   let userPk = userPkParts[userPkParts.length-2]
   this.setState({messages:[], _myId:userPk})
    this.pubnub.subscribe({ channels: [this.props.navigation.getParam('chatToken')], withPresence: true });
    
    this.pubnub.getMessage(this.props.navigation.getParam('chatToken'), (msg) => {
      this.setState({messages:[...this.state.messages, msg]})
      //this.setState({userIds:[...this.state.userIds, msg.message[0].user._id]})
      //this.setState({messageIds:[...this.state.messageIds, msg.message[0]._id]})
        console.log(msg);
        console.log(this.state.messages)
        console.log(this.state.messageIds)
      
    });
    
    this.pubnub.getStatus((st) => {
      console.log(st);
      //this.pubnub.publish({ message: 'hello world from react', channel: 'channel1' });
    });
  }
  
  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: [this.props.navigation.getParam('chatToken')] });
  }
  
  onSend(messages = []) {
    this.pubnub.publish({
      message: messages,
      channel: this.props.navigation.getParam('chatToken'),
    });
    this.setState({myMessage:''})
    console.log(messages)

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <ScrollView style={{flex:1, paddingTop:10, paddingHorizontal:15, minHeight:height-220}}>
          {this.state.messages != []?(
            <FlatList
              data={this.state.messages}
              keyExtractor={({item, index})=>index}
              renderItem={({ item, index }) => (
                <View style={{minHeight:36, elevation:3, backgroundColor:item.message.userId!==this.state._myId?'#fff':'#B792DD', borderRadius:7, width:248, marginVertical:6, alignSelf:item.message.userId!==this.state._myId?'flex-start':'flex-end'}}>
                  <Text style={{color:item.message.userId!==this.state._myId?'#4a4a4a':'#fff', padding:6, fontSize:18}}>{item.message.text}</Text>
                </View>
              )}
            />):null
          }
          </ScrollView>
          
        </ScrollView>
        <View style={{height:62, backgroundColor:'#fff', flexDirection:'row', alignItems:'center'}}>
            <View style={{width: width-75, height:47, backgroundColor:'#f2f2f2', borderRadius:50, marginLeft:13}}>
              <TextInput style={{flex:1, justifyContent:'center', paddingLeft:10}} value={this.state.myMessage} onChangeText={(text)=>this.setState({myMessage:text})}>
              
              </TextInput>
            </View>
            <TouchableOpacity style={{height:47, width:47, borderRadius:47, marginLeft:7, backgroundColor:'#7B38C2', alignItems:'center', justifyContent:'center'}} onPress={()=>this.onSend({text:this.state.myMessage, userId:this.state._myId})}>
              <Image source={require('../../../../assets/sendButton.png')}></Image>
            </TouchableOpacity>
          </View>
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
});

