import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Switch,
} from 'react-native';
import {Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import axios from 'axios';
import {token, addProfile} from './../src/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
import Octicons from 'react-native-vector-icons/Octicons';

axios.defaults.baseURL = 'http://192.168.137.1:5000';

class LoginScreen extends Component {
  state = {
    name: '',
    pass: '',
    farmer: true,
    isLoading: true,
  };
  storeData = async token => {
    try {
      await AsyncStorage.setItem('Token', token);
      await AsyncStorage.setItem('Type', 'Farmer');
      await this.props.token(token, 'Farmer');
      this.setState({
        isLoading: !this.state.isLoading,
      });
      console.log(this.props.token);
      this.props.navigation.navigate(
        'Home',
        {},
        this.props.navigation.navigate({routeName: 'HomeScreen '}),
      );
    } catch (e) {
      alert(e);
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }
  };

  render_farmerbutton = () => {
    if (this.state.isLoading) {
      return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#d6fff2',
              height: 50,
              width: '80%',
              alignSelf: 'center',
              borderRadius: 30,
              elevation: 10,
              marginTop: 30,
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({
                isLoading: !this.state.isLoading,
              });
              this.login();
            }}>
            <Text style={{fontSize: 25, textAlign: 'center'}}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmer: !this.state.farmer,
              });
            }}
            style={{width: '40%', alignSelf: 'center', marginTop: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              Click Here To Login as Buyer
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <ActivityIndicator
            size="large"
            color="#000000"
            style={{marginTop: 20}}
          />
        </View>
      );
    }
  };

  render_buyerbutton = () => {
    if (!this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="small" color="#000000" />
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#d6fff2',
              height: 50,
              width: '80%',
              alignSelf: 'center',
              borderRadius: 30,
              elevation: 10,
              marginTop: 30,
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({
                isLoading: !this.state.isLoading,
              });
              this.buyer_login();
            }}>
            <Text style={{fontSize: 25, textAlign: 'center'}}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmer: !this.state.farmer,
              });
            }}
            style={{width: '40%', alignSelf: 'center', marginTop: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              Click Here To Login as Farmer
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      // Call any action
      navigation.closeDrawer();
      navigation.setParams({isHeaderShow: this.props.lang});
    });
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    console.log(params);
    return {
      title: params && params.isHeaderShow == 'en' ? 'Log in' : 'लॉग इन करें',
    };
  };

  login = () => {
    console.log('farmer login');
    axios
      .post('/login', {
        name: this.state.name,
        password: this.state.pass,
      })
      .then(res => {
        console.log(res.data.token);
        this.storeData(res.data.token);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: !this.state.isLoading,
        });
        alert(err);
      });
  };

  buyer_login = () => {
    console.log('buyer login');
    axios
      .post('/buyer_login', {
        username: this.state.name,
        password: this.state.pass,
      })
      .then(async res => {
        console.log(res.data);
        await AsyncStorage.setItem('Token', res.data.token);
        await AsyncStorage.setItem('Type', 'Buyer');
        this.props.addProfile(this.state.name, res.data.token);
        await this.props.token(res.data.token, 'Buyer');
        this.setState({
          isLoading: !this.state.isLoading,
        });
        this.props.navigation.navigate('BuyHome');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: !this.state.isLoading,
        });
        alert(err);
      });
  };

  Login_Type = () => {
    if (this.state.farmer) {
      return (
        <LinearGradient
          colors={['#dec400', '#db8307', '#b54f05']}
          style={styles.linearGradient}>
          <ScrollView>
            <Image
              source={require('./../assets/logo.jpg')}
              style={{
                width: 150,
                height: 150,
                borderRadius: 200,
                borderWidth: 3,
                borderColor: 'black',
                alignSelf: 'center',
                marginTop: '20%',
              }}
            />
            <TextInput
              label={this.props.lang == 'en' ? 'Name' : 'नाम'}
              value={this.state.name}
              placeholder={this.props.lang == 'en' ? 'Name' : 'नाम'}
              style={{
                marginTop: 20,
                color: 'black',
                fontSize: 25,
                textAlign: 'center',
                borderWidth: 1.2,
                width: '92%',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20,
                height: 50,
              }}
              onChangeText={name => {
                this.setState({name});
              }}
            />
            <TextInput
              value={this.state.pass}
              autoCapitalize="characters"
              secureTextEntry={true}
              placeholder={this.props.lang == 'en' ? 'Password' : 'पासवर्ड'}
              style={{
                marginTop: 20,
                color: 'black',
                fontSize: 25,
                textAlign: 'center',
                borderWidth: 1.2,
                width: '92%',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20,
                height: 50,
              }}
              onChangeText={pass => {
                this.setState({pass});
              }}
            />
            {this.render_farmerbutton()}
          </ScrollView>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient
          colors={['#dec400', '#db8307', '#b54f05']}
          style={styles.linearGradient}>
          <ScrollView>
            <Image
              source={require('./../assets/logo.jpg')}
              style={{
                width: 150,
                height: 150,
                borderRadius: 200,
                borderWidth: 3,
                borderColor: 'black',
                alignSelf: 'center',
                marginTop: '20%',
              }}
            />
            <TextInput
              value={this.state.name}
              placeholder={this.props.lang == 'en' ? 'Buyer Name' : 'नाम'}
              style={{
                marginTop: 20,
                color: 'black',
                fontSize: 25,
                textAlign: 'center',
                borderWidth: 1.2,
                width: '92%',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20,
                height: 50,
              }}
              onChangeText={name => {
                this.setState({name});
              }}
            />
            <TextInput
              value={this.state.pass}
              autoCapitalize="characters"
              secureTextEntry={true}
              placeholder={this.props.lang == 'en' ? 'Password' : 'पासवर्ड'}
              style={{
                marginTop: 20,
                color: 'black',
                fontSize: 25,
                textAlign: 'center',
                borderWidth: 1.2,
                width: '92%',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20,
                height: 50,
              }}
              onChangeText={pass => {
                this.setState({pass});
              }}
            />
            {this.render_buyerbutton()}
          </ScrollView>
        </LinearGradient>
      );
    }
  };

  render() {
    return <View style={{flex: 1}}>{this.Login_Type()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
    type: state.data.type,
    token: state.data.token,
  };
};

export default connect(mapStateToProps, {token, addProfile})(LoginScreen);

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingBottom: 20,
  },
});
