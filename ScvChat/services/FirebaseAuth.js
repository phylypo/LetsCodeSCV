import firebaseDb, { serverTimestamp } from './FirebaseDb';
import uuid from 'uuid';
import ignoreWarnings from 'react-native-ignore-warnings';

ignoreWarnings('Setting a timer');

export const login = (user, success_callback, failed_callback) => {
  console.log("logging in");
  const output = firebaseDb.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(success_callback, failed_callback);
}

export const observeAuth = () =>
  firebaseDb.auth().onAuthStateChanged(onAuthStateChanged);

export const onAuthStateChanged = user => {
  if (!user) {
    try {
      login(user);
    } catch ({ message }) {
      console.log("Failed:" + message);
    }
  } else {
    console.log("Reusing auth...");
  }
};

export const createAccount = async (user) => {
  console.log('this is user',user)
  firebaseDb.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(function() {
      console.log("created user successfully. User email:" + user.email + " name:" + user.name);
      var userf = firebaseDb.auth().currentUser;
      userf.updateProfile({ displayName: user.name})
      .then(function() {
        console.log("Updated displayName successfully. name:" + user.name);
        alert("User " + user.name + " was created successfully. Please login.");
      }, function(error) {
        console.warn("Error update displayName.");
      });
    }, function(error) {
      console.error("got error:" + typeof(error) + " string:" + error.message);
      alert("Create account failed. Error: "+error.message);
    });
}

export const uploadImage = async uri => {
  console.log('got image to upload. uri:' + uri);
  try {
    // this no longer working - encoded as application/octet-stream, needed image/jpeg
    //const response = await fetch(uri);
    //const blob = await response.blob();
    // fix https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref('avatar')
      .child(uuid.v4());
    const task = ref.put(blob);
  
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {
            /* noop but you can track the progress here */
        },
        reject /* this is where you would put an error callback! */,
        () => resolve(task.snapshot.downloadURL)
      );
    });
  } catch (err) {
    console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
  }
}

export const updateAvatar = (url) => {
  var userf = firebaseDb.auth().currentUser;
  if (userf != null) {
    userf.updateProfile({ avatar: url})
    .then(function() {
      console.log("Updated avatar successfully. url:" + url);
      alert("Avatar image is saved successfully.");
    }, function(error) {
      console.warn("Error update avatar.");
      alert("Error update avatar. Error:" + error.message);
    });
  } else {
    console.log("can't update avatar, user is not login.");
    alert("Unable to update avatar. You must login first.");
  }
}
    
export const onLogout = () => {
  firebaseDb.auth().signOut().then(function() {
    console.log("Sign-out successful.");
  }).catch(function(error) {
    console.log("An error happened when signing out");
  });
}
