import React from 'react';
import Chat from './Chat';

class ChatComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log('Chat constructor this.props:' + JSON.stringify(this.props));
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.param,
  });

  render() {
    let props = this.props.navigation.state.params;
    console.log("ChatComponent -- render() props:" + JSON.stringify(props));
    return (
          <Chat
            user={props.user}
            title="Lobby Messages" // will not affect Chat, the nav title is above
            sendMessageFunc={props.sendMessageFunc}
            refOn={props.refOn}
            refOff={props.refOff}
            param={props.param}
          />
    );
  }

}


export default ChatComponent;
