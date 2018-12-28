import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';
import Home from './Home';
import styles from './Styles'

export default class TestScreen extends Component {
  constructor(props) {
    super(props);
  }
  onSignOut = () =>{

  }
  render() {
    return (
      <View>
        <Button
          title="Sign out"
          style={styles.buttonText}
          onPress={this.onSignOut}
        />
      </View>
    )
  }
}