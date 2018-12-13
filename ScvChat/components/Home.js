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

class Home extends React.Component<Props> {

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
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }

  render() {
    return (
        <React.Fragment>
            <View style={{height:50, backgroundColor:'green', flexDirection: 'row',
            alignConent: 'center'}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'red'}}> 
                    <Text>Options</Text> 
                </View>
                <View style={{flex:1, backgroundColor: 'skyblue'}} />
                <View style={{flex:1, backgroundColor: 'steelblue'}} />
            </View>
            <View style={{display:'block'}}>
                <Text style={{textAlign: 'center'}}>This is some text</Text>
            </View>
            <GiftedChat
            messages={this.state.messages}
            onSend={firebaseSvc.send}
            user={this.user}
            />
        </React.Fragment>
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
export default Home;