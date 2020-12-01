import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import SearchBar from  '../../../components/searchBar'
import axios from 'axios'
import APIs from '../../../data_apis';


class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      chats: [],
      userId:''
    };
  }
  
  async componentDidMount() {
    try{
      var userId = await AsyncStorage.getItem('userId')
      this.setState({userId})
      let res = await axios.get(APIs.rest.chat)
      let appChats = res.data
      console.log(appChats)
      let myChats = appChats.filter(el => el.user1 === this.state.userId || el.user2 === this.state.userId )
      console.log(myChats)
      this.setState({chats: myChats})
    }
    catch(e){
      console.log('error chats')
      console.log(e)

    }
    
  }

  async getName(userId){
    try{
      console.log(userId)
      let res = await axios.get(userId)
      console.log(res)
      let name = res.data.first_name
      console.log(name)
      return name
    }
    catch(e){
      console.log(e)
    }
    
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then((res) => res.json())
      .then(res => {
        
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
        
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    if (this.state.page < 3){
      this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.makeRemoteRequest();
      }
      );
    }
    
  };

  renderSeparator = () => {

    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Busca conversaciones..." />;
  };

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#e5e5e5'}}>
        <SearchBar placeholder="Busca conversaciones..." />
        <FlatList
          style={{top:0}}
          data={this.state.chats}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatScreen', {chatId: item.url, userId: this.state.userId, chatToken: item.chat_token})}>
              <Text style={{fontSize:20, fontWeight:'bold'}}>
                Chat con Martin
              </Text>
            </TouchableOpacity>
          )}
        />
        
      </View>
    );
  }
}

export default ChatList;