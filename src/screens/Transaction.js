import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Body,
  Title,
  Header,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
import {FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements';

const SECTIONS = [
  {
    title: 'INVOICE:1121',
    products: {
      order: ['Baju Tidur', 'Batik Panjang'],
      quantity: [1, 4],
      price: [10000, 20000],
    },
    totalPrice: 30000,
  },
  {
    title: 'INVOICE:1122',
    products: {
      order: ['Hijab Biru ', 'Busana Muslim'],
      quantity: [1, 4],
      price: [20000, 25000],
    },
    totalPrice: 45000,
  },
  {
    title: 'INVOICE:1123',
    products: {
      order: ['Kemeja', 'Celana'],
      quantity: [1, 4],
      price: [90000, 30000],
    },
    totalPrice: 120000,
  },
  {
    title: 'INVOICE:1124',
    products: {
      order: ['Kopiah', 'Sarung'],
      quantity: [1, 4],
      price: [50000, 70000],
    },
    totalPrice: 120000,
  },
  {
    title: 'INVOICE:1125',
    products: {
      order: ['Kemeja', 'Topi'],
      quantity: [1, 4],
      price: [30000, 20000],
    },
    totalPrice: 50000,
  },
];

const renderSectionTitle = (section) => {
  return (
    <View style={{}}>
      <Text>{section.content}</Text>
    </View>
  );
};

const renderHeader = (section, index, isActive, sections) => {
  return (
    <View style={{borderBottomWidth: 2, borderBottomColor: '#ffffff'}}>
      <Animatable.View
        duration={100}
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#D7F28C',
        }}>
        <Text style={{fontWeight: '600'}}> {section.title}</Text>
        {isActive ? (
          <Icon style={{fontSize: 18}} name="keyboard-arrow-up" />
        ) : (
          <Icon style={{fontSize: 18}} name="keyboard-arrow-down" />
        )}
      </Animatable.View>
    </View>
  );
};

const renderContent = (section, i, isActive, sections) => {
  return (
    <Animatable.View
      duration={100}
      easing="ease-in"
      animation={isActive ? 'zoomInDown' : 'zoomOut'}>
      <View>
        <ListItem>
          <Left>
            <Text>No. Nama Produk</Text>
          </Left>
          <Body>
            <Text>Harga</Text>
          </Body>
          <Right>
            <Text numberOfLines={1} style={{marginLeft: -20}}>
              Jumlah
            </Text>
          </Right>
        </ListItem>
        {section.products.order.map((item, index) => {
          return (
            <ListItem key={index}>
              <Left>
                <Text>
                  {index + 1}. {item}
                </Text>
              </Left>
              <Body>
                <Text>{section.products.price[index]} </Text>
              </Body>
              <Right>
                <Text> {section.products.quantity[index]}</Text>
              </Right>
            </ListItem>
          );
        })}
      </View>
    </Animatable.View>
  );
};

const Transaction = () => {
  const [activeSections, setActiveSection] = useState([]);
  const [onkah, setOn] = useState(false);
  useEffect(() => {
    if (activeSections) {
      setOn(false);
    }
  }, [activeSections]);
  const updateSections = (activeSections) => {
    setActiveSection(activeSections);
  };
  return (
    <Container>
      <Header
        androidStatusBarColor="#CBE15A"
        style={{
          backgroundColor: '#CBE15A',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {onkah ? (
          <ActivityIndicator animating size="large" color color="blue" />
        ) : null}
        <Body>
          <Title>Riwayat Transaksi</Title>
        </Body>
      </Header>
      <Content padder style={{backgroundColor: 'white'}}>
        <Accordion
          onPress={() => setOn(true)}
          sections={SECTIONS}
          activeSections={activeSections}
          // renderSectionTitle={renderSectionTitle}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
          underlayColor="red"
        />
      </Content>
      {/* </Container> */}
    </Container>
  );
};

export default Transaction;
