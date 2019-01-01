
import React from 'react'
import { Provider } from 'react-redux'
import AppNavigator from './navigation/AppNavigator'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import chatReducer from './store/ChatStore'
import { Font } from 'expo'; //     "expo-font": "1.1.0", to fix expo expo-font issue

const store = createStore(chatReducer,  applyMiddleware(thunk));

const App = () =>
  <Provider store={store}>
    <AppNavigator />
  </Provider>

export default App