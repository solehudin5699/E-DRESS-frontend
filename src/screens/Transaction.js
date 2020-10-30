import React, {useEffect, useState} from "react";
import {Container, Body, Title, Header} from "native-base";
import ContentTransaction from "../components/Transaction/ContentTransaction";

const Transaction = () => {
  return (
    <Container>
      <Header
        androidStatusBarColor="#CBE15A"
        style={{
          backgroundColor: "#CBE15A",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 20,
        }}>
        <Body>
          <Title>Riwayat Transaksi</Title>
        </Body>
      </Header>
      <ContentTransaction />
    </Container>
  );
};

export default Transaction;
