import React, { Component } from 'react';
import AppRouter from './router';

import store, { persistor } from '../src/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import LoadingView from './base_components/LoadingView';

console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <PersistGate loading={<LoadingView />} persistor={persistor}>
                <AppRouter />
              </PersistGate>
            </Provider>
          );
    }
}
