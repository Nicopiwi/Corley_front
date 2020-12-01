import React from 'react';
import { Provider } from 'react-redux';
import AppRoots from './src/AppRoots';
import { store, persistor } from './src/redux/store';
import Loading from './src/loading';
import * as Expo from 'expo';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react'


export default class App extends React.Component {
  constructor(){
    super()
    this.state = {loading:false}
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <AppRoots/>
          </MenuProvider>
        </PersistGate>
      </Provider>
    );
  }
}

