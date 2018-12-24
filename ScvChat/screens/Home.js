import {StyleSheet,  View,} from 'react-native';
import React from 'react';
import Chat from '../components/Chat';

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
      <View style={{
        flex: 1,
        flexDirection: 'column'}}>
          <Chat
            name={this.user.name}
            email={this.user.email}
            avatar={this.user.avatar}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    view: {
      borderColor: '#111111',
    },
    jewl: {
        width: '30px', 
        height: '30px', 
    },
    hello:{
        borderColor:'#111111'
    }
});