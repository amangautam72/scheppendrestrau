import * as React from 'react';

import AppNavigator from './navigation/AppNavigator'

import { Provider } from 'react-redux'
import store from './redux/store'


export default function App(props) {
  
    return (
      <Provider store={store}>
      <AppNavigator></AppNavigator>
      </Provider>
    );
  
}

