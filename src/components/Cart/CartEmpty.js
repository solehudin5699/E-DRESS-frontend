import React from "react";
import {Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

const CartEmpty = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 25,
      }}>
      <Icon
        name="remove-shopping-cart"
        type="material"
        color="#d8414a"
        size={50}
      />
      <Text
        style={{textAlign: "center", fontSize: 15, color: "#517fa4"}}
        numberOfLines={2}>
        Keranjang Anda masih kosong...{" "}
        <Text
          style={{color: "#d8414a"}}
          button
          onPress={() => navigation.navigate("Home")}>
          Cari sekarang?
        </Text>
      </Text>
    </View>
  );
};

export default CartEmpty;
