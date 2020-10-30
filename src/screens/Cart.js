/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {View} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {Container, Text, Button} from "native-base";
import CartEmpty from "../components/Cart/CartEmpty";
import ContentCart from "../components/Cart/ContentCart";
import FooterCart from "../components/Cart/FooterCart";

const Cart = () => {
  const {cart} = useSelector((state) => state.cart);

  return (
    <Container>
      <View style={{flex: 1}}>
        {!cart.length ? <CartEmpty /> : <ContentCart />}
      </View>
      <FooterCart />
    </Container>
  );
};

export default Cart;
