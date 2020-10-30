/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from "react";
import {TouchableOpacity} from "react-native";
import {Container, Header, Title, Content, Body} from "native-base";
import {useSelector, useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import ContentProfile from "../components/Profile/ContentProfile";
import ModalConfirm from "../components/Profile/ModalConfirm";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {statusLogin, dataLogin} = useSelector((state) => state.authAPI);
  useEffect(() => {
    if (Number(statusLogin) !== 200) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      });
    }
  }, [statusLogin]);
  console.log(statusLogin);
  return (
    <>
      <Container>
        <Header
          androidStatusBarColor="#CBE15A"
          style={{
            backgroundColor: "#CBE15A",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 20,
          }}>
          <Body>
            <Title>My Profile</Title>
          </Body>
        </Header>
        <Content>
          <ContentProfile />
        </Content>
      </Container>
      <ModalConfirm />
    </>
  );
};

export default Profile;
