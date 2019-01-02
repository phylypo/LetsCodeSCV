import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  Text, TextInput, View,
  Button, ImageEditor,
} from 'react-native';
import firebaseAuth from '../services/FirebaseAuth';
import styles from './Styles'
import { sendLogoutAction } from '../store/LoginAction';
import { connect } from 'react-redux';

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings Screen', //override the MainTabNav
  };

  state = {
    name: this.props.name,
    email: this.props.email,
    avatar: this.props.avatar,
  };

  onSignOut = () => {
    console.log("Settings onSignout");
    this.props.sendLogout();
  }

  onPressUpdate = async () => {
    console.log('update account... email:' + this.state.email);
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
      };
      console.lig("TODO: call to update user info.");
      //await firebaseAuth.createAccount(user);
    } catch ({ message }) {
      console.log('update account failed. catch error:' + message);
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });

  // TODO: this should go to redux action
  onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        console.log('choosing image granted...');
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
        );

        var wantedMaxSize = 150;
        var rawheight = pickerResult.height;
        var rawwidth = pickerResult.width;
        
        var ratio = rawwidth / rawheight;
        var wantedwidth = wantedMaxSize;
        var wantedheight = wantedMaxSize/ratio;
        // check vertical or horizontal
        if(rawheight > rawwidth){
            wantedwidth = wantedMaxSize*ratio;
            wantedheight = wantedMaxSize;
        }
        console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(pickerResult.uri,
          {
              offset: { x: 0, y: 0 },
              size: { width: pickerResult.width, height: pickerResult.height },
              displaySize: { width: wantedwidth, height: wantedheight },
              resizeMode: 'contain',
          },
          (uri) => resolve(uri),
          () => reject(),
          );
        });
        let uploadUrl = await firebaseAuth.uploadImage(resizedUri);
        console.log(" - await upload successful url:" + uploadUrl);
        this.setState({avatar: uploadUrl});
        await firebaseAuth.updateAvatar(uploadUrl);
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="test3@gmail.com"
          value={this.state.email}
        />
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextName}
          value={this.state.name}
        />
        <Button
          title="Update Profile"
          style={styles.buttonText}
          onPress={this.onPressUpdate}
        />
        <Button
          title="Upload Avatar Image"
          style={styles.buttonText}
          onPress={this.onImageUpload}
        />
        <Button
          title="Sign out"
          style={styles.buttonText}
          onPress={this.onSignOut}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const login = state.login;
  console.log('settings mapStateToProps ... state:' + JSON.stringify(state));
  console.log('settings mapStateToProps ... props:' + JSON.stringify(login));
  return login;
};

// need custom middleware for async func --added thunk in createStore
const mapDispatchToProps = {
  sendLogout: sendLogoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);