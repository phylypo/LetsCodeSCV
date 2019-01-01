import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import styles from './Styles'
import { sendLoginAction } from '../store/LoginAction';
import { connect } from 'react-redux';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Scv Chatter',
  };

  state = this.props.login;

  onPressLogin = () => {
    console.log('onPressLogin... state:' + JSON.stringify(this.state));
    const user = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.avatar,
    };
    this.props.sendLogin(user, this.loginSuccess, this.loginFailed);
  };

  loginSuccess = (loginUser) => {
    console.log("successCb... loginUser:" + JSON.stringify(loginUser));
    //firebaseSvc.addUserProfile(loginUser); // should not ref firebaseSvc from here -- use action
  }
  
  loginFailed = (error) => {
    console.log("failCb... error:" + JSON.stringify(error)); //"code":"auth/wrong-password"
    alert("Your login failed. Please try again." + error);
  }

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
          title="Login"
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

const mapStateToProps = state => {
  const { login } = state;
  console.log('login mapStateToProps ... state:' + JSON.stringify(state));
  console.log('login mapStateToProps ... props:' + JSON.stringify({ login }));
  return { login };
};

// need custom middleware for async func --added thunk in createStore
const mapDispatchToProps = {
  sendLogin: sendLoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
