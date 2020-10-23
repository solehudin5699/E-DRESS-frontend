import React, {useState} from 'react';
import {
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import {Text, Card, CardItem, Body} from 'native-base';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {serverAddress} from '../../sharedVariable';
import {
  getProductsAPICreator,
  setResetCreator,
  setPageCreator,
} from '../redux/actions/products';
import {modalEditDeleteAction} from '../redux/actions/modal';

function Touchable(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {dataLogin} = useSelector((state) => state.authAPI);
  return (
    <TouchableOpacity
      onLongPress={() => {
        Number(dataLogin.level_id) === 1
          ? dispatch(modalEditDeleteAction(true, props.params))
          : null;
      }}
      title={`Go to ${props.screenName}`}
      onPress={() => navigation.navigate(props.screenName, props.params)}>
      {props.children}
    </TouchableOpacity>
  );
}

const ProductEmpty = () => {
  const {keyword} = useSelector((state) => state.products);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 25,
      }}>
      <Icon name="search" type="material" color="#d8414a" size={50} />
      <Text
        style={{textAlign: 'center', fontSize: 15, color: '#517fa4'}}
        numberOfLines={2}>
        Maaf... produk dengan kata kunci "{keyword}" tidak ditemukan :(
      </Text>
    </View>
    // </View>
  );
};

const SomethingWrong = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 25,
      }}>
      <Icon
        name="settings-input-antenna"
        type="material"
        color="#d8414a"
        size={50}
      />

      <View
        style={{
          justifyContent: 'flex-start',
          padding: 10,
          borderColor: '#d8414a',
          borderWidth: 1,
        }}>
        <Text style={{fontSize: 15, color: '#517fa4', textAlign: 'justify'}}>
          Tidak dapat tersambung ke database kami. Kemungkinan terjadi karena:
        </Text>
        <Text style={{fontSize: 15, color: '#517fa4', textAlign: 'justify'}}>
          1. Sistem kami sedang dalam perbaikan, atau
        </Text>
        <Text style={{fontSize: 15, color: '#517fa4', textAlign: 'justify'}}>
          2. Ada masalah pada koneksi internet Anda
        </Text>
      </View>
    </View>
    // </View>
  );
};
const EndResult = () => {
  const {keyword} = useSelector((state) => state.products);
  return (
    <View style={{alignItems: 'center', paddingVertical: 10}}>
      {keyword.length === 0 ? (
        <Text style={{color: '#517fa4'}}>Sudah sampai akhir...</Text>
      ) : (
        <Text style={{color: '#517fa4'}}>Pencarian selesai...</Text>
      )}
    </View>
  );
};
const ContentHome = () => {
  // const [page, setPage] = useState(1);
  const {
    products,
    productsBasedPage,
    isPending,
    isFulFilled,
    isRejected,
    keyword,
    page,
  } = useSelector((state) => state.products);
  const {sortBy, orderBy, newest} = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const renderFooter = () => {
    if (!isPending)
      return productsBasedPage.length === 0 ? <EndResult /> : null;

    return (
      <>
        <ActivityIndicator
          animating
          size="large"
          color="#198711"
          style={{marginTop: 15, marginBottom: 0}}
        />
      </>
    );
  };
  const dataRefresh = () => {
    dispatch(setResetCreator());
    dispatch(setPageCreator(1));
    dispatch(getProductsAPICreator('', sortBy, orderBy, newest, 1));
  };

  const loadMore = () => {
    if (productsBasedPage.length === 0) {
      return null;
    } else {
      dispatch(
        getProductsAPICreator(
          keyword,
          sortBy,
          orderBy,
          newest,
          Number(page) + 1,
        ),
      );
      if (isFulFilled) {
        let newPage = Number(page) + 1;
        dispatch(setPageCreator(newPage));
      }
    }

    console.log(page);
    // }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return (
    <View
      style={{
        paddingRight: 3,
        paddingLeft: 3,
        marginTop: 0,
        marginBottom: 0,
      }}>
      {!products.length ? (
        isPending ? (
          <View style={{flex: 1}}>
            <ActivityIndicator
              animating
              size="large"
              // color
              color="#198711"
              style={{marginTop: 20, marginBottom: 15}}
            />
          </View>
        ) : isRejected ? (
          <SomethingWrong />
        ) : (
          <ProductEmpty />
        )
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({item}) => (
            <>
              <View style={{flex: 0.5}}>
                <Card>
                  <Touchable
                    screenName="ProductDetail"
                    params={{
                      product_id: item.product_id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      description: item.description,
                      stock: item.stock,
                      category_id: item.category_id,
                      category_name: item.category_name,
                    }}>
                    <CardItem cardBody>
                      <Image
                        source={{
                          uri: `${serverAddress}${item.image}`,
                        }}
                        style={{
                          height: 150,
                          width: null,
                          flex: 1,
                        }}
                      />
                    </CardItem>
                    <CardItem style={{backgroundColor: '#D7F28C'}}>
                      <Body>
                        <Text
                          style={{
                            fontSize: 14.5,
                            color: '#517fa4',
                          }}>{`${item.name.substring(0, 30)}...`}</Text>
                        <Text style={{color: '#d8414a', fontSize: 13}}>
                          Rp {numberWithCommas(item.price)}
                        </Text>
                      </Body>
                    </CardItem>
                  </Touchable>
                </Card>
              </View>
            </>
          )}
          keyExtractor={(item) => item.product_id.toString()}
          ListFooterComponent={() => renderFooter()}
          onRefresh={() => dataRefresh()}
          refreshing={isPending}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.01}
          // ItemSeparatorComponent={renderSeparator()}
        />
      )}
    </View>
  );
};

export default ContentHome;
