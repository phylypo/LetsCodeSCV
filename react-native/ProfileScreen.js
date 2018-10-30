import React from 'react';
import { Button, Text, View } from 'react-native';

class ProfileScreen extends React.Component {
  constructor(props, context){
    super(props, context);
  }
    static navigationOptions = {
      title: 'My Profile',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Text>My Profile Screen Name:{this.props.navigation.state.params.name}</Text>
          <Button
            title="Back Home"
            onPress={() =>
              navigate('Home', { name: 'Home Jane' })
            }
          />
        </View>
      );
    }
  }

export default ProfileScreen;
