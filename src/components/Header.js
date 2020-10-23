import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Header, View, Text} from 'native-base';
import {SearchBar, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {modalFilterAction} from '../redux/actions/modal';
import {
  getProductsAPICreator,
  setKeywordCreator,
  setResetCreator,
  setPageCreator,
} from '../redux/actions/products';

function CartIcon(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.screenName)}>
      {/* {props.children} */}
      <View style={{flexDirection: 'row', width: '15%'}}>
        <Icon
          name="shopping-cart"
          type="material"
          color="#517fa4"
          size={24}
          style={{width: '100%', marginRight: 15}}
        />
        <View
          style={{
            position: 'absolute',
            height: 20,
            width: 20,
            borderRadius: 15,
            backgroundColor: '#d8414a',
            left: 20,
            top: -10,
            zIndex: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 12,
            }}>
            {props.numInCart}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function AddIcon(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.screenName)}>
      {/* {props.children} */}
      <View style={{flexDirection: 'row', width: '100%'}}>
        <Icon
          name="add-circle"
          type="material"
          color="#517fa4"
          size={24}
          style={{marginRight: 15}}
        />
      </View>
    </TouchableOpacity>
  );
}

const HeaderHome = ({navigation}) => {
  const {sortBy, orderBy, newest} = useSelector((state) => state.modals);
  const {cart} = useSelector((state) => state.cart);
  const {dataLogin} = useSelector((state) => state.authAPI);
  const [keyword, setSearch] = useState('');
  const updateSearch = (key) => {
    setSearch(key);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setResetCreator());
    dispatch(getProductsAPICreator('', sortBy, orderBy, newest, 1));
    dispatch(setPageCreator(1));
  }, [dispatch, sortBy, orderBy, newest]);
  return (
    <Header
      androidStatusBarColor="#CBE15A"
      style={{
        backgroundColor: '#CBE15A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <SearchBar
        searchIcon={{name: 'search', color: 'green', type: 'material'}}
        clearIcon={{name: 'clear', color: 'green', type: 'material'}}
        showLoading={true}
        containerStyle={{
          padding: 0,
          backgroundColor: 'transparant',
          margin: 0,
          borderWidth: 0,
          boxShadow: 'none',
          padding: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          width: '70%',
        }}
        inputContainerStyle={{
          backgroundColor: 'white',
          borderWidth: 0,
          borderRadius: 10,
          height: 40,
        }}
        inputStyle={{margin: 0, color: 'green', borderWidth: 0}}
        placeholder="Cari di sini..."
        placeholderTextColor="green"
        onChangeText={updateSearch}
        onEndEditing={() => {
          dispatch(setKeywordCreator(keyword));
          dispatch(setResetCreator());
          dispatch(getProductsAPICreator(keyword, sortBy, orderBy, newest, 1));
          dispatch(setPageCreator(1));
        }}
        onClear={() => {
          dispatch(setResetCreator());
          dispatch(setKeywordCreator(''));
          dispatch(getProductsAPICreator('', sortBy, orderBy, newest, 1));
        }}
        value={keyword}
        round={true}
      />
      <View style={{width: '15%'}}>
        <Icon
          // reverse
          name="filter-list"
          type="material"
          color="#517fa4"
          size={24}
          onPress={() => dispatch(modalFilterAction(true))}
        />
      </View>
      {dataLogin.level_id === 1 ? (
        <AddIcon screenName="AddProduct" />
      ) : (
        <CartIcon screenName="Cart" numInCart={cart.length} />
      )}
    </Header>
  );
  // }
};

export default HeaderHome;
