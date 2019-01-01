import {StyleSheet,  View,} from 'react-native';
import React from 'react';
import Chat from '../components/Chat';
import styles from './Styles';
import * as firebaseSvc from '../services/FirebaseSvc';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    console.log("Home -- constructor this.props:" + JSON.stringify(this.props));
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Lobby',
  });

  get user() {
    return {
      name: this.props.screenProps.name,
      email: this.props.screenProps.email,
      avatar: this.props.screenProps.avatar,
    };
  }

  render() {
    console.log("Home render() ");
    return (
      <View style={styles.homeView}>
          <Chat
            user={this.user}
            title="Lobby Messages"
            sendMessageFunc={firebaseSvc.sendLobby}
            refOn={firebaseSvc.refOnLobby}
            refOff={firebaseSvc.refOffLobby}
            param=""
          />
      </View>
    );
  }

  componentDidUpdate() {
    console.log("Home - componentDidUpdate");
    this.forceUpdate(); // still not refresh blank screen when switching between tab
  }

}
