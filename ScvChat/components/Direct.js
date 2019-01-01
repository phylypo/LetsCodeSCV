import React from 'react';
import { Text, View, FlatList } from 'react-native';
import ChatComponent from './ChatComponent';
import { ListItem } from "react-native-elements"
import * as firebaseSvc from '../services/FirebaseSvc';
import {createStackNavigator} from 'react-navigation'
import { connect } from 'react-redux';

const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/letscodescv-5dbc0.appspot.com/o/316e67c5-3bfb-492c-b26b-cafd2bdb446a?alt=media&token=f2c1560d-cbdb-49fa-8055-20b380f994c5';
const defaultAvatar2 = 'https://firebasestorage.googleapis.com/v0/b/letscodescv-5dbc0.appspot.com/o/avatar%2F0221f2b2-d6f2-4a12-ad46-44df3b819e21?alt=media&token=d38d78d4-aab7-4398-8384-e313fd5f139d';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        // {key:'abc@abc', name:'Alice Amy', email: 'abac@abc',
        // avatar: defaultAvatar},
        // {key:'ccc@abc', name:'zzBob Brad', email: 'cccc@abc', avatar: defaultAvatar},
       ],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Users',
  });

  state = {
    users: [],
  };

  get user() {
    return {
      name: this.props.name,
      email: this.props.email,
      avatar: this.props.avatar,
      //_id: firebaseSvc.uid,
    };
  }

  onPressItem = (item) => {
    console.log("onPress email with item: " + item.email);
    const user = {...this.user, toemail: item.email};
    this.props.navigation.navigate('ChatComponent', {
        user: user,
        param: item.email,
        refOn: firebaseSvc.refOnDirect,
        refOff: firebaseSvc.refOffDirect,
        sendMessageFunc: firebaseSvc.sendDirect,
    } )
  }
  
  renderItem = (item) => {
    //set default image if not included
    if (item.avatar==null)
      item.avatar = defaultAvatar2;
    return <ListItem
            roundAvatar
            title={item.name}
            subtitle={item.email}
            avatar={{ uri: item.avatar }}
            onPress={() => this.onPressItem(item)}
          />;
  }

  render() {
    //console.log("datasource:" + JSON.stringify(this.state.dataSource));
    //console.log("datasource:" + JSON.stringify(this.state.data));
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => this.renderItem(item)}
        />
      </View>
    );
  }

  addUser = () => {
    let rand = Math.floor(Math.random() * 99) + 1;
    let user = {key: '123', name:'test user' + rand, email:'myemail'+rand + '@email.com'};
    firebaseSvc.addUserProfile(user);
  }
  
  addTestMessage = () => {
    let userwithto = {...this.user, toemail: 'test3@gmail.com'};
    let message = [{text:'my message 3 from test2 to test3', user: userwithto}];
    console.log('add test message:' + JSON.stringify(message) + " --- user:" + JSON.stringify(this.user));
    firebaseSvc.sendDirect(message);
  }

  componentDidMount() {
    //this.addUser();
    //this.addTestMessage();
    
    firebaseSvc.getUsers(users => {
      var sortusers = this.state.dataSource.concat(users);
      // filter out its own user - don't display its own email
      sortusers = sortusers.filter((item)=>item.email!=this.user.email);
      sortusers.sort((a,b) => a.name.localeCompare(b.name));
      this.setState({dataSource : sortusers });
    }
    );
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

const UserListScreen = connect(mapStateToProps)(Users);

const UserStackNav = createStackNavigator({
  UserListScreen: UserListScreen,
//   {
//       screen: UserListScreen,
//       navigationOptions: {
//         header: null //Need to set header as null.
//       }
//   },
  ChatComponent: ChatComponent,
});
export default UserStackNav;