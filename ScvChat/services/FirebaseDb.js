import firebase from 'firebase';
import ignoreWarnings from 'react-native-ignore-warnings';
import { FirebaseConfig } from './FirebaseConfig'

ignoreWarnings('Setting a timer');
let instance = null

class FirebaseDb {
  constructor() {
    console.log("FirebaseDb instance:" + JSON.stringify(instance));
    if (!instance) {
      console.log("FirebaseDb instance is null. Initializing...");
      this.app = firebase.initializeApp(FirebaseConfig);
      instance = this;
    }
    return instance
  }
}

export const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

const firebaseDb = new FirebaseDb().app;
export default firebaseDb;
