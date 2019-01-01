import firebaseDb, { serverTimestamp } from './FirebaseDb';
import uuid from 'uuid';
import ignoreWarnings from 'react-native-ignore-warnings';

ignoreWarnings('Setting a timer');

// database refs
const refLobby = firebaseDb.database().ref('RoomMessages/Lobby');
const refUsers = firebaseDb.database().ref('UserProfiles');
const refDirectMessages = firebaseDb.database().ref('DirectMessages');
const refRoomList = firebaseDb.database().ref('RoomsList');
const refRoomMessages = firebaseDb.database().ref('RoomMessages');

const parseMessage = snapshot => {
  const { key: _id } = snapshot; //needed for giftedchat
  return {...snapshot.val(), _id};
};

export const refOnLobby = (user, param, callback) => {
  refLobby
    .limitToLast(20)
    .on('child_added', snapshot => callback(parseMessage(snapshot)));
}

export const refOnDirect = (fromUser, toUserEmail, callback) => {
  console.log('refOnDirect -- fromUser:' + JSON.stringify(fromUser));
  var fromKey = getKeyFromEmail(fromUser.email);
  var toKey = getKeyFromEmail(toUserEmail);
  console.log('refonDirect -- fromkey:' + fromKey + " tokey:" + toKey);
  refDirectMessages.child(fromKey).child(toKey)
    .limitToLast(20)
    .on('child_added', snapshot => callback(parseMessage(snapshot)));
}

export const refOnRoom = (fromUser, room, callback) => {
  console.log('refOnRoom -- room:' + room);
  refRoomMessages.child(room)
    .limitToLast(20)
    .on('child_added', snapshot => callback(parseMessage(snapshot)));
}

export const getUsers = (callback) => {
  refUsers.limitToLast(20).once('value', snapshot => callback(parseUsers(snapshot)));
}

const parseUsers = snapshot => {
  var users = [];
  snapshot.forEach(function(childSnapshot) {
    const { timestamp: numberStamp, name, email } = childSnapshot.val();
    const { key: id } = childSnapshot;

    const user = {
      key: email, //need for react-list
      name,
      email,
    };
    users.push(user);
  });
  console.log("firebaseSvc -- parseUsers:" + JSON.stringify(users));
  return users;
};

export const getRoomList = (callback) => {
  refRoomList.limitToLast(20).once('value', snapshot => callback(parseRooms(snapshot)));
}

const parseRooms = snapshot => {
  var rooms = [];
  snapshot.forEach(function(childSnapshot) {
    const { name, description, avatar } = childSnapshot.val();

    // const room = {
    //   key: name,
    //   name,
    //   description,
    //   avatar,
    //   //members, // TODO: members user in the room
    //   //admins, // TODO: list of admin member that can modify the room info
    // };
    //rooms.push(room);
    rooms.push({...childSnapshot.val(), key: name});
  });
  return rooms;
};

export const addRoomList = room => {
  console.log('added roomlist:' + JSON.stringify(room));
  refRoomList.child(room.name).set(room);
}

export const addUserProfile = user => {
  console.log('added user profile:' + JSON.stringify(user));
  let key = getKeyFromEmail(user.email);
  refUsers.child(key).set(user);
}

export const getKeyFromEmail = email => {
  console.log("getKeyFromEmaiL email:" + email);
  if(email == null || email == undefined) return "no-email";
  return email.replace('.',',');
}

export const addMessage = (message, toUser) => {
  console.log('added message:' + JSON.stringify(message));
  let key = getKeyFromEmail(toUser.email);
  refUsers.child(key).set(message);
}

// send the message to the Backend
export const sendLobby = messages => {
  console.log("firebaseSvc - send lobby messages:" + JSON.stringify(messages));
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];
    const message = {
      text,
      user,
      createdAt: serverTimestamp,
    };
    refLobby.push(message);
  }
};

export const sendDirect = (messages) => {
  console.log('firebaseSvc - sendDirect direct:' + JSON.stringify(messages)); 
  var toKey = '';
  var fromKey = '' ;
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];
    const message = {
      text,
      user,
      createdAt: serverTimestamp,
    };
    fromKey = getKeyFromEmail(user.email);
    toKey = getKeyFromEmail(user.toemail);
    console.log(' --- send direct:' + JSON.stringify(message) + " fromKey:" + fromKey + " toKey:" + toKey);
    refDirectMessages.child(fromKey).child(toKey).push(message);
    refDirectMessages.child(toKey).child(fromKey).push(message);
  }
};

export const sendRoomMessage = (messages) => {
  console.log('firebaseSvc - send room message:' + JSON.stringify(messages)); 
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];
    const message = {
      text,
      user,
      createdAt: serverTimestamp,
    };
    console.log(' --- send room message:' + JSON.stringify(message) + " room:" + user.room);
    refRoomMessages.child(user.room).push(message);
  }
};

export const refOffLobby = () => {
  refLobby.off();
}
export const refOffDirect = (user) => {
  var key = getKeyFromEmail(user.email);
  refDirectMessages.child(key).off();
}
export const refOffRoom = (room) => {
  refRoomMessages.child(room).off();
}

