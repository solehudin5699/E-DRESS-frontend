import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {
  Container,
  Header,
  Content,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Footer,
  FooterTab,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Textarea,
} from 'native-base';
import {Icon, ButtonGroup} from 'react-native-elements';
import {setTotalPriceAction} from '../redux/actions/cart';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {
  addProductsAPICreator,
  resetToastCreator,
  getProductsAPICreator,
  setResetCreator,
  setPageCreator,
} from '../redux/actions/products';

const AddProduct = () => {
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

  const LoadingIndicator = () => {
    return <ActivityIndicator animating size="large" color="#198711" />;
  };
  const ToastSuccess = () => {
    ToastAndroid.show(
      'Berhasil menambahkan produk.',
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
      ToastError('Isi data yang diminta');
    } else {
      let data = new FormData();
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
      dispatch(addProductsAPICreator(data));
      console.log(data);
    }
  };
  useEffect(() => {
    if (isAddFulFilled) {
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
        dispatch(resetToastCreator());
      }, 3000);
    } else if (isAddRejected) {
      ToastError('Gagal dalam menambah produk, silahkan coba lagi');
      setTimeout(() => {
        dispatch(resetToastCreator());
      }, 3000);
    }
  }, [dispatch, isAddFulFilled, isAddRejected]);
  return (
    <>
      <Container>
        <Content>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: image ? 0 : 20,
              width: image ? null : '60%',
              alignSelf: image ? null : 'center',
              marginBottom: image ? null : -20,
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                borderColor: image ? null : '#CBE15A',
                borderWidth: image ? null : 1,
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
                  <Text
                    style={{color: '#d8414a', fontSize: 12, paddingLeft: 10}}>
                    *Klik untuk menambah gambar
                  </Text>
                </>
              )}

              {image ? (
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
              ) : null}
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
          {isAddPending ? <LoadingIndicator /> : null}
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
              <Text>Tambah</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </>
  );
};

export default AddProduct;

// import React, {useState} from 'react';
// import {Input, ButtonGroup} from 'react-native-elements';
// import ImagePicker from 'react-native-image-picker';
// import Axios from 'axios';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ToastAndroid,
//   ActivityIndicator,
// } from 'react-native';
// // import style from '../style/addMenu';
// import Fork from 'react-native-vector-icons/MaterialCommunityIcons';

// const AddMenu = () => {
//   // state
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState(null);
//   const [price, setPrice] = useState(null);
//   const [id_category, setidCategory] = useState(null);
//   const [catName, setCatName] = useState(null);
//   const [status, setStatus] = useState(128);

//   // to handle photo from localStorage
//   const handleChoose = () => {
//     const options = {
//       title: 'select-picture',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//       noData: true,
//     };

//     ImagePicker.launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('dicancel');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const source = response;
//         setImage(source);
//       }
//     });
//   };
//   const loading = () => {
//     return <ActivityIndicator size="large" color="black" />;
//   };

//   const toast = () => {
//     ToastAndroid.show('Add menu success', ToastAndroid.TOP, ToastAndroid.SHORT);
//   };

//   const error = () => {
//     ToastAndroid.show('cannot ', ToastAndroid.TOP, ToastAndroid.SHORT);
//   };

//   const handleSubmit = () => {
//     if (
//       name === null ||
//       image === null ||
//       price === null ||
//       id_category === null
//     ) {
//       error();
//     } else {
//       let data = new FormData();
//       data.append('name', name);
//       data.append('image', {
//         uri: `file://${image.path}`,
//         type: image.type,
//         name: image.fileName,
//         size: image.fileSize,
//       });
//       data.append('price', price);
//       data.append('id_category', id_category);

//       const config = {
//         headers: {
//           'content-type': 'multipart/form-data',
//           contentType: false,
//           mimeType: 'multipart/form-data',
//           'cache-control': 'no-cache',
//           accept: 'application/json',
//         },
//       };
//       const url = 'http://54.198.163.118:8000/insert';
//       Axios.post(url, data, config)
//         .then((res) => {
//           console.log(res);
//           setStatus(res.status);
//           setTimeout(() => setStatus(null), 2000);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       setCatName(null);
//       setImage(null);
//       setName(null);
//       setPrice(null);
//     }
//   };

