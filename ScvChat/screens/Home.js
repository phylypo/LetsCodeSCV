import {
    StyleSheet, Text,
    TextInput, View,
    Button, ImageEditor,
  } from 'react-native';
  import React from 'react';
  import {GiftedChat} from 'react-native-gifted-chat';
  import firebaseSvc from '../FirebaseSvc';

  type Props = {
    name?: string,
    email?: string,
    avatar?: string,
  };

export default class Home extends React.Component<Props> {

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
      name: this.props.navigation.name,
      email: this.props.navigation.email,
      avatar: this.props.navigation.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }

  render() {
    return (
      <View style={{display: 'flex',
        flex: 1,
        flexDirection: 'column'}}>
          <GiftedChat
            messages={this.state.messages}
            onSend={firebaseSvc.send}
            user={this.user}
          />
      </View>
    );
  }

componentDidMount() {
    console.log(this.props)
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    firebaseSvc.refOff();
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