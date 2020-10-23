import React from 'react';

import {Modal, StyleSheet, View, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ContentFilter from './ContentFilter';
import {modalFilterAction} from '../redux/actions/modal';

const ModalFilter = () => {
  const {modalFilter} = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  return (
    // <View style={styles.centeredView}>
    <Modal
      // style={styles.centeredView}
      onDismiss={() => dispatch(modalFilterAction(false))}
      animationType="slide"
      transparent={true}
      visible={modalFilter}
      onRequestClose={() => {
        dispatch(modalFilterAction(false));
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView style={styles.modalContent}>
            <ContentFilter />
          </ScrollView>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    // backgroundColor: 'white',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    width: '100%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonView: {
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    // just: 'center',
    width: '50%',
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalFilter;
