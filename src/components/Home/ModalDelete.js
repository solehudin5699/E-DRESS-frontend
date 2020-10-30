import React, {useState, useEffect} from "react";
import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import {Button} from "native-base";
import Modal from "react-native-modal";
import {useDispatch, useSelector} from "react-redux";
import {modalDeleteAction} from "../../redux/actions/modal";
import {
  deleteProductsAPICreator,
  resetToastCreator,
  setResetCreator,
  getProductsAPICreator,
} from "../../redux/actions/products";

const window = Dimensions.get("window");
const width = window.width * window.scale;
const height = window.height * window.scale;

const ToastSuccess = () => {
  ToastAndroid.show(
    "Berhasil menghapus produk.",
    ToastAndroid.TOP,
    ToastAndroid.SHORT,
  );
};
const ToastError = () => {
  ToastAndroid.show(
    "Gagal menghapus produk.",
    ToastAndroid.TOP,
    ToastAndroid.SHORT,
  );
};
const LoadingIndicator = () => {
  return <ActivityIndicator animating size="large" color="#198711" />;
};

const ModalDelete = () => {
  const {
    modalDelete,
    dataModalEditDelete,
    sortBy,
    orderBy,
    newest,
    idDelete,
  } = useSelector((state) => state.modals);
  const {isDeletePending, isDeleteFulFilled, isDeleteRejected} = useSelector(
    (state) => state.products,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteFulFilled) {
      ToastSuccess();
      dispatch(setResetCreator());
      dispatch(getProductsAPICreator("", sortBy, orderBy, newest, 1));
      setTimeout(() => {
        dispatch(resetToastCreator());
        dispatch(modalDeleteAction(false));
      }, 1000);
    } else if (isDeleteRejected) {
      ToastError();
      setTimeout(() => {
        dispatch(resetToastCreator());
        dispatch(modalDeleteAction(false));
      }, 1000);
    }
  }, [dispatch, isDeleteFulFilled, isDeleteRejected]);
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      deviceWidth={width}
      deviceHeight={height}
      coverScreen={true}
      isVisible={modalDelete}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
      }}
      backdropOpacity={0.3}
      onBackButtonPress={() => {
        dispatch(modalDeleteAction(false));
      }}
      onBackdropPress={() => {
        dispatch(modalDeleteAction(false));
      }}
      onSwipeComplete={() => {
        dispatch(modalDeleteAction(false));
      }}
      swipeDirection="down"
      // propagateSwipe
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}>
      <View
        style={{
          backgroundColor: "#ffffff",
          width: "90%",
          padding: 10,
          justifyContent: "center",
          borderColor: "#CBE15A",
          borderRadius: 3,
        }}>
        <View style={{marginTop: 5, padding: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: "#517fa4",
            }}>
            Apakah Anda yakin ingin menghapus produk ini ?
          </Text>
        </View>
        {isDeletePending ? <LoadingIndicator /> : null}
        {isDeleteRejected ? (
          <Text style={{color: "#d8414a", fontSize: 15}}>Gagal Menghapus</Text>
        ) : null}
        {isDeleteFulFilled ? (
          <Text style={{color: "#d8414a", fontSize: 15}}>
            Berhasil Menghapus
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: 30,
          }}>
          <Button
            // rounded
            onPress={() => {
              dispatch(modalDeleteAction(false));
            }}
            style={{
              width: "30%",
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              backgroundColor: "#517fa4",
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 15, color: "#ffffff"}}>TIDAK</Text>
          </Button>
          <Button
            onPress={() => {
              // dispatch(modalDeleteAction(false));
              dispatch(deleteProductsAPICreator(Number(idDelete)));
            }}
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              backgroundColor: "#d8414a",
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 15, color: "#ffffff"}}>YA</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDelete;
