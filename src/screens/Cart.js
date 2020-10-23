import React, {useState, useEffect} from 'react';
import {TouchableOpacity, FlatList, Image, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  increaseQuantityAction,
  decreaseQuantityAction,
  deleteFromCartAction,
  checkListAction,
} from '../redux/actions/cart';
import {serverAddress} from '../../sharedVariable';
import {
  Container,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Footer,
  FooterTab,
} from 'native-base';
import {Icon} from 'react-native-elements';
import {setTotalPriceAction} from '../redux/actions/cart';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const CartEmpty = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 25,
      }}>
      <Icon
        name="remove-shopping-cart"
        type="material"
        color="#d8414a"
        size={50}
      />
      <Text
        style={{textAlign: 'center', fontSize: 15, color: '#517fa4'}}
        numberOfLines={2}>
        Keranjang Anda masih kosong...{' '}
        <Text
          style={{color: '#d8414a'}}
          button
          onPress={() => navigation.navigate('Home')}>
          Cari sekarang?
        </Text>
      </Text>
    </View>
  );
};

const Cart = () => {
  const navigation = useNavigation();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  const dispatch = useDispatch();
  const {cart, totalPriceSelected} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setTotalPriceAction());
    // setTotal()
  }, [dispatch]);
  return (
    <Container>
      {!cart.length ? (
        <CartEmpty />
      ) : (
        <FlatList
          data={cart}
          numColumns={1}
          renderItem={({item, index}) => {
            return (
              <List>
                <ListItem thumbnail button onLongPress={() => alert('Haloo')}>
                  <Left
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '25%',
                    }}>
                    <CheckBox
                      // tintColors={{true: '#CBE15A', false: '#517fa4'}}
                      // disabled={false}
                      value={item.isChecked}
                      onValueChange={() => {
                        dispatch(checkListAction(index));
                        dispatch(setTotalPriceAction());
                      }}
                    />
                    {/* <Button
                    style={{alignSelf: 'flex-end'}}
                    transparent
                    onPress={() => {
                      dispatch(checkListAction(index));
                      dispatch(setTotalPriceAction());
                    }}>
                    {item.checked
                      ? handleChecked(index)
                      : handleUnchecked(index)}
                    <Icon
                      name={
                        item.isChecked === true
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      type="material"
                      color="#517fa4"
                      size={24}
                    />
                  </Button> */}
                    <Thumbnail
                      square
                      source={{uri: `${serverAddress}${item.image}`}}
                    />
                  </Left>
                  <Body>
                    <Text>{`${item.name}`}</Text>
                    <Text numberOfLines={1} style={{color: '#517fa4'}}>
                      Rp {numberWithCommas(Number(item.priceBasedNumber))}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                        justifyContent: 'flex-start',
                      }}>
                      <Button
                        onPress={() => {
                          dispatch(decreaseQuantityAction(index));
                          dispatch(setTotalPriceAction());
                        }}
                        style={{
                          padding: 0,
                          height: 30,
                          backgroundColor: '#CBE15A',
                        }}>
                        <Text style={{color: '#517fa4'}}>-</Text>
                      </Button>

                      <Button transparent style={{padding: 0, height: 30}}>
                        <Text style={{color: '#517fa4'}}>{item.number}</Text>
                      </Button>

                      <Button
                        onPress={() => {
                          dispatch(increaseQuantityAction(index));
                          dispatch(setTotalPriceAction());
                        }}
                        style={{
                          padding: 0,
                          height: 30,
                          backgroundColor: '#CBE15A',
                        }}>
                        <Text style={{color: '#517fa4'}}>+</Text>
                      </Button>

                      <Button
                        onPress={() =>
                          navigation.navigate('ProductDetail', {
                            product_id: item.product_id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            description: item.description,
                            stock: item.stock,
                            category_name: item.category_name,
                          })
                        }
                        // onPress={() => {
                        //   dispatch(increaseQuantityAction(index));
                        //   dispatch(setTotalPriceAction());
                        // }}
                        style={{
                          padding: 0,
                          height: 30,
                          backgroundColor: '#CBE15A',
                          marginLeft: 20,
                        }}>
                        <Text style={{color: '#517fa4'}}>Detail</Text>
                      </Button>
                    </View>
                  </Body>
                  {/* <Right
                  style={{
                    flexDirection: 'row',
                    width: '15%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <Button
                    transparent
                    onPress={() => {
                      dispatch(deleteFromCartAction(index));
                      dispatch(setTotalPriceAction());
                    }}>
                    <Icon
                      // reverse
                      name="delete"
                      type="material"
                      color="#d8414a"
                      size={24}
                    />
                  </Button> */}

                  {/* </Right> */}
                </ListItem>
              </List>
            );
          }}
          keyExtractor={(index, item) => index + Math.random()}
        />
      )}

      <Footer>
        {/* <View>
          <Text>Haiiii</Text>
        </View> */}
        {cart.find((item) => {
          return item.isChecked === true;
        }) ? (
          <FooterTab style={{backgroundColor: '#CBE15A', width: '25%'}}>
            <Button
              style={{width: '100%', height: '100%'}}
              onPress={() => {
                dispatch(deleteFromCartAction());
                dispatch(setTotalPriceAction());
              }}>
              <Text style={{color: '#517fa4', fontSize: 15}}>HAPUS</Text>
            </Button>
          </FooterTab>
        ) : null}
        {/* <FooterTab style={{backgroundColor: '#CBE15A', width: '25%'}}>
          <Button
            style={{width: '100%', height: '100%'}}
            onPress={() => {
              dispatch(deleteFromCartAction(index));
              dispatch(setTotalPriceAction());
            }}>
            <Text style={{color: '#517fa4', fontSize: 15}}>HAPUS</Text>
          </Button>
        </FooterTab> */}
        <FooterTab
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
          }}>
          <View>
            <Text style={{color: '#517fa4', fontSize: 15}}>
              Total : Rp {numberWithCommas(Number(totalPriceSelected))}
            </Text>
          </View>
        </FooterTab>
        <FooterTab style={{backgroundColor: '#CBE15A', width: '25%'}}>
          <Button>
            <Text style={{color: '#517fa4', fontSize: 15}}>BELI</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default Cart;
