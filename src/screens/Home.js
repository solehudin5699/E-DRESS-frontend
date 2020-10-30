import React, {useEffect} from "react";
import {ToastAndroid, BackHandler} from "react-native";
import {Container, View} from "native-base";
import {useSelector, useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import HeaderHome from "../components/Home/Header";
import ContentHome from "../components/Home/ContentHome";
import ModalEditDelete from "../components/Home/ModalEditDelete";
import ModalDelete from "../components//Home/ModalDelete";
import ModalFilter from "../components/Home/ModalFilter";
import {resetStatus} from "../redux/actions/order";

const Home = () => {
  const navigation = useNavigation();
  const {statusGetOrderByCust} = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    if (statusGetOrderByCust === 200 || statusGetOrderByCust === 500) {
      dispatch(resetStatus());
    }
  }, [dispatch, statusGetOrderByCust]);
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
