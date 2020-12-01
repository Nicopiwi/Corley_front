import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-anchor-carousel'; 

const { width } = Dimensions.get('window');

const data = [
  {
    uri: 'https://i.imgur.com/GImvG4q.jpg',
    title: 'Lorem ipsum dolor sit amet',
    content: 'Neque porro quisquam est qui dolorem ipsum quia '
  },
  {
    uri: 'https://i.imgur.com/Pz2WYAc.jpg',
    title: 'Lorem ipsum ',
    content: 'Neque porro quisquam est qui dolorem ipsum '
  },
  {
    uri: 'https://i.imgur.com/IGRuEAa.jpg',
    title: 'Lorem ipsum dolor',
    content: 'Neque porro quisquam est qui'
  },
  {
    uri: 'https://i.imgur.com/fRGHItn.jpg',
    title: 'Lorem ipsum dolor',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet'
  },
  {
    uri: 'https://i.imgur.com/WmenvXr.jpg',
    title: 'Lorem ipsum ',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor '
  }
];

export default class ImageCarousel extends Component {
  componentDidMount(){
    console.log(this.props.data)
  }
  renderItem = ({ item, index }) => {
    
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={item.photos!=''?styles.item:null}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        <ImageBackground
          source={item.photos!=''?{ uri: item.photos }:null}
          style={item.photos!=''?styles.imageBackground:styles.cardBackground}
        >
          
        </ImageBackground>
        
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Carousel
        style={styles.carousel}
        data={this.props.data}
        renderItem={this.renderItem}
        itemWidth={175}
        inActiveOpacity={0.3}
        containerWidth={width - 10}
        initialIndex={this.props.initialIndex}
        pagingEnable={this.props.pagingEnable}
        ref={(c) => {
          this.numberCarousel = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    
   flex:1
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    height:130,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3
  },
  itemNoImage: {
    backgroundColor: '#e5e5e5',
  },
  imageBackground: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white'
  },
  cardBackground:{
    flex:1,
    backgroundColor:'#e5e5e5'
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  rightText: { color: 'white' },
  
});
