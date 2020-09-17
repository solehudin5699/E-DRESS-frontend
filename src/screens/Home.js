import React, {Component} from 'react';
import {Container, Content, View} from 'native-base';
import HeaderHome from '../components/Header';
import ContentHome from '../components/Content';
// import FooterHome from '../components/Footer';

const Home = () => {
  return (
    <Container>
      <HeaderHome />
      <View style={{flex: 1}}>
        <ContentHome />
      </View>
      {/* <FooterHome /> */}
    </Container>
  );
  // }
};

export default Home;
