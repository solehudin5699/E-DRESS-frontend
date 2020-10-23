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
import {modalSignOutAction} from '../redux/actions/modal';
import {serverAddress} from '../../sharedVariable';
// import ModalConfirm from '../components/ModalConfirm';

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
  const {statusLogin, dataLogin} = useSelector((state) => state.authAPI);
  useEffect(() => {
    if (Number(statusLogin) !== 200) {
      navigation.navigate('Login');
    }
  }, [statusLogin]);
  console.log(statusLogin);
  return (
    <>
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
                source={
                  dataLogin.image
                    ? {
                        uri: `${serverAddress}${dataLogin.image}`,
                      }
                    : require('../assets/images/iconuser.png')
                }
              />
              <Body>
                <Text style={{color: '#517fa4'}}>{dataLogin.name}</Text>
                <Text note style={{color: '#517fa4'}}>
                  {dataLogin.email}
                </Text>
              </Body>
            </Left>
            <Right
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                onPress={() => navigation.navigate('EditProfile')}
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
                <Text style={{color: '#517fa4'}}>Saldo</Text>
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
                <Text style={{color: '#517fa4'}}>Isi Saldo</Text>
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
              <Text style={{color: '#517fa4'}}>INFORMASI APLIKASI</Text>
            </Separator>
            <ListItem>
              <Left>
                <Text style={{color: '#517fa4'}}>Versi App</Text>
              </Left>
              <Right>
                <Icon
                  name="keyboard-arrow-right"
                  type="material"
                  color="#517fa4"
                />
              </Right>
            </ListItem>
            <ListItem onPress={() => dispatch(modalSignOutAction(true))}>
              <TouchableOpacity
                // style={{backgroundColor: 'red', width: '100%', height: '100%'}}
                // transparent
                onPress={() => {
                  dispatch(modalSignOutAction(true));
                  // dispatch(logoutCreator());
                }}>
                <Left>
                  <Text style={{color: '#517fa4'}}>Keluar</Text>
                </Left>
              </TouchableOpacity>
            </ListItem>
            <Separator bordered>
              <Text style={{color: '#517fa4'}}>INFORMASI UMUM</Text>
            </Separator>
            <ListItem>
              <Left>
                <Text style={{color: '#517fa4'}}>Tutorial</Text>
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
                <Text style={{color: '#517fa4'}}>Pusat Bantuan</Text>
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
                <Text style={{color: '#517fa4'}}>Syarat & Ketentuan</Text>
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
                <Text style={{color: '#517fa4'}}>Kebijakan Privasi</Text>
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
        {/* <ModalConfirm /> */}
      </Container>
    </>
  );
};

export default Profile;
