import React from 'react';
import {
  AsyncStorage, StatusBar,
  View, Text,Platform,
} from 'react-native';
import {  createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Icon } from 'expo';
import { styles } from './styles'

export class HomeScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "test email"
    };
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const emailStr = await AsyncStorage.getItem('email');
    console.log("HomeScreen email Async:" + emailStr);
    this.setState({email: emailStr});
  };
  static navigationOptions = {
    title: 'Welcome to the app!'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Email: {this.state.email}</Text>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="More detail" onPress={this._goDetail} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }
  _goDetail = () => {
    this.props.navigation.navigate('Detail');
  };
  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

export class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="More detail" onPress={this._goDetail} />
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
  _goDetail = async () => {
    this.props.navigation.navigate('Detail');
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

export class OtherDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go Home" onPress={this._goHome} />
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
  _goHome = async () => {
    this.props.navigation.navigate('Home');
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

export const HomeStk = createStackNavigator({
  Home: HomeScreen,
  Other: OtherScreen,
  Detail: OtherDetailScreen,
});

HomeStk.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
      focused={focused}
      size={26}
      style={{ marginBottom: -3 }}
      color="red"
    />
  ),
};

export class ProfileScreen extends React.Component {
  render() {
    return(
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
    );
  }
}
ProfileScreen.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name={
        Platform.OS === 'ios'
          ? `ios-contact${focused ? '' : '-outline'}`
          : 'md-contac'
      }
      focused={focused}
      size={26}
      style={{ marginBottom: -3 }}
      color="red"
    />
  ),
};

export class Settingscreen extends React.Component {
  render() {
    return(
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
    );
  }
}
Settingscreen.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name={
        Platform.OS === 'ios'
          ? `ios-settings${focused ? '' : '-outline'}`
          : 'md-settings'
      }
      focused={focused}
      size={26}
      style={{ marginBottom: -3 }}
      color="red"
    />
  ),
};
export const HomeTab = createBottomTabNavigator({
  Home: HomeStk,
  Profile: ProfileScreen,
  Settings: Settingscreen,
});

//export default HomeTab;