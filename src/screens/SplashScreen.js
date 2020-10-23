import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
const SplashScreen = ({navigation}) => {
  const {statusLogin} = useSelector((state) => state.authAPI);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Number(statusLogin) === 200) {
      setTimeout(() => {
        navigation.navigate('BottomTab', {screen: 'Home'});
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    }
  }, [dispatch, statusLogin]);
  // setTimeout(() => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: 'Login',
  //       },
  //     ],
  //   });
  // }, 5000);
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#CBE15A',
        // paddingTop: '70%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#ffffff', fontSize: 20}}>Selamat datang di...</Text>
      <Text style={{color: '#ffffff', fontSize: 60, fontWeight: 'bold'}}>
        E-Dress App
      </Text>
    </View>
  );
};

export default SplashScreen;
