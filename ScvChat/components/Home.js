import {StyleSheet,  View,} from 'react-native';
import React from 'react';
import Chat from '../components/Chat';
import styles from './Styles';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
    };
  }

  render() {
    return (
      <View style={styles.homeView}>
          <Chat
            name={this.user.name}
            email={this.user.email}
            avatar={this.user.avatar}
          />
      </View>
    );
  }
}
