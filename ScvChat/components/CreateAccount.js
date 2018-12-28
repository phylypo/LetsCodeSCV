import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  Text,
  TextInput, View,
  Button, ImageEditor,
} from 'react-native';
import firebaseSvc from '../services/FirebaseSvc';
import styles from './Styles'

class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'Scv Chatter',
  };

  state = {
    name: 'Alex B',
    email: 'test3@gmail.com',
    password: 'test123',
    avatar: '',
  };

  onPressCreate = async () => {
    console.log('create account... email:' + this.state.email);
    if(this.state.password.length < 6){
      return false;
    }
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('create account failed. catch error:' + message);
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });

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
        let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
        console.log(" - await upload successful url:" + uploadUrl);
        this.setState({avatar: uploadUrl});
        await firebaseSvc.updateAvatar(uploadUrl);
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };

  render() {
    console.log("createaccount - this.props:" + JSON.stringify(this.props));
    const errorPw = this.state.password.length < 6 ? <Text style={styles.error}> password mustbe creater than 6 </Text> : null;
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="test3@gmail.com"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        {errorPw}
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextName}
          value={this.state.name}
        />
        <Button
          title="Create Account"
          style={styles.buttonText}
          onPress={this.onPressCreate}
        />
        <Button
          title="Upload Avatar Image"
          style={styles.buttonText}
          onPress={this.onImageUpload}
        />
      </View>
    );
  }
}

export default CreateAccount;
