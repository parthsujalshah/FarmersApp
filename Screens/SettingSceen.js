import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
  Header,
  Title,
  Left,
  Body,
  Icon,
  Button,
  DeviceEventEmitter,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import axios from 'axios';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const serverUrl = 'http://192.168.137.1:5000';

class SettingSceen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      type: '',
    };
  }

  logout = () => {
    const http = axios.create({
      baseURL: serverUrl,
      headers: {
        'x-access-token': this.state.token,
      },
    });
    if (this.state.type == 'Farmer') {
      console.log('Farmer Out');
      http
        .post('/logout', {login_route: true})
        .then(async res => {
          if (!res.data.log_in) {
            try {
              await AsyncStorage.removeItem('Token');
              await AsyncStorage.removeItem('Type');
              await AsyncStorage.removeItem('AddedToGroup');
              this.props.navigation.navigate('Login');
            } catch (e) {
              // remove error
            }
          }
        })
        .catch(err => console.log(err));
    } else {
      http
        .post('/logout_buyer', {login_route: true})
        .then(async res => {
          console.log('done');
          if (!res.data.log_in) {
            try {
              await AsyncStorage.removeItem('Token');
              await AsyncStorage.removeItem('Type');
              this.props.navigation.navigate('Login');
            } catch (e) {
              // remove error
            }
          }
        })
        .catch(err => console.log(err));
    }
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('Token');
      const type = await AsyncStorage.getItem('Type');
      console.log(type);
      if (value !== null) {
        this.setState({token: value, type: type});
        console.log(this.state.token);
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
              {this.props.lang == 'en' ? 'Settings' : 'सेटिंग्स'}
            </Title>
          </Body>
        </Header>
        <Image
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 20,
            resizeMode: 'cover',
            borderRadius: 40,
            elevation: 10,
          }}
          source={{
            uri:
              'https://img.etimg.com/thumb/width-640,height-480,imgsize-120883,resizemode-1,msid-65900138/small-and-marginal-farmers-are-to-see-better-days-with-a-free-of-cost-farmer-to-farmer-rental-program-through-this-revolutionary-app-by-tafes-jfarm-services.jpg',
          }}
        />
        <View style={{marginTop: 20}}>
          <Button
            block
            iconLeft
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 15,
              elevation: 5,
              backgroundColor: '#dedede',
            }}
            onPress={() => {
              this.props.navigation.navigate('Language');
            }}>
            <Entypo
              name="language"
              size={22}
              style={{marginRight: 30, marginLeft: '-20%', color: 'black'}}
            />
            <Text style={{fontSize: 18}}>
              {this.props.lang == 'en' ? 'Change Language' : 'भाषा बदलें'}
            </Text>
          </Button>
          <Button
            block
            iconLeft
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 15,
              elevation: 5,
              backgroundColor: '#dedede',
            }}
            onPress={() => {
              this.logout();
            }}>
            <Entypo
              name="log-out"
              size={22}
              style={{marginRight: 30, marginLeft: '-20%', color: 'black'}}
            />
            <Text style={{fontSize: 18}}>
              {this.props.lang == 'en' ? 'Log-Out' : 'लॉग आउट'}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
  };
};

export default connect(mapStateToProps)(SettingSceen);
