import * as React from 'react';
import {View, Text, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import Home from '../screens/Home';
import Transaction from '../screens/Transaction';
import Profile from '../screens/Profile';
function handleBackButton() {
  BackHandler.exitApp();
  return true;
}
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#517fa4',
        tabStyle: {
          backgroundColor: '#CBE15A',
          paddingBottom: 5,
        },
        labelStyle: {
          // color: '#517fa4',
          textTransform: 'uppercase',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: 11,
          marginTop: -10,
        },
        adaptive: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={24} type="material" color={color} />
          ),
        }}
        listeners={{
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({color, size}) => (
            <Icon name="assignment" size={24} type="material" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={24} type="material" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
