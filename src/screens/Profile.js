import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Text,
  List,
  ListItem,
  Separator,
} from 'native-base';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {logoutCreator} from '../redux/actions/auth';
const Profile = () => {
  const navigation = useNavigation();
  const clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };
  const dispatch = useDispatch();
  const {statusLogin} = useSelector((state) => state.authAPI);
  useEffect(() => {
    if (Number(statusLogin) !== 200) {
      navigation.navigate('Login');
    }
  }, [statusLogin]);
  console.log(statusLogin);
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
        <Body>
          <Title>My Profile</Title>
        </Body>
      </Header>
      <Content>
        <CardItem
          style={{
            backgroundColor: '#CBE15A',
            height: 100,
          }}>
          <Left style={{flex: 5}}>
            <Thumbnail
              style={{width: 50, height: 50, borderRadius: 50}}
              source={require('../assets/images/profile.jpg')}
            />
            <Body>
              <Text>Solehudin</Text>
              <Text note>solehudin@surel.com</Text>
            </Body>
          </Left>
          <Right
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              // reverse
              name="settings"
              type="material"
              color="#517fa4"
              size={24}
            />
          </Right>
        </CardItem>

        <List>
          <ListItem>
            <Left>
              <Text>Saldo</Text>
            </Left>
            <Right>
              <Icon
                name="keyboard-arrow-right"
                type="material"
                color="#517fa4"
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Isi Saldo</Text>
            </Left>
            <Right>
              <Icon
                name="keyboard-arrow-right"
                type="material"
                color="#517fa4"
              />
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>INFORMASI APLIKASI</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Versi App</Text>
            </Left>
            <Right>
              <Icon
                name="keyboard-arrow-right"
                type="material"
                color="#517fa4"
              />
            </Right>
          </ListItem>
          <ListItem>
            <TouchableOpacity
              // transparent
              onPress={() => {
                dispatch(logoutCreator());
              }}>
              <Left>
                <Text>Keluar</Text>
              </Left>
            </TouchableOpacity>
          </ListItem>
          <Separator bordered>
            <Text>INFORMASI UMUM</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Tutorial</Text>
            </Left>
            <Right>
              <Icon
                name="keyboard-arrow-right"
                type="material"
                color="#517fa4"
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Pusat Bantuan</Text>
            </Left>
            <Right>
              <Icon
                name="keyboard-arrow-right"
                type="material"
                color="#517fa4"
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Syarat & Ketentuan</Text>
            </Left>
            <Right>
              <Icon
                name="keyboard-arrow-right"
                type="material"
                color="#517fa4"
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Kebijakan Privasi</Text>
            </Left>
            <Right>
              <Icon
                onPress={() => clearAppData()}
                name="keyboard-arrow-right"
                type="material"
                color="#517fa4"
              />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default Profile;
