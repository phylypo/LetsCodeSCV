
import React from 'react';
import { StyleSheet, ListView, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import ItemRow from './ItemRow';

const testitems = [
  { name: "testname1" },
  { name: "tesetn2" },
  { name: "testn3"}
];

class HomeScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      items: [
          { name: 'Learn React Native', },
          { name: 'Learn Redux',  },
          { name: 'test', },
          { name: 'test2', },
      ],
      // dataSource: ds.cloneWithRows(['row 1 data','row 1 data', 'row 2 data', 'row 3 data','row 1 data','row 4 data',]),
      //dataSource: ds.cloneWithRows(testitems),
    };
    this.state.dataSource = ds.cloneWithRows(this.state.items);
    // child ItemRow does not have access to this.state
    this.onPressedItemFnc = this.onPressedItemFnc.bind(this)

  }
  static navigationOptions = {
    title: 'Home',
  };
  componentWillReceiveProps(nextProps) {
    const dataSource = this
        .state
        .dataSource
        .cloneWithRows(this.state.items);

    this.setState({ dataSource });
  }

  DeletePressed() {
    console.log("Delete Clicked");
    console.log(item);
  }
  onPressedItemFnc(item) {
    console.log('onPressedItemFnc run: ', item);
    const filteredItems =
        this.state.items.filter((filterItem) => {
            return filterItem !== item;
        });
    this.setState({ items: filteredItems },
      () => {
        console.log(' state call back - state items count:', this.state.items.length);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state.dataSource = ds.cloneWithRows(this.state.items);
      });
    console.log(' onPressedItemFnc - state items count:', this.state.items.length);
    console.log('final state:', this.state.items);

  }

  onPress(){
    const item = { name: "testn3"};
    console.log('onPress - count before:', this.state.items.length);
    const x = this.state.items.filter((filterItem) => {
      return filterItem !== item;
    });
    console.log(' - after count:', x.length);
  }
  renderRow(item) {
    return(
      <ItemRow 
      onPressFnc={this.onPressedItemFnc}
      itemObj={item}
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    let n = "Default Home";
    if ((this.props.navigation.state != null)
      && (this.props.navigation.state.params != null)) {
       n = this.props.navigation.state.params.name;
      }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <Text>Name from Profile: {n}</Text>
        <Button title="Go to Profile" 
          onPress={() =>
              navigate('Profile', { name: 'Jane' })
          }
          />
        <Button title="Go to FlatListScreen" 
          onPress={() =>
            navigate('FlatListScreen', { name: 'Jane' })
          }
        />
        <Button title="Test onPress" 
          onPress={this.onPress.bind(this)}
        />
        <Button title="Test onPress" 
          onPress={this.onPress.bind(this)}
        />

      </View>
    );
  }
}
// HomeScreen.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.object).isRequired,
//   // should be dataSource
// };

export default HomeScreen;