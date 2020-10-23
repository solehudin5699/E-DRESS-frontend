import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCartAction} from '../redux/actions/cart';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Container, Button, Content, CardItem, Card} from 'native-base';
import {Icon} from 'react-native-elements';
import {serverAddress} from '../../sharedVariable';

const ProductDetail = (props) => {
  const [product, setProduct] = useState({});
  const {cart} = useSelector((state) => state.cart);
  const {dataLogin} = useSelector((state) => state.authAPI);
  const dispatch = useDispatch();
  useEffect(() => {
    const {route} = props;
    const product = {
      product_id: route.params?.product_id,
      name: route.params?.name,
      price: route.params?.price,
      image: route.params?.image,
      description: route.params?.description,
      stock: route.params?.stock,
      category_name: route.params?.category_name,
    };
    setProduct(product);
  }, [props]);
  const addCart = () => {
    console.log(product);
    dispatch(addToCartAction(product));
  };
  function formatRupiah(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',00';
  }
  return (
    <Container style={{marginTop: -27}}>
      <Content>
        <Card>
          <CardItem />
          <CardItem cardBody>
            <Image
              source={{uri: `${serverAddress}${product.image}`}}
              style={{height: 300, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <View style={{flex: 1, flexDirection: 'column'}}>
              {dataLogin.level_id === 1 ? null : (
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 8}}>
                  {cart.find(
                    (item) => item.product_id === product.product_id,
                  ) ? (
                    <View>
                      <Text style={{color: '#d8414a', fontSize: 15}}>
                        Sudah ada di keranjang Anda
                      </Text>
                    </View>
                  ) : null}
                  <View
                    style={{
                      flex: 3,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: -8,
                    }}>
                    {cart.find(
                      (item) => item.product_id === product.product_id,
                    ) ? (
                      <Button
                        style={{
                          height: 30,
                          width: 150,
                          backgroundColor: '#CBE15A',
                          justifyContent: 'center',
                        }}
                        rounded
                        onPress={() => {
                          props.navigation.navigate('Cart');
                        }}>
                        <Text style={{fontSize: 15, color: '#517fa4'}}>
                          Lihat Keranjang
                        </Text>
                      </Button>
                    ) : (
                      <Button
                        transparent
                        onPress={() => {
                          // clearAppData();
                          addCart();
                          props.navigation.navigate('Cart');
                        }}>
                        <Icon
                          name="add-shopping-cart"
                          type="material"
                          size={30}
                          color="#517fa4"
                        />
                      </Button>
                    )}
                  </View>
                </View>
              )}

              <View style={{justifyContent: 'flex-start', marginBottom: 5}}>
                <Text style={styles.textProduct}>{product.name}</Text>
              </View>
              <View style={{justifyContent: 'flex-start', marginBottom: 8}}>
                <Text style={{...styles.textProduct, color: '#517fa4'}}>
                  Kategori: {product.category_name}
                </Text>
              </View>
              <View style={{justifyContent: 'flex-start', marginBottom: 8}}>
                <Text style={styles.textPrice}>
                  Rp {formatRupiah(Number(product.price))}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 14, textAlign: 'justify'}}>
                  {product.description}
                </Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
  // }
};

export default ProductDetail;

const styles = StyleSheet.create({
  textProduct: {
    color: 'black',
    fontSize: 18,
  },
  textPrice: {
    color: '#d8414a',
    fontSize: 18,
  },
  starColor: {
    color: '#d8414a',
  },
  footer: {
    backgroundColor: 'white',
  },
});
