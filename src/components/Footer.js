import React, {Component} from 'react';
import {Footer, FooterTab, Button, Text, Badge} from 'native-base';
import {Icon} from 'react-native-elements';
export default class FooterHome extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{backgroundColor: '#CBE15A'}}>
          <Button badge vertical>
            {/* <Badge>
              <Text>2</Text>
            </Badge> */}
            <Icon
              // reverse
              name="home"
              type="material"
              color="#517fa4"
              size={24}
              onPress={() => alert('This is Card Body')}
            />
            <Text style={{color: '#517fa4'}}>Home</Text>
          </Button>
          {/* <Button vertical>
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button> */}
          <Button vertical>
            {/* <Button active badge vertical> */}
            {/* <Badge>
              <Text>51</Text>
            </Badge> */}
            {/* <Icon active name="navigate" /> */}
            <Icon
              name="home"
              type="material"
              color="#517fa4"
              size={24}
              onPress={() => alert('This is Card Body')}
            />
            <Text>Navigate</Text>
          </Button>
          <Button vertical>
            <Icon name="person" type="material" color="#517fa4" size={24} />
            <Text style={{color: '#517fa4'}}>Contact</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
