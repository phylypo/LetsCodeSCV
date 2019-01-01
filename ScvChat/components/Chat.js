import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import PropTypes from 'prop-types'

class Chat extends React.Component {

  constructor(props) {
    super(props);
    console.log('Chat constructor this.props:' + JSON.stringify(this.props));
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: this.props.title,
  });

  state = {
    messages: [],
  };

  render() {
    //console.log("Chat render...");
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend = {this.props.sendMessageFunc}
        user={this.props.user}
      />
    );
  }

  componentDidMount() {
    console.log("Chat - compDidMount: this.props:" + JSON.stringify(this.props));
    this.props.refOn(this.props.user, this.props.param, message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    //this.props.refOff();
  }
  
  componentWillReceiveProps() {
    console.log("Chat - compWillReceiveProps");
    this.forceUpdate(); // not working
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string,
  sendMessageFunc: PropTypes.func.isRequired,
  refOn: PropTypes.func.isRequired,
  refOff: PropTypes.func.isRequired,
  param: PropTypes.string, //room or toemail
}

export default Chat;
