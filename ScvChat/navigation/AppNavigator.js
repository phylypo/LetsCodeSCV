import React from 'react'
import { ActivityIndicator } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createAppCointainer } from 'react-navigation';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import MainTabNavigator from './MainTabNavigator';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';
import { sendLogoutAction, } from '../store/LoginAction';
import firebaseSvc from '../services/FirebaseSvc';

// Read more at https://reactnavigation.org/docs/en/auth-flow.html
const AuthStack = createStackNavigator({
  Login: Login ,
  Signup: CreateAccount,
});

class AppNav extends React.Component {
  
  get user() {
    console.log('...AppNavigator - get user() this.props:' + JSON.stringify(this.props)); 
    return {
      name: this.props.name,
      email: this.props.email,
      avatar: this.props.avatar,
    };
  }

  render() {
    if (this.props.isLoading) {
      return <ActivityIndicator style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }} />
    }
    if (this.props.loginSuccess) {
      return(
        <MainTabNavigator screenProps={this.user} />
      );
    }
    return(<AuthStack />);
  }
}

AppNav.propTypes = {
  loginSuccess: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  const { loginSuccess, name, email, avatar, isLoading } = state.login;
  //console.log('AppNavigator -- mapStateToProps ... props:' + JSON.stringify({ loginSuccess, name, email, avatar  }));
  return { loginSuccess, name, email, avatar, isLoading };
};

const mapDispatchToProps = {
  sendLogout: sendLogoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNav);
