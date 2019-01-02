import React from 'react';
import { Text, View, FlatList } from 'react-native';
import ChatComponent from './ChatComponent';
import { List, ListItem } from "react-native-elements"
import * as firebaseSvc from '../services/FirebaseSvc';
import {createStackNavigator} from 'react-navigation'
import { connect } from 'react-redux';
import styles from './Styles';

const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/letscodescv-5dbc0.appspot.com/o/316e67c5-3bfb-492c-b26b-cafd2bdb446a?alt=media&token=f2c1560d-cbdb-49fa-8055-20b380f994c5';
const defaultAvatar2 = 'https://firebasestorage.googleapis.com/v0/b/letscodescv-5dbc0.appspot.com/o/avatar%2F0221f2b2-d6f2-4a12-ad46-44df3b819e21?alt=media&token=d38d78d4-aab7-4398-8384-e313fd5f139d';

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Rooms',
  });

  state = {
    rooms: [],
  };

  get user() {
    console.log('...Rooms - get user() this.props:' + JSON.stringify(this.props)); 
    return {
      name: this.props.name,
      email: this.props.email,
      avatar: this.props.avatar,
    };
  }

  get room() {
    console.log('...Rooms - get room() this.props:' + JSON.stringify(this.props));
    return {
      key: this.props.name,
      name: this.props.name,
      description: this.props.description,
      avatar: (this.props.avatar || defaultAvatar),
    };
  }

  onPressItem = (item) => {
    console.log("onPress room with item: " + item.name);
    const user = {...this.user, room: item.name};
    this.props.navigation.navigate('ChatComponent', {
        user: user, 
        param: item.name,
        refOn: firebaseSvc.refOnRoom,
        refOff: firebaseSvc.refOffRoom,
        sendMessageFunc: firebaseSvc.sendRoomMessage,
    })
  }
  
  renderItem = (item) => {
    //set default image if not included
    if (item.avatar==null)
      item.avatar = defaultAvatar2;
    return <ListItem
            roundAvatar //this is not working -- not showing round avatar
            //key={item.id}
            title={item.name}
            subtitle={item.description}
            avatar={{ uri: item.avatar }}
            onPress={() => this.onPressItem(item)}
          />;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => this.renderItem(item)}
        />
      </View>
    );
  }

  addRoom = () => {
    let room = {key: 'Lobby', name:'Lobby', description:'Lobby - should be filter out'};
    //let room = {key: 'General', name:'General', description:'General discussion'};
    //let room = {key: 'Programming', name:'Programming', description:'Programming related discussion'};
    firebaseSvc.addRoomList(room);
  }
  
  addTestMessage = () => {
    // user need to encode extra properties to be process since Chat component only pass in message + message.user
    let userWithRoom = {...this.user, toemail: 'test3@gmail.com', room: 'Programming'};
    //let userWithRoom = {...this.user, room: 'Programming'};
    let message = [{text:'programming room message test 5 with no toemail', user: userWithRoom}];
    console.log('add test message:' + JSON.stringify(message) + " --- user:" + JSON.stringify(this.user));
    firebaseSvc.sendRoomMessage(message);
  }

  componentDidMount() {
    //this.addRoom();
    //this.addTestMessage();
    
    firebaseSvc.getRoomList(rooms => {
        var sortRooms = this.state.dataSource.concat(rooms);
        sortRooms.sort((a,b) => a.name.localeCompare(b.name));
        var finalRooms = sortRooms.filter(function(item) { return (item.name !== 'Lobby')});
        this.setState({dataSource : finalRooms });
    });
  }
  componentWillUnmount() {
    firebaseSvc.refOff();
  }
}
const mapStateToProps = state => {
  const user = state.login;
  //console.log('Users mapStateToProps ... state:' + JSON.stringify(state));
  //console.log('Users mapStateToProps ... props:' + JSON.stringify( user ));
  return user;
};

const  RoomsScreen = connect(mapStateToProps)(Rooms);

const RoomStackNav = createStackNavigator({
  RoomsScreen: RoomsScreen,
  ChatComponent: ChatComponent,
});
export default RoomStackNav;
