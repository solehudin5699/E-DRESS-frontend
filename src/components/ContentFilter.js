import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Content, Card, CardItem, Text, Button, View} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {
  modalFilterAction,
  setSearchByAction,
  setSortByAction,
  setOrderByAction,
  setNewestAction,
} from '../redux/actions/modal';

export default ContentFilter = () => {
  const {searchBy, sortBy, orderBy, newest} = useSelector(
    (state) => state.modals,
  );
  const dispatch = useDispatch();
  return (
    <Content>
      <Card>
        <CardItem>
          <View style={styles.contentButtonFilter}>
            <TouchableOpacity
              onPress={() => {
                dispatch(modalFilterAction(false));
              }}
              style={styles.buttonFilter}>
              <Text style={styles.textButtonFilter}>FILTER</Text>
            </TouchableOpacity>
          </View>
        </CardItem>

        <CardItem bordered style={{flexDirection: 'column'}}>
          <View style={styles.contentTitle}>
            <Text style={styles.textTitle}>URUTKAN BERDASARKAN...</Text>
          </View>
          <View style={styles.contentButton}>
            <Button
              rounded
              onPress={() => dispatch(setSortByAction('name'))}
              style={
                sortBy === 'name' ? styles.buttonActive : styles.buttonInactive
              }>
              <Text style={styles.textButton}>Nama</Text>
            </Button>
            <Button
              rounded
              onPress={() => dispatch(setSortByAction('price'))}
              style={
                sortBy === 'price' ? styles.buttonActive : styles.buttonInactive
              }>
              <Text style={styles.textButton}>Harga</Text>
            </Button>
            <Button
              rounded
              onPress={() => dispatch(setSortByAction('category_id'))}
              style={
                sortBy === 'category_id'
                  ? styles.buttonActive
                  : styles.buttonInactive
              }>
              <Text style={styles.textButton}>Kategori</Text>
            </Button>
          </View>
          <View style={styles.contentButton}>
            <Button
              rounded
              onPress={() => dispatch(setOrderByAction('ASC'))}
              style={
                orderBy === 'ASC' ? styles.buttonActive : styles.buttonInactive
              }>
              <Text style={styles.textButton}>Ascending</Text>
            </Button>
            <Button
              rounded
              onPress={() => dispatch(setOrderByAction('DESC'))}
              style={
                orderBy === 'DESC' ? styles.buttonActive : styles.buttonInactive
              }>
              <Text style={styles.textButton}>Descending</Text>
            </Button>
          </View>

          <View style={styles.contentButton}>
            <Button
              rounded
              onPress={() => dispatch(setNewestAction('DESC'))}
              style={
                newest === 'DESC' ? styles.buttonActive : styles.buttonInactive
              }>
              <Text style={styles.textButton}>Terbaru</Text>
            </Button>
            <Button
              rounded
              onPress={() => dispatch(setNewestAction('ASC'))}
              style={
                newest === 'ASC' ? styles.buttonActive : styles.buttonInactive
              }>
              <Text style={styles.textButton}>Terlama</Text>
            </Button>
          </View>
        </CardItem>
      </Card>
    </Content>
  );
};

const styles = StyleSheet.create({
  contentTitle: {
    width: '100%',
  },
  textTitle: {
    color: '#517fa4',
  },
  contentButtonFilter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonFilter: {
    padding: 0,
    height: 30,
    backgroundColor: '#517fa4',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButtonFilter: {
    color: 'white',
  },
  contentButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  textButton: {
    color: '#517fa4',
  },
  buttonActive: {
    padding: 0,
    height: 30,
    backgroundColor: '#CBE15A',
    width: '33%',
    justifyContent: 'center',
  },
  buttonInactive: {
    padding: 0,
    height: 30,
    backgroundColor: 'white',
    width: '33%',
    color: '#517fa4',
    borderColor: '#517fa4',
    justifyContent: 'center',
  },
});