//   return (
//     <>
//       {status === 200 ? toast() : null}
//       <View style={style.container}>
//         <View style={style.header}>
//           <View style={style.logoName}>
//             <View style={style.logo}>
//               <Fork name="food-fork-drink" size={15} color="black" />
//             </View>
//             <Text style={style.brandName}>FoodPedia</Text>
//           </View>
//         </View>
//         <View style={style.title}>
//           <Text style={style.titleText}>Add your menu</Text>
//         </View>
//         <View style={style.form}>
//           <View style={style.imgPicker}>
//             <TouchableOpacity
//               style={style.pick}
//               onPress={() => {
//                 handleChoose();
//               }}>
//               {image === null ? (
//                 <Text style={{fontWeight: 'bold', color: 'black'}}>
//                   Select picture{' '}
//                 </Text>
//               ) : (
//                 <Text style={{fontWeight: 'bold', color: 'black'}}>Change</Text>
//               )}
//             </TouchableOpacity>
//             <Image source={image} style={style.pic} />
//           </View>
//           <Input
//             placeholder="name"
//             onChangeText={(text) => setName(text)}
//             value={name}
//           />
//           <Input
//             placeholder="price"
//             keyboardType="numeric"
//             onChangeText={(num) => setPrice(num)}
//             value={price}
//           />
//           <View style={style.catName}>
//             <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Category</Text>
//             <Text style={{fontWeight: 'bold', marginLeft: 30, fontSize: 18}}>
//               {catName}
//             </Text>
//             {catName === null ? null : <Fork name="check" />}
//           </View>
//           <View style={style.category}>
//             <TouchableOpacity
//               style={style.item}
//               onPress={() => {
//                 setCatName('Appetizers');
//                 setidCategory('1');
//               }}>
//               <Text style={{color: 'black'}}>Appetizers</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={style.item}
//               onPress={() => {
//                 setCatName('Main Dish');
//                 setidCategory('2');
//               }}>
//               <Text style={{color: 'black'}}>Main Dish</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={style.item}
//               onPress={() => {
//                 setCatName('Dessert');
//                 setidCategory('3');
//               }}>
//               <Text style={{color: 'black'}}>Dessert</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={style.item}
//               onPress={() => {
//                 setCatName('Beverage');
//                 setidCategory('4');
//               }}>
//               <Text style={{color: 'black'}}>Beverage</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity
//             style={style.addBtn}
//             onPress={() => {
//               handleSubmit();
//             }}>
//             <Text style={style.add}>Add</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// };

// export default AddMenu;

// import {StyleSheet} from 'react-native';

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     // marginBottom: 10,
//     backgroundColor: '#212F3D',
//     alignItems: 'center',
//     paddingLeft: 10,
//     paddingRight: 10,
//     flexDirection: 'row',
//     width: '100%',
//     height: 70,
//     justifyContent: 'space-between',
//   },
//   logoName: {
//     flexDirection: 'row',
//     height: '25%',
//     alignItems: 'center',
//   },
//   brandName: {
//     color: 'white',
//     marginLeft: 5,
//     fontWeight: 'bold',
//   },
//   logo: {
//     width: 35,
//     backgroundColor: 'white',
//     height: 35,
//     padding: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 6,
//   },
//   title: {
//     height: 50,
//     backgroundColor: '#212F3D',
//     paddingLeft: 20,
//     marginBottom: 15,
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   form: {
//     padding: 20,
//   },
//   imgPicker: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   pick: {
//     marginLeft: 10,
//     backgroundColor: '#7DCEA0',
//     padding: 6,
//     marginTop: 10,
//     marginBottom: 10,
//     borderRadius: 6,
//   },
//   pic: {
//     marginBottom: 10,
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//     marginLeft: 10,
//     borderRadius: 10,
//   },
//   category: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//   },
//   catName: {
//     marginBottom: 5,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//   },
//   item: {
//     padding: 7,
//     backgroundColor: '#7DCEA0',
//     borderRadius: 6,
//   },
//   addBtn: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//     alignSelf: 'center',
//     width: 200,
//     height: 50,
//     borderRadius: 20,
//     backgroundColor: '#212F3D',
//   },
//   add: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     color: 'white',
//   },
// });
