import React, {useState, useEffect} from 'react';
import {Text, View, Dimensions, Alert} from 'react-native';
import {Button, List, ListItem} from 'native-base';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {modalEditDeleteAction, modalDeleteAction} from '../redux/actions/modal';
import {useNavigation} from '@react-navigation/native';

const window = Dimensions.get('window');
const width = window.width * window.scale;
const height = window.height * window.scale;

const ModalEditDelete = () => {
  const navigation = useNavigation();
  const {modalEditDelete} = useSelector((state) => state.modals);
  const {dataModalEditDelete} = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      deviceWidth={width}
      deviceHeight={height}
      coverScreen={true}
      isVisible={modalEditDelete}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
      }}
      backdropOpacity={0.3}
      onBackButtonPress={() => {
        dispatch(modalEditDeleteAction(false));
      }}
      onBackdropPress={() => {
        dispatch(modalEditDeleteAction(false));
      }}
      onSwipeComplete={() => {
        dispatch(modalEditDeleteAction(false));
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
        <View style={{marginTop: 5, padding: 3}}>
          <List>
            <ListItem
              button
              onPress={() => {
                navigation.navigate('EditProduct', dataModalEditDelete);
                dispatch(modalEditDeleteAction(false));
              }}>
              <Text>Edit Produk</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                dispatch(modalEditDeleteAction(false));
                dispatch(
                  modalDeleteAction(true, dataModalEditDelete.product_id),
                );
              }}>
              <Text>Hapus Produk</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate('AddProduct');
                dispatch(modalEditDeleteAction(false));
              }}>
              <Text>Tambah Produk Lain</Text>
            </ListItem>
          </List>
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
              dispatch(modalEditDeleteAction(false));
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
            <Text style={{fontSize: 15, color: '#ffffff'}}>BATAL</Text>
          </Button>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export default ModalEditDelete;
