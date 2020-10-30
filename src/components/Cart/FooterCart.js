/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from "react";
import {TouchableOpacity, FlatList, Image, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector, useDispatch} from "react-redux";
import {deleteFromCartAction} from "../../redux/actions/cart";
import {
  postOrderAPICreator,
  resetStatus,
  getOrderByCustomerAPICreator,
} from "../../redux/actions/order";
import {Text, Button} from "native-base";
import {Icon} from "react-native-elements";
import {setTotalPriceAction} from "../../redux/actions/cart";
import ModalCart from "./ModalCart";

const FooterCart = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const dispatch = useDispatch();
  const {cart, totalPriceSelected} = useSelector((state) => state.cart);
  const {dataLogin} = useSelector((state) => state.authAPI);
  useEffect(() => {
    dispatch(setTotalPriceAction());
    // setTotal()
  }, [dispatch]);
  const handleDelete = () => {
    let isChecked = cart.find((item) => {
      return item.isChecked === true;
    });
    if (isChecked) {
      dispatch(deleteFromCartAction());
      dispatch(setTotalPriceAction());
    }
  };
  const handleBuy = () => {
    let productSelected = cart.filter((item) => item.isChecked === true);
    let body = {
      user_id: dataLogin.user_id,
      products: productSelected
        .map((item) => item.name)
        .join("@#_#@")
        .toString(),
      total_item: productSelected
        .map((item) => item.number)
        .join(",")
        .toString(),
      price_item: productSelected
        .map((item) => item.price)
        .join(",")
        .toString(),
      totalprice: Number(totalPriceSelected) + Number(totalPriceSelected) * 0.1,
    };
    dispatch(postOrderAPICreator(body));
  };
  const {statusPostOrder} = useSelector((state) => state.order);

  useEffect(() => {
    if (statusPostOrder === 200) {
      dispatch(getOrderByCustomerAPICreator(dataLogin.user_id));
      handleDelete();

      // setTimeout(() => {
      //   dispatch(resetStatus());
      // }, 10000);
    } else if (statusPostOrder === 500) {
      // setTimeout(() => {
      //   dispatch(resetStatus());
      // }, 2000);
    }
  }, [statusPostOrder]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch(resetStatus());
    });
    return unsubscribe;
  }, [navigation, dispatch]);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: "5%",
          backgroundColor: "#CBE15A",
          paddingVertical: 5,
        }}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#517fa4", fontSize: 20}}>Detail</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: "100%",
            paddingHorizontal: "5%",
            justifyContent: "center",
          }}>
          <Text style={{color: "#517fa4", fontSize: 15}}>Jumlah :</Text>
          <Text style={{color: "#517fa4", fontSize: 15}}>PPN(10%) :</Text>
          <Text style={{color: "#517fa4", fontSize: 15}}>Total :</Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            width: "100%",
            paddingHorizontal: "5%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}>
          <Text style={{color: "#517fa4", fontSize: 15}}>
            Rp {numberWithCommas(Number(totalPriceSelected))}
          </Text>
          <Text style={{color: "#517fa4", fontSize: 15}}>
            Rp {numberWithCommas(Number(totalPriceSelected) * 0.1)}
          </Text>
          <Text style={{color: "#517fa4", fontSize: 15}}>
            Rp{" "}
            {numberWithCommas(
              Number(totalPriceSelected) + Number(totalPriceSelected) * 0.1,
            )}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: "3%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
          backgroundColor: "transparent",
        }}>
        <View style={{flex: 1}}>
          <Icon
            reverse
            onPress={handleDelete}
            name="delete"
            type="material"
            color={
              cart.find((item) => {
                return item.isChecked === true;
              })
                ? "#d8414a"
                : "grey"
            }
            size={20}
          />
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}>
          <Text style={{color: "#517fa4", fontSize: 18}}>
            Rp{" "}
            {numberWithCommas(
              Number(totalPriceSelected) + Number(totalPriceSelected) * 0.1,
            )}
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}>
          <Button
            onPress={() => {
              cart.find((item) => item.isChecked === true)
                ? setModal(true)
                : null;
            }}
            style={{
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              backgroundColor: "#CBE15A",
            }}>
            <Text style={{color: "#517fa4", fontSize: 15}}>Beli</Text>
          </Button>
        </View>
      </View>
      <ModalCart
        handleBuy={handleBuy}
        hideModal={() => setModal(false)}
        isModalShow={modal}
        deleteProductSelected={handleDelete}
      />
    </>
  );
};

export default FooterCart;
