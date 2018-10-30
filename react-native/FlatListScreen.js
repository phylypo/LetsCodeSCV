import React, { Component } from "react";
import { Button, View, Text, FlatList } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

class FlatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
    this.itemPress = this.itemPress.bind(this);
    this.itemPressed2 = this.itemPressed2.bind(this);
  }

  componentDidMount() {
    setTimeout(this.makeRemoteRequest,1000);
    //this.makeRemoteRequest();
  }

  makeRemoteRequest = (rooturl = "https://randomuser.me") => {
    const { page, seed } = this.state;
    const url = `${rooturl}/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  onPressFnc = () => {
    this.makeRemoteRequest("https://randomuser.me");
  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  itemPress = (email, name) => {
    const { navigate } = this.props.navigation;
    console.log("Item pressed", email);
    navigate('Profile', { name: name })
  }
  itemPressed2 = (email) => {
    console.log("Not working ... Item pressed 2, email:", email);
  }
  render() {
    
    if (this.state.loading==true) {
      return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    else if(this.state.error != null) {
      return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red" }}>
          <Text>Error: {this.state.error.message}</Text>
          <Button title="Try Again" onPress={this.onPressFnc.bind(this)}/>
        </View>
      );
    }
    else {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.email}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
              onPress={() => this.itemPress(item.email, item.name.first + " " + item.name.last)}
            />
          )}
        />
      </List>
    );
          }
    // return (
    //     <FlatList
    //       data={this.state.data}
    //       renderItem={({ item }) => (
    //         <View style={{margin:10}}>
    //             <Text>{item.name.first} {item.name.last}</Text>
    //             <Text>Email: {item.email}</Text>
    //             <Text>Img: {item.picture.thumbnail}</Text>
    //         </View>
    //       )}
    //     />
    // );
  }
}

export default FlatListScreen;