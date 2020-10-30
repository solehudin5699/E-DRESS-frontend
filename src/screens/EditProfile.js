import React, {useState, useEffect} from "react";
import {ToastAndroid, StyleSheet} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {Container, Content} from "native-base";
import ContentEditProfile from "../components/EditProfile/ContentEditProfile";
import {resetStatusUpdateCreator} from "../redux/actions/auth";

const ToastSuccess = () => {
  ToastAndroid.show(
    "Berhasil memperbarui akun.",
    ToastAndroid.TOP,
    ToastAndroid.SHORT,
  );
};
const ToastError = (message) => {
  ToastAndroid.show(`${message}`, ToastAndroid.TOP, ToastAndroid.SHORT);
};

const EditProfile = (props) => {
  const {statusUpdate, isUpdateRejected} = useSelector(
    (state) => state.authAPI,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (Number(statusUpdate) === 200) {
      ToastSuccess();
      dispatch(resetStatusUpdateCreator());
      setTimeout(() => {}, 3000);
    } else if (Number(statusUpdate) === 500 || isUpdateRejected) {
      ToastError("Gagal memperbarui akun.");
      setTimeout(() => {
        dispatch(resetStatusUpdateCreator());
      }, 3000);
    }
  }, [dispatch, statusUpdate, isUpdateRejected]);
  return (
    <>
      <Container>
        <Content style={styles.content}>
          <ContentEditProfile />
        </Content>
      </Container>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  // content: {backgroundColor: '#D7F28C'},
  contentForm: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#050505",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonImage: {
    position: "absolute",
    right: 0,
    bottom: -15,
    borderRadius: 10,
    backgroundColor: "#517fa4",
    height: 30,
    marginRight: 3,
    zIndex: 10,
    width: "90%",
  },
  form: {
    zIndex: -1,
    backgroundColor: "white",
    width: "90%",
    padding: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "#050505",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    borderColor: "#D7F28C",
    borderWidth: 1,
    width: "100%",
    marginTop: 3,
    borderRadius: 10,
    marginBottom: 3,
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginTop: 20,
  },
  buttonSubmit: {
    width: 200,
    borderRadius: 10,
    backgroundColor: "#517fa4",
    justifyContent: "center",
    alignItems: "center",
  },
});
