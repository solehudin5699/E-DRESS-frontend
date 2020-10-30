/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from "react";
import {TouchableOpacity, FlatList, Image, View} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {
  increaseQuantityAction,
  decreaseQuantityAction,
  checkListAction,
} from "../../redux/actions/cart";
import {serverAddress} from "../../../sharedVariable";
import {Thumbnail, Text, Button, Left, Body, List, ListItem} from "native-base";
import {setTotalPriceAction} from "../../redux/actions/cart";
import {useNavigation} from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";

const ContentCart = () => {
  const navigation = useNavigation();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  return (
    <FlatList
      data={cart}
      numColumns={1}
      renderItem={({item, index}) => {
        return (
          <List>
            <ListItem thumbnail button onLongPress={() => alert("Haloo")}>
              <Left
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "25%",
                }}>
                <CheckBox
                  value={item.isChecked}
                  onValueChange={() => {
                    dispatch(checkListAction(index));
                    dispatch(setTotalPriceAction());
                  }}
                />
                <Thumbnail
                  square
                  source={{uri: `${serverAddress}${item.image}`}}
                />
              </Left>
              <Body>
                <Text>{`${item.name.substring(0, 30)}...`}</Text>
                <Text numberOfLines={1} style={{color: "#517fa4"}}>
                  Rp {numberWithCommas(Number(item.priceBasedNumber))}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: 'space-evenly',
                    justifyContent: "flex-start",
                  }}>
                  <Button
                    onPress={() => {
                      dispatch(decreaseQuantityAction(index));
                      dispatch(setTotalPriceAction());
                    }}
                    style={{
                      padding: 0,
                      height: 30,
                      backgroundColor: "#CBE15A",
                    }}>
                    <Text style={{color: "#517fa4"}}>-</Text>
                  </Button>

                  <Button transparent style={{padding: 0, height: 30}}>
                    <Text style={{color: "#517fa4"}}>{item.number}</Text>
                  </Button>

                  <Button
                    onPress={() => {
                      dispatch(increaseQuantityAction(index));
                      dispatch(setTotalPriceAction());
                    }}
                    style={{
                      padding: 0,
                      height: 30,
                      backgroundColor: "#CBE15A",
                    }}>
                    <Text style={{color: "#517fa4"}}>+</Text>
                  </Button>

                  <Button
                    onPress={() =>
                      navigation.navigate("ProductDetail", {
                        product_id: item.product_id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        stock: item.stock,
                        category_name: item.category_name,
                      })
                    }
                    style={{
                      padding: 0,
                      height: 30,
                      backgroundColor: "#CBE15A",
                      marginLeft: 20,
                    }}>
                    <Text style={{color: "#517fa4"}}>Detail</Text>
                  </Button>
                </View>
              </Body>
            </ListItem>
          </List>
        );
      }}
      keyExtractor={(index, item) => index + Math.random()}
    />
  );
};

export default ContentCart;
