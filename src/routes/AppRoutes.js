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
import AddProduct from '../screens/AddProduct';
import EditProduct from '../screens/EditProduct';
import Login from '../screens/Login';
import Register from '../screens/Register';
import EditProfile from '../screens/EditProfile';
import SplashScren from '../screens/SplashScreen';
const Stack = createStackNavigator();
import {useSelector} from 'react-redux';

export default function AppRoutes() {
  const {statusLogin} = useSelector((state) => state.authAPI);
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Login"
        // initialRouteName={statusLogin === 200 ? 'BottomTab' : 'Login'}
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
          name="Splashscreen"
          component={SplashScren}
          options={{
            headerShown: false,
          }}
        />
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
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            title: 'Tambah Produk',
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            title: 'Edit Produk',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'Perbarui Informasi Akun',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
