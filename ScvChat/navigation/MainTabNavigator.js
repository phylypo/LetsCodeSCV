import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../components/Home';
import Settings from '../components/Settings';
import Rooms from '../components/Rooms';
import Direct from '../components/Direct';
//import RoomsScreen from '../components/RoomsScreen';

const HomeStack = createStackNavigator({
  Home : Home
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Lobby',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-information-circle'
      }
    />
  ),
};

const RoomsStack = createStackNavigator({
  Rooms: {
    screen: Rooms,
    navigationOptions: {
        header: null // Remove the top nav header
    }
  },
});

RoomsStack.navigationOptions = {
  tabBarLabel: 'Rooms',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-link'}
    />
  ),
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: '#eee'
    },
    style: {
      backgroundColor: '#eee'
    },
    onPress: (tab) => {
      // onTabPress stuff here.. --- didn't work
      console.log("RoomStack tab is pressed");
    }
  }
};

const DirectStack = createStackNavigator({
  DirectMsg: {
    screen: Direct,
    navigationOptions: {
        header: null //Need to set header as null.
    }
}
});

DirectStack.navigationOptions = {
  tabBarLabel: 'DirectMessage',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: Settings,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const MainTabNavigator = createBottomTabNavigator({
  HomeStack,
  RoomsStack,
  DirectStack,
  SettingsStack,
});

export default MainTabNavigator;