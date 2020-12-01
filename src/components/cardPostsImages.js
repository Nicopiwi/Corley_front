import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import { Divider, Card, Button, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';

const {height, width} = Dimensions.get('window');
class CardPostImage extends React.Component {
    render() {
        return (
            <View style={styles.root}>
              <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate('ProductScreen', this.props)}>
                            <Image style={styles.imgProducto} source={this.props.imageSrc}></Image>
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <Text style={{fontWeight: '500', marginLeft: 10, marginTop:10}}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
          );}
}

CardPostImage.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    publicador: PropTypes.string,
    rating: PropTypes.number,
    isOwner: PropTypes.bool.isRequired
};

CardPostImage.defaultProps={
  publicador: 'Usuario de Corley',
  rating:1
}


export default withNavigation(CardPostImage);


const styles = StyleSheet.create({
    root:{
        width:width/4, 
        height:height/4,
        margin: 10,
        borderWidth:2,
        borderRadius:5
      },
      imgProducto:{
        flex:1,
        height:null,
        width:null,
        resizeMode:'cover'
    }
  });
  