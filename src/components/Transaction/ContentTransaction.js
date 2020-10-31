import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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
} from "native-base";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import {Icon} from "react-native-elements";

// const renderSectionTitle = (section) => {
//   return (
//     <View style={{}}>
//       <Text>{section.content}</Text>
//     </View>
//   );
// };

const renderHeader = (section, index, isActive, sections) => {
  function formatRupah(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const convertDates = (time) => {
    let monthName = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MEI",
      "JUN",
      "JUL",
      "AGS",
      "SEP",
      "OKT",
      "NOV",
      "DES",
    ];
    let dates = time.split("-");
    let date = dates[2];
    let month = dates[1] - 1;
    let year = dates[0];
    return `TGL ${date} ${monthName[month]} ${year}`;
  };
  return (
    <View style={{borderBottomWidth: 2, borderBottomColor: "#ffffff"}}>
      <Animatable.View
        duration={100}
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#D7F28C",
        }}>
        <Text style={{fontWeight: "200"}}>
          {`${convertDates(
            section.transaction_date.substring(0, 10),
          )} INVOICE-${section.transaction_date
            .substring(0, 10)
            .split("-")
            .join("")}${section.transaction_id}`}
        </Text>
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
  function formatRupiah(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <Animatable.View
      duration={100}
      easing="ease-in"
      animation={isActive ? "zoomInDown" : "zoomOut"}>
      <View>
        <ListItem>
          <Left>
            <Text>Nama Produk</Text>
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
        {section.products.split("@#_#@").map((item, index) => {
          return (
            <ListItem key={index}>
              <Left>
                <Text>{item}</Text>
              </Left>
              <Body>
                <Text>
                  {formatRupiah(Number(section.price_item.split(",")[index]))}{" "}
                </Text>
              </Body>
              <Right>
                <Text> {section.total_item.split(",")[index]}</Text>
              </Right>
            </ListItem>
          );
        })}
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 16, width: "50%", textAlign: "left"}}>
          Total harga (+PPN 10%)
        </Text>
        <Text style={{fontSize: 16, width: "50%", textAlign: "right"}}>
          Rp{formatRupiah(section.totalprice)}{" "}
        </Text>
      </View>
    </Animatable.View>
  );
};

const ContentTransaction = () => {
  const [activeSections, setActiveSection] = useState([]);
  const [onkah, setOn] = useState(false);
  const {dataOrderCust, dataAllOrder} = useSelector((state) => state.order);
  const {dataLogin} = useSelector((state) => state.authAPI);
  useEffect(() => {
    if (activeSections) {
      setOn(false);
    }
  }, [activeSections]);
  const updateSections = (activeSections) => {
    setActiveSection(activeSections);
  };
  return (
    <>
      {dataLogin.level_id === 1 ? (
        !dataAllOrder.length ? (
          <View
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text
              style={{textAlign: "center", width: "100%", color: "#517fa4"}}>
              Belum ada transaksi yang dilakukan
            </Text>
          </View>
        ) : (
          <Content style={{padding: 10}}>
            <Accordion
              onPress={() => setOn(true)}
              sections={dataAllOrder}
              activeSections={activeSections}
              // renderSectionTitle={renderSectionTitle}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
              underlayColor="red"
            />
          </Content>
        )
      ) : !dataOrderCust.length ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}>
          <Text style={{textAlign: "center", width: "100%", color: "#517fa4"}}>
            Belum ada transaksi yang dilakukan
          </Text>
        </View>
      ) : (
        <Content>
          <Accordion
            onPress={() => setOn(true)}
            sections={dataOrderCust}
            activeSections={activeSections}
            // renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            underlayColor="red"
          />
        </Content>
      )}
    </>
  );
};

export default ContentTransaction;
