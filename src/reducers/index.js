import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authReducer from './authReducer';
import restaurantReducer from './restaurantReducer';
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['loginMessage'],
  stateReconciler: autoMergeLevel2,
};

const restaurantPersistConfig = {
  key: 'restaurant',
  storage: AsyncStorage,
  whitelist: ['fullList'],
  stateReconciler: autoMergeLevel2,
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  blacklist: ['cartData'],
  stateReconciler: autoMergeLevel2,
};

const orderPersistConfig = {
  key: 'order',
  storage: AsyncStorage,
  blacklist: ['order'],
  stateReconciler: autoMergeLevel2,
};

const rootReducerPersist = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  restaurant: persistReducer(restaurantPersistConfig, restaurantReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  order: persistReducer(orderPersistConfig, orderReducer),

});

export default rootReducerPersist;
