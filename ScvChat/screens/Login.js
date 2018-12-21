import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,
} from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import firebase from 'firebase';
import { auth, initializeApp, storage } from 'firebase';
import uuid from 'uuid';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Scv Chatter',
  };

  state = {
    name: 'Alex B',
    email: 'test3@gmail.com',
    password: 'test123',
  };

  // using Fire.js
  onPressLogin = async () => {
    console.log('pressing login... email:' + this.state.email);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.avatar,
    };

    const response = firebaseSvc.login(
      user,
      this.loginSuccess,
      this.loginFailed
    );
  };

  loginSuccess = (user) => {
    console.log('login successful, navigate to chat.', user);
    this.props.navigation.navigate('HomeStack', {
      name: this.state.name,
      email: this.state.email,
      avatar: user.photoURL,
    });
  };
  loginFailed = () => {
    console.log('login failed ***');
    alert('Login failure. Please tried again.');
  };


  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });


  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="test3@gmail.com"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <Button
          title="Login 2"
          style={styles.buttonText}
          onPress={this.onPressLogin}
        />

        <Button
          title="Go to create new account"
          style={styles.buttonText}
          onPress={() => this.props.navigation.navigate("CreateAccount")}
        />
      </View>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 42,
  },
});

export default Login;
