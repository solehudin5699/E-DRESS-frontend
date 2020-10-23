import React, {useState, useEffect} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Button} from 'native-base';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {modalSignOutAction} from '../redux/actions/modal';
import {logoutCreator} from '../redux/actions/auth';

const window = Dimensions.get('window');
const width = window.width * window.scale;
const height = window.height * window.scale;
const ModalConfirm = () => {
  const {modalSignOut} = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  return (
    // <View style={{flex: 1, width: '100%'}}>
    //   <Button title="Show modal" onPress={() => setModalVisible(true)} />

    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      deviceWidth={width}
      deviceHeight={height}
      coverScreen={true}
      isVisible={modalSignOut}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
      }}
      backdropOpacity={0.3}
      onBackButtonPress={() => {
        dispatch(modalSignOutAction(false));
      }}
      onBackdropPress={() => {
        dispatch(modalSignOutAction(false));
      }}
      onSwipeComplete={() => {
        dispatch(modalSignOutAction(false));
      }}
      swipeDirection="down"
      // propagateSwipe
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '90%',
          padding: 10,
          justifyContent: 'center',
          borderColor: '#CBE15A',
          borderRadius: 3,
        }}>
        <View style={{marginTop: 5, padding: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: '#517fa4',
            }}>
            Apakah Anda yakin ingin keluar ?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: 30,
          }}>
          <Button
            // rounded
            onPress={() => {
              dispatch(modalSignOutAction(false));
            }}
            style={{
              width: '30%',
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              backgroundColor: '#517fa4',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 15, color: '#ffffff'}}>TIDAK</Text>
          </Button>
          <Button
            onPress={() => {
              dispatch(modalSignOutAction(false));
              dispatch(logoutCreator());
            }}
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              backgroundColor: '#d8414a',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 15, color: '#ffffff'}}>YA</Text>
          </Button>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export default ModalConfirm;
