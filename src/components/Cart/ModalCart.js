/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from "react";
import {Text, View, Dimensions, ActivityIndicator} from "react-native";
import {Button} from "native-base";
import Modal from "react-native-modal";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "react-native-elements";

const window = Dimensions.get("window");
const width = window.width * window.scale;
const height = window.height * window.scale;
const ModalCart = (props) => {
  const {isPostOrderPending, statusPostOrder} = useSelector(
    (state) => state.order,
  );
  const {cart} = useSelector((state) => state.cart);
  const {handleBuy, hideModal, isModalShow} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusPostOrder === 200) {
      setTimeout(() => {
        hideModal();
      }, 1500);
    } else if (statusPostOrder === 500) {
      setTimeout(() => {
        hideModal();
      }, 1500);
    }
  }, [statusPostOrder]);
  return (
    // <View style={{flex: 1, width: '100%'}}>
    //   <Button title="Show modal" onPress={() => setModalVisible(true)} />

    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      deviceWidth={width}
      deviceHeight={height}
      coverScreen={true}
      isVisible={isModalShow}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
      }}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}
      backdropOpacity={0.3}
      onBackButtonPress={() => {
        hideModal();
      }}
      onBackdropPress={() => {
        // dispatch(modalSignOutAction(false));
      }}
      onSwipeComplete={() => {
        hideModal();
      }}
      swipeDirection="down"
      // propagateSwipe
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}>
      <View
        style={{
          backgroundColor: "#ffffff",
          width: "95%",
          padding: 10,
          justifyContent: "center",
          borderColor: "#CBE15A",
          borderRadius: 3,
          flexDirection: "column",
          height: 150,
        }}>
        {statusPostOrder === 200 ? (
          <>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                alignSelf: "center",
              }}>
              <Icon
                reverse
                name="check"
                type="material"
                color="#1EC15F"
                size={20}
              />
              <Text style={{fontSize: 15}}>Sukses</Text>
            </View>
          </>
        ) : null}
        {statusPostOrder === 500 ? (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              alignSelf: "center",
            }}>
            <Icon
              reverse
              name="close"
              type="material"
              color="#FF5B37"
              size={20}
            />
            <Text style={{fontSize: 15}}>Gagal</Text>
          </View>
        ) : null}
        {isPostOrderPending ? (
          <View style={{alignSelf: "center"}}>
            <ActivityIndicator animating size="large" color="#198711" />
          </View>
        ) : statusPostOrder === 200 || statusPostOrder === 500 ? null : (
          <>
            <View style={{marginTop: 5, padding: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#517fa4",
                }}>
                Beli sekarang ?
              </Text>
            </View>
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
                  hideModal();
                }}
                style={{
                  width: "30%",
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  backgroundColor: "#d8414a",
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 15, color: "#ffffff"}}>Batal</Text>
              </Button>
              <Button
                onPress={() => {
                  handleBuy();
                }}
                style={{
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  backgroundColor: "#517fa4",
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 15, color: "#ffffff"}}>YA</Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </Modal>
    // </View>
  );
};

export default ModalCart;
