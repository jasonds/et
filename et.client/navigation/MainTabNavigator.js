import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RegisterScreen from '../screens/RegisterScreen';
import KitchenScreen from '../screens/KitchenScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: RegisterScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: KitchenScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Kitchen',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-flame' : 'md-flame'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
});
