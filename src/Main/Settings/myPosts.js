import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import Colors from '../../configs/colors'
import CardPost from '../../components/cardPosts'
const {height, width} = Dimensions.get('window');

export default class MyPosts extends Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:Colors.background }}>
      
      <ScrollView style={{flex: 1}}>
        <FlatList
          data={this.props.navigation.getParam("products")}
          keyExtractor={item=>item.url}
          renderItem={({ item }) => (
            <CardPost title={item.name} 
            description={item.description} 
            rating={Math.floor(Math.random() * 5) + 1 }
            publicador={item.owner}
            pricePerHour={item.price_per_hour}
            isOwner={item.isOwner}
            ownerId={item.owner_id}
            productId={item.url}
            imageSrc={item.imageSrc?item.imageSrc:require('../../../assets/productImage.png')}/>
          )}
        />

          
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
    imgProducto:{
      width:width/4, 
      height:height/4,
      margin: 10,
    },
     root: {
        flex: 1,
        marginTop: 15,
        backgroundColor: "#FFF",
        flexWrap: "wrap",
        elevation: 3,
        borderRadius: 2,
        borderColor: "#CCC",
        borderWidth: 3,
        width:359,
        height:height/2.5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowColor: "#000",
      },
      cardBody: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      bodyContent: {
        flex: 1,
        width:250,
        paddingTop: 24,
        alignItems:'flex-start'
      },
      titleStyle: {
        color: "#000",
        paddingBottom: 12,
        fontSize: 24,
      },
      subtitleStyle: {
        color: "#000",
        opacity: 0.5,
        fontSize: 14,
        lineHeight: 16,
        height:30,
        flexWrap:'nowrap',
        overflow:'hidden'
      },
      
      actionBody: {
        flexDirection: "row",
        padding: 8
      },
      actionButton1: {
        height: 36,
        padding: 8
      },
  })