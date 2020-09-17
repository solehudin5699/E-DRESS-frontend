import React, {Component} from 'react';
import {TouchableOpacity, FlatList, Image, View} from 'react-native';
import {Text, Card, CardItem, Body} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
function Touchable(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      title={`Go to ${props.screenName}`}
      onPress={() => navigation.navigate(props.screenName, props.params)}>
      {props.children}
      {/* {console.log(props.params)} */}
    </TouchableOpacity>
  );
}
class ContentHome extends Component {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  render() {
    // const {navigation} = this.props;
    return (
      <View
        style={{
          paddingRight: 3,
          paddingLeft: 3,
          marginTop: 0,
        }}>
        <FlatList
          data={this.props.products.products}
          numColumns={2}
          renderItem={({item}) => (
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
                    category_name: item.category_name,
                  }}>
                  <CardItem cardBody>
                    <Image
                      source={{uri: `http://192.168.43.220:8000${item.image}`}}
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
                        Rp {this.numberWithCommas(item.price)}
                      </Text>
                    </Body>
                  </CardItem>
                </Touchable>
              </Card>
            </View>
          )}
          keyExtractor={(item) => item.product_id.toString()}
          // ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {products} = state;
  return {
    products,
  };
};

export default connect(mapStateToProps)(ContentHome);
