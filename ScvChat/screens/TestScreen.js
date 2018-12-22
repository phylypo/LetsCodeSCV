import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import Home from './Home';

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

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 42,
  },
});
