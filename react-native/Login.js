import React from 'react';
import {
  ActivityIndicator, AsyncStorage, StatusBar,
  View, Text,
} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import {  createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { styles } from './styles'

import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

const url = `http://${api}/events`;

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      validuser: false,
      error: "",
      data: {}
    };
    console.log("const var: url:" + url);
    //console.log("deubg host:" + manifest.debuggerHost);
    //console.log(manifest);
  }

  setEmailText = (text) => {
    console.log("setemailtext:" + text);
    this.setState({email: text});
  } 
  
  setPasswordText = (text) => {
    console.log("setpasstext:" + text);
    this.setState({password: text});
  } 
  
  render() {
    if (this.state.loading)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>
      );

    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.error}</Text>
        <FormLabel>EMAIL</FormLabel>
        <FormInput
          placeholder="Please enter email address..."
          ref={input => (this.input = input)}
          onChangeText={(text) => this.setEmailText(text)}
          defaultValue={this.state.email}
        />
        <FormLabel>PASSWORD</FormLabel>
        <FormInput
          secureTextEntry placeholder="Please enter password..." 
          onChangeText={(text) => this.setPasswordText(text)}
        />

        <Button
          title="Login" rounded icon={{name: 'home'}}
          buttonStyle={{ marginTop: 20 }}
          textStyle={{ color: '#3333ff' }}
          onPress={this._signInAsync}
        />
        <Text> &nbsp; </Text>
        <Button
          title="Create New Account" rounded 
          icon={{name: 'add'}}
          backgroundColor="green"
          buttonStyle={{ marginTop: 20 }}
          textStyle={{ color: '#3333ff' }}
          onPress={() => this.props.navigation.navigate('CreateLogin')}
        />
        {/*
        <Text>debug email: {this.state.email}</Text>
        <Text>debug password: {this.state.password}</Text>
        */}
      </View>
    );
  }

  checkResult = () =>{
    if (this.state.data === null) {
      this.setState({ 
        loading: false,
        error: "Invalid email or password. Please try again!"
      });
      console.log("checkResult: data is null. exiting...");
      print(this.state.data);
      return;
    }
    console.log(" - checkResult: Got state to check email data:");
    console.log(this.state.data);
    const gotemail = this.state.data[0].email;
    this.setState({
        loading: false, 
        validuser: true 
    });
    AsyncStorage.setItem('email', gotemail);
    AsyncStorage.setItem('validuser', "1"); // not using yet
    if (gotemail == this.state.email) {
      console.log(" -- got match email:" + gotemail);
      this.props.navigation.navigate('Home');
    } else 
      console.log(" -- not matched email:" + gotemail + " query emaiL:" + this.state.email);
      //this.props.navigation.navigate('Home');
      this.setState({ error: "Invalid email or password. Please try again!"});
  }

  _signInAsync = async () => {
    this.setState({ loading: true });
    // get data from local server http://localhost:3000/users?email=janique.costa@example.com&login.password=brownie
    const urlprefix = "http://localhost:3000/users?";
    //https://randomuser.me/api/?seed=1&seed=1&email=janique.costa@example.com&login.password=brownie
    //const urlprefix = "https://randomuser.me/api/?seed=1&" //test with device
    const url = urlprefix + "email=" + this.state.email + "&login.password=" + this.state.password;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          //data: res.results // use with randomuser.com 
          data: res           // use with localhost json-server
        }, this.checkResult); // don't get run if the navigate to a new screen
      })
      .then(res => { console.log(" _singInAsync Url:" + url); })
      .catch(error => {
        console.log(" _singInAsyncUrl Error: data error:" + error);
        this.setState({
          loading: false,
          error: error,
        });
      });
    // need to verify the output before setting and navigating
    //await AsyncStorage.setItem('validuser', "1");
    // can't access state because checkResult run at the same time
    //console.log("going to another screen. data[0] email:" + this.state.data[0].email); //when got error -- won't execute next statement
    //this.props.navigation.navigate('App'); // won't run the setstate if navigate to a new screen
  };
}

export class CreateLoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Login',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Create your login</Text>
        <Button title="Go to Signin" rounded onPress={this._goSignin} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
  _goSignin = async () => {
    this.props.navigation.navigate('Login');
  };
}

export const LoginStack = createStackNavigator({
  Login: LoginScreen,
  CreateLogin: CreateLoginScreen,
});
