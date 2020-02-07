import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';


import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducerPersist from '../reducers/index';

import AsyncStorage from '@react-native-community/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['auth', 'restaurant', 'cart', 'order']
};

// create global redux-persist store
const pReducer = persistReducer(persistConfig, rootReducerPersist);

// create a redux store with our reducer above and middleware
const store = createStore(
  pReducer,
  applyMiddleware(reduxLogger, ReduxThunk),
);


export const persistor = persistStore(store);
export default store;
