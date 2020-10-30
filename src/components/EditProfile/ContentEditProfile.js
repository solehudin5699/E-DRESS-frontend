import React, {useState, useEffect} from "react";
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import {useSelector, useDispatch} from "react-redux";
import {Text, Button, Form, Item, Label, Input} from "native-base";
import {Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {updateUserAPICreator} from "../../redux/actions/auth";
import {serverAddress} from "../../../sharedVariable";

const LoadingIndicator = () => {
  return <ActivityIndicator animating size="large" color="#198711" />;
};

const ContentEditProfile = (props) => {
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const {dataLogin, isUpdatePending, statusUpdate} = useSelector(
    (state) => state.authAPI,
  );
  const dispatch = useDispatch();
  const [name, setName] = useState(dataLogin.name);
  const [username, setUsername] = useState(dataLogin.username);
  const [email, setEmail] = useState(dataLogin.email);
  const [image, setImage] = useState(null);

  const handleSelect = () => {
    const options = {
      title: "Select picture...",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("Cancel");
      } else if (response.error) {
        console.log("ImagePicker Error:", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button", response.customButton);
      } else {
        const source = response;
        setImage(source);
      }
    });
  };

  const handleSubmit = () => {
    let data = new FormData();
    if (name === null || username === null || email === null) {
      ToastError("Isi data yang diminta");
    } else if (image) {
      data.append("name", name);
      data.append("username", username);
      data.append("email", email);
      data.append("image", {
        uri: `file://${image.path}`,
        type: image.type,
        name: image.fileName,
        size: image.fileSize,
      });

      dispatch(updateUserAPICreator(Number(dataLogin.user_id), data));
    } else {
      data.append("name", name);
      data.append("username", username);
      data.append("email", email);
      data.append("image", dataLogin.image);
      dispatch(updateUserAPICreator(Number(dataLogin.user_id), data));
    }
  };
  useEffect(() => {
    setName(dataLogin.name);
    setUsername(dataLogin.username);
    setEmail(dataLogin.email);
    if (Number(statusUpdate) === 500) {
      setError(true);
    }
  }, [statusUpdate]);
  return (
    <>
      {/* <Container>
        <Content style={styles.content}> */}
      <View style={styles.contentForm}>
        <View style={styles.containerImage}>
          <TouchableOpacity
            style={{
              // width: '100%',
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomColor: image ? null : "#CBE15A",
              borderBottomWidth: image ? null : 1,
            }}
            onPress={() => handleSelect()}>
            {image ? (
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                }}
                source={image}
              />
            ) : !dataLogin.image ? (
              <Image
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 100,
                }}
                source={require("../../assets/images/iconuser.png")}
              />
            ) : (
              <>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                  }}
                  source={{
                    uri: `${serverAddress}${dataLogin.image}`,
                  }}
                />
              </>
            )}
            <View
              style={{
                position: "absolute",
                // bottom: 20,
                // right: 40,
                bottom: 3,
                right: 10,
                zIndex: 10,
                paddig: 0,
                backgroundColor: !image && !dataLogin.image ? "white" : null,
                borderRadius: !image && !dataLogin.image ? 50 : null,
              }}>
              <Icon
                reverse
                name="add-a-photo"
                type="material"
                color="#517fa4"
                size={20}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Form style={styles.form}>
          <Item regular style={styles.input}>
            <Label style={{width: "30%", marginLeft: 10}}>Nama</Label>
            <Input onChangeText={(text) => setName(text)} value={name} />
          </Item>
          <Item regular style={styles.input}>
            <Label style={{width: "30%", marginLeft: 10}}>Username</Label>
            <Input
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </Item>
          <Item regular style={styles.input}>
            <Label style={{width: "30%", marginLeft: 10}}>Email</Label>
            <Input onChangeText={(text) => setEmail(text)} value={email} />
          </Item>

          <View style={styles.containerButton}>
            <Button onPress={() => handleSubmit()} style={styles.buttonSubmit}>
              <Text>Perbarui</Text>
            </Button>
          </View>
          {error ? (
            <Text style={{color: "red", fontSize: 12}}>
              *Pastikan foto profile tidak lebih dari 1 Mb dan form tidak
              kosong...
            </Text>
          ) : null}
        </Form>
      </View>
      {isUpdatePending ? <LoadingIndicator /> : null}
      {/* </Content>
      </Container> */}
    </>
  );
};

export default ContentEditProfile;

const styles = StyleSheet.create({
  content: {backgroundColor: "#D7F28C"},
  contentForm: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // padding: 20,
  },
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
    // width: '90%',
    width: "100%",

    backgroundColor: "white",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // shadowColor: '#050505',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 3,
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
    width: "100%",
    padding: 20,
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // shadowColor: '#050505',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 3,
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
