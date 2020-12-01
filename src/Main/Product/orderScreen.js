import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, AsyncStorage, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { Image, Rating, Button } from 'react-native-elements'
import Colors from '../../configs/colors'
const {height, width} = Dimensions.get("screen")
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios';
import APIs from '../../data_apis';
import DatePicker from 'react-native-datepicker'
import { TextInput, Paragraph, Dialog, Switch, Portal, Provider as PaperProvider } from 'react-native-paper';

const returnToMain = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen'})],
});



export default class OrderScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {start_date:new Date(), final_date:new Date(), dateParticular:new Date(), days:false, modalVisibleDate:false, hourStart:1, hourEnd:24, openedStartDialog:null}
  }
  static navigationOptions=({navigation})=>{return{
    headerTitle:`Pedido de ${navigation.getParam('title')}`
  }}
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

validateAndNext =()=>{
  if(!this.state.hourStart<=this.state.hourEnd){
    console.log('params')
    console.log({...this.props.navigation.state.params, ...this.state})
    this.props.navigation.navigate('ChoosePaymentMethod', {...this.props.navigation.state.params, ...this.state})

  }
  
}

toggleSwitch1 = (value) => {
  this.setState({days: value})
  
}

_showDialogDate = (num) => this.setState({ modalVisibleDate: true, openedStartDialog:num===0});
_hideDialogDate = () => this.setState({ modalVisibleDate: false});


  componentDidMount(){
    //console.log(this.props.navigation.state.params)
    var d = new Date()
  }
    async receiveProduct(params){
        let userId = await AsyncStorage.getItem('userId')
        console.log(this.state.final_date)
        var date1 = new Date(this.state.start_date); 
        var date2 = new Date(this.state.final_date); 
    
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        var Difference_In_Hours = Difference_In_Time / (1000 * 3600); 
        var price = Difference_In_Hours * params.pricePerHour //Cambiar luego cuando esté la opcion de por día. ESTA HARDCODEADO
        try{
          var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
          RCTNetworking.clearCookies(()=>{});
          let res = await axios.post(APIs.rest.orders,{
            price:price,
            start_date:this.state.start_date,
            final_date:this.state.final_date,
            state:'Buenos Aires',
            product:params.productId,
            product_owner:params.ownerId,
            client:userId
          })
          console.log(res)
          alert(`Le has pedido a ${params.publicador} el uso de ${params.title}, en un tiempo de ${Difference_In_Hours} horas. El costo es de $${price}`)
          this.props.navigation.dispatch(returnToMain);
        }
        catch(e){
          console.log(e)
        }
      }
  _handleHourStart(n){
    return this.state.hourStart>=n?(n-1):this.state.hourStart
  }

  render() {

    
    return (
      <PaperProvider>
      <View style={styles.container}>
        <View style={{alignItems:'center', marginTop:90}}>
              <Text style={{fontSize:24, lineHeight:32, fontWeight:'bold'}}>Tiempo de uso</Text>
              
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:20, width:width}}>
          <Text style={{fontSize:18, fontWeight:'bold'}}>Uso en el día</Text>
          <Switch
        value={this.state.days}
        color='#470091'
        onValueChange={() =>
          { this.setState({ days: !this.state.days }); }
        }
      />
        </View>
        {!this.state.days?(<View style={{flex:1, marginTop:60}}>
          <Text style={{fontSize:18}}>Fecha de recibo estimada</Text>
          <DatePicker
          style={{width: 200}}
          date={this.state.start_date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={new Date()}
          maxDate="2045-06-01"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              padding:10,
              borderWidth:5,
              borderColor:'#470091',
              borderRadius:50,
              backgroundColor:'#470091'
            },
            dateInput: {
              marginLeft: 36,
              borderWidth:0,
              borderRadius:50,
              backgroundColor:'white',
              color:'#470091'
            },
            dateText: {
              color:'#470091',
              fontWeight:'bold',
            }
          }}
          onDateChange={(date) => {this.setState({start_date: date})}}
        />
        <Text style={{fontSize:18, marginTop:24}}>Fecha de entrega estimada</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.final_date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={new Date()}
          maxDate="2045-06-01"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              padding:10,
              borderWidth:5,
              borderColor:'#470091',
              borderRadius:50,
              backgroundColor:'#470091'
            },
            dateInput: {
              marginLeft: 36,
              borderWidth:0,
              borderRadius:50,
              backgroundColor:'white',
              color:'#470091'
            },
            dateText: {
              color:'#470091',
              fontWeight:'bold',
            }
          }}
          onDateChange={(date) => {this.setState({final_date: date})}}
        />
      </View>):(<View style={{flex:1, marginTop:60}}>
        <Text style={{fontSize:18, color:'#4A4A4A', marginBottom:15}}>Fecha de uso</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.dateParticular}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={new Date()}
          maxDate="2045-06-01"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              padding:10,
              borderWidth:5,
              borderColor:'#470091',
              borderRadius:50,
              backgroundColor:'#470091'
            },
            dateInput: {
              marginLeft: 36,
              borderWidth:0,
              borderRadius:50,
              backgroundColor:'white',
              color:'#470091'
            },
            dateText: {
              color:'#470091',
              fontWeight:'bold',
            }
          }}
          onDateChange={(date) => {this.setState({dateParticular: date})}}
        />
        <View style={{marginTop:20, flexDirection:'row', width:width-180, alignItems:'space-around'}}>
          <View style={{flex:1}}>
            <Text style={{fontSize:18, color:'#4A4A4A'}}>Desde</Text>
            <TouchableOpacity onPress={()=>this._showDialogDate(0)} style={{height:50, borderRadius:50, 
              width:75, justifyContent:'center', 
              marginTop:15, backgroundColor:"#fff"}}>
              <Text style={{color:'#7B38C2', textAlign:'center'}}>{this.state.hourStart} hs</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:18, color:'#4A4A4A'}}>Hasta</Text>
            <TouchableOpacity onPress={()=>this._showDialogDate(1)} style={{height:50, borderRadius:50, 
              width:75, justifyContent:'center', 
              marginTop:15, backgroundColor:"#fff"}}>
              <Text style={{color:'#7B38C2', textAlign:'center'}}>{this.state.hourEnd} hs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>)}
        
      <Button title="Siguiente" onPress={()=>this.validateAndNext()} buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}></Button>
      </View>
      <Portal>
          
          <Dialog
             visible={this.state.modalVisibleDate}
             onDismiss={this._hideDialogDate}>
            <Dialog.Content>
              <ScrollView style={{height:200}}>
              
              {this.state.openedStartDialog?<TouchableOpacity disabled={this.state.hourEnd<=1 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:1}:{hourEnd:1})}><Text style={{ padding: 20, fontSize: 20 }}>01</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=2 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=2 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:2}:{hourEnd:2, hourStart:this._handleHourStart(2)})}><Text style={{ padding: 20, fontSize: 20 }}>02</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=3 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=3 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:3}:{hourEnd:3, hourStart:this._handleHourStart(3)})}><Text style={{ padding: 20, fontSize: 20 }}>03</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=4 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=4 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:4}:{hourEnd:4, hourStart:this._handleHourStart(4)})}><Text style={{ padding: 20, fontSize: 20 }}>04</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=5 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=5 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:5}:{hourEnd:5, hourStart:this._handleHourStart(5)})}><Text style={{ padding: 20, fontSize: 20 }}>05</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=6 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=6 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:6}:{hourEnd:6, hourStart:this._handleHourStart(6)})}><Text style={{ padding: 20, fontSize: 20 }}>06</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=7 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=7 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:7}:{hourEnd:7, hourStart:this._handleHourStart(7)})}><Text style={{ padding: 20, fontSize: 20 }}>07</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=8 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=8 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:8}:{hourEnd:8, hourStart:this._handleHourStart(8)})}><Text style={{ padding: 20, fontSize: 20 }}>08</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=9 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=9 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:9}:{hourEnd:9, hourStart:this._handleHourStart(9)})}><Text style={{ padding: 20, fontSize: 20 }}>09</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=10 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=10 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:10}:{hourEnd:10, hourStart:this._handleHourStart(10)})}><Text style={{ padding: 20, fontSize: 20 }}>10</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=11 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=11 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:11}:{hourEnd:11, hourStart:this._handleHourStart(11)})}><Text style={{ padding: 20, fontSize: 20 }}>11</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=12 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=12 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:12}:{hourEnd:12, hourStart:this._handleHourStart(12)})}><Text style={{ padding: 20, fontSize: 20 }}>12</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=13 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=13 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:13}:{hourEnd:13, hourStart:this._handleHourStart(13)})}><Text style={{ padding: 20, fontSize: 20 }}>13</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=14 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=14 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:14}:{hourEnd:14, hourStart:this._handleHourStart(14)})}><Text style={{ padding: 20, fontSize: 20 }}>14</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=15 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=15 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:15}:{hourEnd:15, hourStart:this._handleHourStart(15)})}><Text style={{ padding: 20, fontSize: 20 }}>15</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=16 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=16 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:16}:{hourEnd:16, hourStart:this._handleHourStart(16)})}><Text style={{ padding: 20, fontSize: 20 }}>16</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=17 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=17 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:17}:{hourEnd:17, hourStart:this._handleHourStart(17)})}><Text style={{ padding: 20, fontSize: 20 }}>17</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=18 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=18 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:18}:{hourEnd:18, hourStart:this._handleHourStart(18)})}><Text style={{ padding: 20, fontSize: 20 }}>18</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=19 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=19 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:19}:{hourEnd:19, hourStart:this._handleHourStart(19)})}><Text style={{ padding: 20, fontSize: 20 }}>19</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=20 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=20 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:20}:{hourEnd:20, hourStart:this._handleHourStart(20)})}><Text style={{ padding: 20, fontSize: 20 }}>20</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=21 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=21 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:21}:{hourEnd:21, hourStart:this._handleHourStart(21)})}><Text style={{ padding: 20, fontSize: 20 }}>21</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=22 && this.state.openedStartDialog)?<TouchableOpacity disabled={this.state.hourEnd<=22 && this.state.openedStartDialog} onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:22}:{hourEnd:22, hourStart:this._handleHourStart(22)})}><Text style={{ padding: 20, fontSize: 20 }}>22</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=23 && this.state.openedStartDialog)?<TouchableOpacity onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:23}:{hourEnd:23, hourStart:this._handleHourStart(23)})}><Text style={{ padding: 20, fontSize: 20 }}>23</Text></TouchableOpacity>:null}
              {!(this.state.hourEnd<=24 && this.state.openedStartDialog)?<TouchableOpacity onPress={()=>this.setState(this.state.openedStartDialog?{hourStart:24}:{hourEnd:24, hourStart:this._handleHourStart(24)})}><Text style={{ padding: 20, fontSize: 20 }}>24</Text></TouchableOpacity>:null}
              </ScrollView>
            </Dialog.Content>
            
          </Dialog>
        </Portal>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.background,
  },
  
});