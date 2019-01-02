import React, { Component } from 'react'
import { View, Text, FlatList, Button } from 'react-native';
import styles from './Styles'
import firebaseSvc from '../services/FirebaseSvc';

export default class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state  = {
        rooms: [] 
    }
    
  }

//fetch rooms and set the state when component mounts
componentDidMount(){
    this.fetchRooms();
}

//fetch the rooms and set the state
fetchRooms = async () =>{
    const rooms = [];
    const ref = firebaseSvc.roomsRef
    const snapshot = await ref.once("value");
    snapshot.forEach(function(elem){
        const room = {
            name:elem.key,
            key: elem.val().key
        }
             rooms.push(room);
        })
    this.setState({
        rooms: rooms
    });
}

//render room call back used by FlatList
renderRoom = ({item}) => (
    <Text style={styles.roomsView}>{item.name}</Text>
)
  render() {
    return (
      <View>
       <FlatList
        data={this.state.rooms}
        renderItem={this.renderRoom}
        keyExtractor = {(item)=>item.key}
        />
      </View>
    )
  }
}