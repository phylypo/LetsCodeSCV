import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'; // 0.3.0
import PropTypes from 'prop-types'
import firebaseSvc from '../services/FirebaseSvc';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

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
    //console.log('Chat render -- props:' + JSON.stringify(this.props));
    //console.log('Chat render -- messages:' + JSON.stringify(this.state.messages[0]));
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={firebaseSvc.send}
          user={this.user}
          renderBubble={this.renderBubble}
          renderCustomView={this.renderCustomView}
          parsePatterns={linkStyle => [
            {
              pattern: /#(\w+)/,
              style: { ...linkStyle, color: 'lightgreen' },
              onPress: props => alert(`press on ${props}`),
            },
          ]}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }

  renderBubble = props => {
    let username = props.currentMessage.user.name
    let color = this.getColor(username)

    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white'
          }
        }}
        timeTextStyle={{
          right: { color: 'red' }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: color
          }
        }}
      />
    )
  }

  getColor(username){
    let sumChars = 0;
    for(let i = 0;i < username.length;i++){
      sumChars += username.charCodeAt(i);
    }

    const colors = [
      '#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50', // midnight blue
    ];
    return colors[sumChars % colors.length];
  }

  renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
              provider={PROVIDER_GOOGLE}
              style={[styles.mapView]}
              region={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <MapView.Marker
                coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude
                }}
              />
            </MapView>
        </View>
      );
    }
    return null
  }

  componentDidMount() {
    console.log("Chat - componentDidMount: " + this.props)
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
