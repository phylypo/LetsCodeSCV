import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import PropTypes from 'prop-types'
import firebaseSvc from '../FirebaseSvc';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    console.log('Chat constructor this.props:' + JSON.stringify(this.props));
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: 'LetsCodeScv Chat',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.name,
      email: this.props.email,
      avatar: this.props.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }

  render() {
    console.log('Chat render -- props:' + JSON.stringify(this.props));

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSvc.send}
        user={this.user}
      />
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

Chat.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
}

export default Chat;
