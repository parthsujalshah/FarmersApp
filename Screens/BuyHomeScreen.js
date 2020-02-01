import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {Header, Left, Body, Button, Title} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {Overlay} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const serverUrl = 'http://192.168.137.1:5000';

class BuyHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cropsList: [],
      token: '',
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('Token');
      if (value !== null) {
        this.setState({token: value});
        console.log('token ', this.state.token);
        const http = axios.create({
          baseURL: serverUrl,
          headers: {
            'x-access-token': this.state.token,
          },
        });
        http
          .post('/buyer_home')
          .then(async res => {
            console.log('doing');
            console.log(res.data.crops_for_sale[0].crops_for_sale);
            this.setState({
              cropsList: res.data.crops_for_sale[0].crops_for_sale,
            });
            // console.log(this.state.schemes);
          })
          .catch(err => console.log(err));
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          androidStatusBarColor="rgba(0, 0, 0, 1)"
          style={{backgroundColor: '#9ca9a9', elevation: 10}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" size={30} style={{color: 'black'}} />
            </Button>
          </Left>
          <Body style={{alignSelf: 'center', marginLeft: 55}}>
            <Title style={{color: 'black', fontSize: 20}}>
              {this.props.lang == 'en' ? `CDK GLOBAL` : 'सी.डी.के ग्लोबल '}
            </Title>
          </Body>
        </Header>
        <FlatList
          style={{flex: 1, marginBottom: 10}}
          data={this.state.cropsList}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback>
                <Card
                  title={item.crop_name}
                  image={{
                    uri: `data:image/gif;base64,${item.selling_crop_image_base64}`
                  }}
                  containerStyle=
                  {{
                    elevation: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                    backgroundColor: '#ffb64f',
                  }}
                  dividerStyle=
                  {{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                  }}
                  >
                  <Text numberOfLines={2}>
                    Quantity : {item.selling_crop_kg}
                  </Text>
                </Card>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
  };
};

export default connect(mapStateToProps)(BuyHomeScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
});
