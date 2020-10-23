import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {serverAddress} from '../../sharedVariable';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Textarea,
} from 'native-base';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {
  updateProductsAPICreator,
  resetToastCreator,
  getProductsAPICreator,
  setResetCreator,
  setPageCreator,
} from '../redux/actions/products';

const LoadingIndicator = () => {
  return <ActivityIndicator animating size="large" color="#198711" />;
};
const ToastSuccess = () => {
  ToastAndroid.show(
    'Berhasil memperbarui produk.',
    ToastAndroid.TOP,
    ToastAndroid.SHORT,
  );
};
const ToastError = (message) => {
  ToastAndroid.show(`${message}`, ToastAndroid.TOP, ToastAndroid.SHORT);
};

const EditProduct = (props) => {
  const navigation = useNavigation();
  const [product, setProduct] = useState({});
  const {isUpdatePending, isUpdateFulFilled, isUpdateRejected} = useSelector(
    (state) => state.products,
  );

  const {sortBy, orderBy, newest} = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [categoryId, setCategoryId] = useState(null);
  const [image, setImage] = useState(null);

  const handleSelect = () => {
    const options = {
      title: 'Select picture...',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Cancel');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button', response.customButton);
      } else {
        const source = response;
        setImage(source);
      }
    });
  };

  const handleSubmit = () => {
    let data = new FormData();
    if (
      name === null ||
      description === null ||
      price === null ||
      stock === null ||
      categoryId === null
    ) {
      ToastError('Isi data yang diminta');
    } else if (image) {
      data.append('name', name);
      data.append('description', description);
      data.append('price', price);
      data.append('stock', stock);
      data.append('image', {
        uri: `file://${image.path}`,
        type: image.type,
        name: image.fileName,
        size: image.fileSize,
      });

      data.append('category_id', categoryId);
      dispatch(updateProductsAPICreator(Number(product.product_id), data));
    } else {
      data.append('name', name);
      data.append('description', description);
      data.append('price', price);
      data.append('stock', stock);
      data.append('image', product.image);
      data.append('category_id', categoryId);
      dispatch(updateProductsAPICreator(Number(product.product_id), data));
    }
  };
  useEffect(() => {
    const {route} = props;
    const product = {
      product_id: route.params?.product_id,
      name: route.params?.name,
      price: route.params?.price,
      image: route.params?.image,
      description: route.params?.description,
      stock: route.params?.stock,
      category_id: route.params?.category_id,
      category_name: route.params?.category_name,
    };
    setProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setCategoryId(Number(product.category_id));

    if (isUpdateFulFilled) {
      ToastSuccess();
      dispatch(setResetCreator());
      dispatch(getProductsAPICreator('', sortBy, orderBy, newest, 1));
      dispatch(setPageCreator(1));
      setName(null);
      setPrice(null);
      setCategoryId(1);
      setDescription(null);
      setImage(null);
      setStock(null);
      setTimeout(() => {
        navigation.navigate('Home');
        dispatch(resetToastCreator());
      }, 3000);
    } else if (isUpdateRejected) {
      ToastError('Gagal memperbarui produk, silahkan coba lagi');
      setTimeout(() => {
        dispatch(resetToastCreator());
      }, 3000);
    }
  }, [dispatch, isUpdateFulFilled, isUpdateRejected]);
  return (
    <>
      <Container>
        <Content>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                borderColor: image ? null : '#CBE15A',
                borderWidth: image ? null : 1,
              }}
              onPress={() => handleSelect()}>
              {image ? (
                <Image style={{width: null, height: 250}} source={image} />
              ) : (
                <>
                  <Image
                    style={{width: null, height: 250}}
                    source={{uri: `${serverAddress}${product.image}`}}
                  />
                </>
              )}

              <Button
                onPress={() => handleSelect()}
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: -15,
                  borderRadius: 10,
                  backgroundColor: '#517fa4',
                  height: 30,
                  marginRight: 3,
                  zIndex: 10,
                }}>
                <Text style={{padding: 2}}>Ganti gambar</Text>
              </Button>
            </TouchableOpacity>
          </View>

          <Form
            style={{
              zIndex: -1,
              padding: 10,
            }}>
            <Item floatingLabel>
              <Label>Nama Produk</Label>
              <Input onChangeText={(text) => setName(text)} value={name} />
            </Item>
            <Item style={{paddingRight: 10, paddingVertical: 3}}>
              <Label style={{width: '30%'}}>Deskripsi Produk</Label>
              <Textarea
                style={{
                  width: '70%',
                  marginTop: 0,
                  backgroundColor: 'transparent',
                }}
                rowSpan={5}
                bordered
                placeholder="Deskripsi"
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </Item>
            <Item floatingLabel>
              <Label>Harga (Rp)</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(num) => setPrice(num)}
                value={price}
              />
            </Item>
            <Item floatingLabel>
              <Label>Jumlah</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(num) => setStock(num)}
                value={stock}
              />
            </Item>
            <Item fixedLabel style={{flexDirection: 'row'}}>
              <Label style={{width: '70%'}}>Kategori</Label>
              <Picker
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholderIconColor="#007aff"
                selectedValue={categoryId}
                onValueChange={(value) => setCategoryId(value)}>
                <Picker.Item label="Kemeja" value={1} />
                <Picker.Item label="Kaos" value={2} />
                <Picker.Item label="Celana" value={3} />
                <Picker.Item label="Sepatu dan Sendal" value={4} />
                <Picker.Item label="Topi" value={5} />
              </Picker>
            </Item>
          </Form>
          {isUpdatePending ? <LoadingIndicator /> : null}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 10,
              marginTop: 20,
            }}>
            <Button
              onPress={() => handleSubmit()}
              style={{
                width: 200,
                borderRadius: 10,
                backgroundColor: '#CBE15A',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Perbarui</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </>
  );
};

export default EditProduct;
