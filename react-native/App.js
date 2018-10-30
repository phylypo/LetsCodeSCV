import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import { styles } from './styles';

import { LoginStack } from './Login';
import { HomeTab } from './Home';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('validuser');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Home' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Home: HomeTab,
    Login: LoginStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default App;
