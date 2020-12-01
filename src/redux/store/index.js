import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'rootKey',
  storage: AsyncStorage,
  blacklist: ['product']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const initialState = {};
const middleware = [thunk];


export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);

export const persistor = persistStore(store)