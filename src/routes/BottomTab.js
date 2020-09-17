import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

function HomeScreen() {
  return (
    <View style={{flex: 1, padding: 10, alignItems: 'center'}}>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
        saepe quaerat natus nobis optio sunt ducimus facere porro nam itaque.
        Totam vel sed similique illum temporibus quam incidunt quod recusandae?
        Numquam impedit culpa voluptas quia eius fugit totam at, vel tempora et
        non adipisci, distinctio quod aut deleniti enim ipsam eos, hic
        blanditiis. Corporis possimus ullam dolores magni cum temporibus.
        Laborum placeat excepturi at cum commodi omnis temporibus eos?
        Praesentium sequi neque dolore rerum consectetur earum sunt id!
        Reprehenderit iure omnis voluptatum dolor iusto doloribus eaque voluptas
        cupiditate. Odio, atque. Tenetur sapiente deserunt voluptates illum
        necessitatibus dolorum ullam, tempora sit commodi provident aspernatur
        recusandae aliquid dicta. Suscipit nihil optio earum eaque corporis.
        Recusandae, modi exercitationem eveniet aperiam ipsa voluptas vero!
        Corporis totam commodi placeat earum asperiores ad deserunt, vel
        temporibus ab expedita velit tempora cumque quod voluptas aliquam quis
        quo repudiandae, obcaecati quaerat architecto harum iusto quidem modi!
        Quasi, eum! Eius sit id consequatur rem sapiente ducimus quaerat sunt
        iusto harum facilis. Pariatur dolor soluta, natus iste, ipsam
        exercitationem ut labore quo eum sit suscipit tempora inventore vel. At,
        accusamus? Quis velit unde, sequi sint optio omnis quidem, dicta ipsam
        nostrum vero facilis. Doloribus asperiores ut ullam aliquam illum, magni
        similique est commodi nam repudiandae praesentium natus provident
        corrupti voluptate? Commodi aliquam dicta porro quibusdam minus nihil
        iusto accusantium, vitae saepe pariatur nobis corporis optio nam cumque
        voluptate magnam natus debitis numquam tenetur. Commodi praesentium
        adipisci maiores, aspernatur aliquam et!
      </Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#517fa4',
        tabStyle: {backgroundColor: '#CBE15A', paddingBottom: 5},
        labelStyle: {
          // color: '#517fa4',
          textTransform: 'uppercase',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: 11,
          marginTop: -10,
        },
        adaptive: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={24} type="material" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({color, size}) => (
            <Icon name="assignment" size={24} type="material" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={24} type="material" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
