//IMPORT LIBRARY
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import rpm from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import indexReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['authAPI'],
  // blacklist: ['products'],
};

const persistedReducer = persistReducer(persistConfig, indexReducer);

//MIDDLWARE
const logger = createLogger();
const enhancers = applyMiddleware(rpm, logger);

let store = createStore(persistedReducer, enhancers);
let persistor = persistStore(store);

export {store, persistor};
