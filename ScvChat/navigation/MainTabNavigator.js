import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../components/Home';
import TestScreen from '../components/TestScreen';
import RoomsScreen from '../components/RoomsScreen';

// creating each of the navigation stacks then adding navigation options for each stack
const HomeStack = createStackNavigator({
  Home: HomeScreen
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

HomeScreen.navigationOptions = {
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

const LinksStack = createStackNavigator({
  Links: RoomsScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Rooms',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-link'}
    />
  ),
};

const DirectStack = createStackNavigator({
  DirectMsg: TestScreen,
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
  Settings: TestScreen,
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

//exporting the bottom tab navigator as the default display after you log in
export default createBottomTabNavigator({
  //HomeStack,
  HomeScreen,
  LinksStack,
  DirectStack,
  SettingsStack,
});
