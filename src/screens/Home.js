import React, {useEffect} from 'react';
import {ToastAndroid, BackHandler} from 'react-native';
import {Container, View} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import HeaderHome from '../components/Header';
import ContentHome from '../components/InfiniteScroll';
import ModalEditDelete from '../components/ModalEditDelete';
import ModalDelete from '../components/ModalDelete';
import ModalFilter from '../components/ModalFilter';

const Home = () => {
  // const backAction = () => {
  //   BackHandler.exitApp();
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);
  return (
    <Container>
      <HeaderHome />
      <View style={{flex: 1}}>
        <ContentHome />
      </View>
      <ModalEditDelete />
      <ModalDelete />
      <ModalFilter />
    </Container>
  );
};

export default Home;
