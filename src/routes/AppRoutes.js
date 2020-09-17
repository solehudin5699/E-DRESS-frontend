import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Header} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './BottomTab';
import ProductDetail from '../screens/Details';
import Cart from '../screens/Cart';
import Login from '../screens/Login';
import Register from '../screens/Register';
const Stack = createStackNavigator();
import {useSelector} from 'react-redux';

export default function AppRoutes() {
  const {statusLogin} = useSelector((state) => state.authAPI);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={statusLogin === 200 ? 'BottomTab' : 'Login'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#CBE15A',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            title: 'Detail',
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            title: 'Keranjang',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
