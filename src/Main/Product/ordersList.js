import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
const {width, height} = Dimensions.get('window')



myUser = 'Nicopiwi'
ordersNoApproved = []
ordersUse = [{startDate:'16/8', endDate:'19/8', state:'Producto en uso', userName:'Nico Roz', url:'ogog', clientName:'Iñaki aran', codigo:'bbaaa'}]
ordersReserved = [{startDate:'15/8', endDate:'18/8', state:'Producto reservado', userName:'Sofi roz', url:'agag', clientName:'Iñaki aran', codigo:'123456'}, {startDate:'15/8', endDate:'18/8', state:'Producto reservado', userName:'Sofi roz', url:'igig', clientName:'eze chung', codigo:'123476'}]

export default class OrdersList extends React.Component {
  constructor(props){
    super(props)
    this.state = {option:1, selectedOrder:false, selectedOrderData:{}}
  }
  componentDidMount(){
    console.log(this.props.navigation.state.params)
  }

  _returnCode(){
    if (this.props.navigation.getParam('isOwner') && this.state.selectedOrderData.state == "Producto reservado"||this.props.navigation.getParam('isOwner') && this.state.selectedOrderData.state == "Producto en uso"){
      return (<View>
      <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Código de orden</Text>
      <Text style={{color:'#470091', fontWeight:'bold', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.codigo}</Text>
      </View>)
    }
    else{
      return null
    }
  }

  _listToShowOrders(){
    switch(this.state.option){
      case 1:
        return this.props.navigation.getParam('userOrdersNoApproved')
        break;
      case 2:
        console.log(this.props.navigation.getParam('userOrdersReserved'))
        return this.props.navigation.getParam('userOrdersReserved')
        break;
      case 3:
        return this.props.navigation.getParam('userOrdersUse')
        break;
      
    }
  }

  renderMyBody(){
    if (this.state.selectedOrder){
      console.log(this.state.selectedOrder)
      return (
        <View style={styles.root}>
          <ScrollView style={{flex:1}}>
        <View>
          <View style={styles.botoneraListas}>
            <TouchableOpacity onPress={()=>this.setState({option:1, selectedOrder:false})}>
            <Text style={this.state.option===1?styles.optionBotoneraHighlighted:styles.optionBotonera}>Esperando aprobación</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({option:2, selectedOrder:false})}>
              <Text style={this.state.option===2?styles.optionBotoneraHighlighted:styles.optionBotonera}>Reservados</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({option:3, selectedOrder:false})}>
              <Text style={this.state.option===3?styles.optionBotoneraHighlighted:styles.optionBotonera}>En Uso</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      <View style={{flex:1, alignItems:'center', marginTop:20}}>
        
        <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Proveedor</Text>
        <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.props.navigation.getParam('isOwner')?this.props.navigation.getParam('ownerName'):this.props.navigation.getParam('userName')}</Text>
        <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Solicitante</Text>
        <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{!this.props.navigation.getParam('isOwner')?this.props.navigation.getParam('userName'):this.props.navigation.getParam('ownerName')}</Text>
        <Text style={{color:'#8a8a8a', fontSize:18, fontWeight:'bold', marginTop:15}}>Plazo de uso</Text>
        {
          this.state.selectedOrderData.start_date!==this.state.selectedOrderData.end_date?(
            <View>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.start_date}</Text>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
              <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.final_date}</Text>
            </View>
          ):(<View>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.start_date}</Text>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15, textAlign:'center'}}> - </Text>
            <Text style={{color:'#3F3D56', fontSize:24, marginTop:15}}>{this.state.selectedOrderData.hourStart} - {this.state.selectedOrderData.hourEnd}</Text>
          </View>)
        }
        {this.state.selectedOrderData.state!=="Esperando confirmacion del dueño"?(<View>
          
          <Button title="VER" onPress={()=>{
            this.props.navigation.navigate('GatherWith', {orderData:this.state.selectedOrderData, isOwner:this.props.navigation.getParam('isOwner'), title:this.props.navigation.getParam('title'), tokenData:this.state.selectedOrderData.token})
          
          } 
          
          }
            buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}>
            </Button>
        </View>
        ):(<View>
          {this.props.navigation.getParam('isOwner')?<Button title="VER" onPress={()=>{
            console.log('aaaa')
            this.props.navigation.navigate('AcceptReject', {ownerName: this.props.navigation.getParam('ownerName'), order:this.state.selectedOrderData, imageSrc:this.props.navigation.getParam('imageSrc'), title:this.props.navigation.getParam('title')})
          
          } 
          
          }
            buttonStyle={{borderRadius:50, width:width-80, backgroundColor:'#7B38C2', marginVertical:10}}>
            </Button>:null
          }
          </View>)
        }
        </View>
        </ScrollView>
      </View>
      )
    }
    else{
      return (<View style={styles.root}><View>
          <View style={styles.botoneraListas}>
            <TouchableOpacity onPress={()=>this.setState({option:1, selectedOrder:false})}>
            <Text style={this.state.option===1?styles.optionBotoneraHighlighted:styles.optionBotonera}>Esperando aprobación</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({option:2, selectedOrder:false})}>
              <Text style={this.state.option===2?styles.optionBotoneraHighlighted:styles.optionBotonera}>Reservados</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({option:3, selectedOrder:false})}>
              <Text style={this.state.option===3?styles.optionBotoneraHighlighted:styles.optionBotonera} onPress={()=>this.setState({option:3})}>En Uso</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop:20}}>
          {this._listToShowOrders()!==[]?(
        <FlatList
          data={this._listToShowOrders()}
          keyExtractor={item=>item.url}
          style={{paddingBottom:10}}
          renderItem={({ item }) => (
            <TouchableOpacity style={{marginVertical:10}} onPress={()=>this.setState({selectedOrder:true, selectedOrderData:item})}>
              <Text style={{color:'#4a4a4a', fontSize:18}}>Orden del {item.start_date}</Text>
            </TouchableOpacity>
          )}
          />):<View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Text style={{textAlign:'center', fontSize:18}}>No hay</Text></View>}

        </View>
        
        </View>)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMyBody()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f2f2f2',
  },
  root:{
    width:width-70,
    height:height,
    backgroundColor:'#f2f2f2',
    borderRadius:7,
    marginTop:75
  },
  botoneraListas:{
    flexDirection:'row',
    paddingVertical:10,
    //alignItems:'space-around',
    justifyContent:'space-around',
    width:width-70
  },
  optionBotonera:{
    color:'#B792DD',
    fontSize: 14,
    lineHeight: 19,
    paddingBottom:5,
  },
  optionBotoneraHighlighted:{
    color:'#470091',
    fontSize: 14,
    lineHeight: 19,
    borderBottomWidth:3,
    borderBottomColor:'#470091',
    paddingBottom:5,
  },

});
