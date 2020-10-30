import React, {useState, useEffect} from "react";
import {
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import {useSelector, useDispatch} from "react-redux";
import {
  Content,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Textarea,
} from "native-base";
import {Icon} from "react-native-elements";
import {
  addProductsAPICreator,
  resetToastCreator,
  getProductsAPICreator,
  setResetCreator,
  setPageCreator,
} from "../../redux/actions/products";

const ContentAddProduct = () => {
  const {isAddPending, isAddFulFilled, isAddRejected} = useSelector(
    (state) => state.products,
  );
  const {sortBy, orderBy, newest} = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [categoryId, setCategoryId] = useState(1);
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

  const LoadingIndicator = () => {
    return <ActivityIndicator animating size="large" color="#198711" />;
  };
  const ToastSuccess = () => {
    ToastAndroid.show(
      "Berhasil menambahkan produk.",
      ToastAndroid.TOP,
      ToastAndroid.SHORT,
    );
  };
  const ToastError = (message) => {
    ToastAndroid.show(`${message}`, ToastAndroid.TOP, ToastAndroid.SHORT);
  };

  const handleSubmit = () => {
    if (
      name === null ||
      description === null ||
      price === null ||
      stock === null ||
      image === null ||
      categoryId === null
    ) {
      ToastError("Isi data yang diminta");
    } else {
      let data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("price", price);
      data.append("stock", stock);
      data.append("image", {
        uri: `file://${image.path}`,
        type: image.type,
        name: image.fileName,
        size: image.fileSize,
      });
      data.append("category_id", categoryId);
      dispatch(addProductsAPICreator(data));
      console.log(data);
    }
  };
  useEffect(() => {
    if (isAddFulFilled) {
      ToastSuccess();
      dispatch(setResetCreator());
      dispatch(getProductsAPICreator("", sortBy, orderBy, newest, 1));
      dispatch(setPageCreator(1));
      setName(null);
      setPrice(null);
      setCategoryId(1);
      setDescription(null);
      setImage(null);
      setStock(null);
      setTimeout(() => {
        dispatch(resetToastCreator());
      }, 3000);
    } else if (isAddRejected) {
      ToastError("Gagal dalam menambah produk, silahkan coba lagi");
      setTimeout(() => {
        dispatch(resetToastCreator());
      }, 3000);
    }
  }, [dispatch, isAddFulFilled, isAddRejected]);
  return (
    <>
      <Content>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: image ? 0 : 20,
            width: image ? null : "100%",
            alignSelf: image ? null : "center",
            marginBottom: image ? null : -20,
          }}>
          <TouchableOpacity
            style={{
              width: "60%",
              borderColor: image ? null : "#CBE15A",
              borderWidth: image ? null : 1,
              justifyContent: "center",
            }}
            onPress={() => handleSelect()}>
            {image ? (
              <Image
                add-a-photo
                style={{width: null, height: 250}}
                source={image}
              />
            ) : (
              <>
                <Icon
                  // reverse
                  name="add-a-photo"
                  type="material"
                  color="#CBE15A"
                  size={50}
                />
                <Text style={{color: "#d8414a", fontSize: 12, paddingLeft: 10}}>
                  *Klik untuk menambah gambar
                </Text>
              </>
            )}

            {image ? (
              <Button
                onPress={() => handleSelect()}
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: -15,
                  borderRadius: 10,
                  backgroundColor: "#517fa4",
                  height: 30,
                  marginRight: 3,
                  zIndex: 10,
                }}>
                <Text style={{padding: 2}}>Ganti gambar</Text>
              </Button>
            ) : null}
          </TouchableOpacity>
        </View>

        <Form
          style={{
            zIndex: -1,
            padding: 10,
          }}>
          <Item floatingLabel>
            <Label style={{fontSize: 15}}>Nama Produk</Label>
            <Input
              style={{fontSize: 15}}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </Item>
          <Item style={{paddingRight: 10, paddingVertical: 3}}>
            <Label style={{width: "30%", fontSize: 15}}>Deskripsi Produk</Label>
            <Textarea
              style={{
                width: "70%",
                marginTop: 0,
                backgroundColor: "transparent",
                fontSize: 15,
              }}
              rowSpan={5}
              bordered
              placeholder="Deskripsi"
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{fontSize: 15}}>Harga (Rp)</Label>
            <Input
              style={{fontSize: 15}}
              keyboardType="numeric"
              onChangeText={(num) => setPrice(num)}
              value={price}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{fontSize: 15}}>Jumlah</Label>
            <Input
              style={{fontSize: 15}}
              keyboardType="numeric"
              onChangeText={(num) => setStock(num)}
              value={stock}
            />
          </Item>
          <Item fixedLabel style={{flexDirection: "row"}}>
            <Label style={{width: "70%", fontSize: 15}}>Kategori</Label>
            <Picker
              style={{
                width: "30%",
                justifyContent: "center",
                alignSelf: "center",
              }}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholderIconColor="#007aff"
              selectedValue={categoryId}
              itemTextStyle={{fontSize: 15}}
              onValueChange={(value) => setCategoryId(value)}>
              <Picker.Item label="Kemeja" value={1} />
              <Picker.Item label="Kaos" value={2} />
              <Picker.Item label="Celana" value={3} />
              <Picker.Item label="Sepatu dan Sendal" value={4} />
              <Picker.Item label="Topi" value={5} />
            </Picker>
          </Item>
        </Form>
        {isAddPending ? <LoadingIndicator /> : null}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 30,
            padding: 5,
          }}>
          <Button
            onPress={() => handleSubmit()}
            style={{
              width: "95%",
              borderRadius: 10,
              backgroundColor: "#CBE15A",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text>Tambah</Text>
          </Button>
        </View>
      </Content>
    </>
  );
};

export default ContentAddProduct;
