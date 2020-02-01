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
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {register} from './../src/actions/index';

axios.defaults.baseURL = 'http://192.168.137.1:5000';

class SignupScreen extends Component {
  state = {
    avatar: null,
    name: '',
    number: '',
    imagedata: '',
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
      title: params && params.isHeaderShow == 'en' ? 'Sign Up' : 'साइन अप करें',
    };
  };

  signUp = () => {
    this.register(this.state.name, this.state.number, this.state.imagedata);
  };
  register = async (name, number, image64) => {
    try {
      await this.props.register(name, number, image64);
      this.props.navigation.navigate('Profile');
    } catch (e) {
      alert(e);
    }
  };
  addavatar = async type => {
    if (type === 'gallery') {
      ImagePicker.launchImageLibrary({allowsEditing: true}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({avatar: response.uri, imagedata: response.data});
        }
      });
    }
    if (type === 'camera') {
      ImagePicker.launchCamera({allowsEditing: true}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({avatar: response.uri, imagedata: response.data});
        }
      });
    }
  };

  removeimage = () => {
    this.setState({
      avatar: null,
    });
  };

  render() {
    return (
      <LinearGradient
        colors={['#dec400', '#db8307', '#b54f05']}
        style={styles.linearGradient}>
        <Image
          source={require('./../assets/logo.jpg')}
          style={{
            width: 130,
            height: 130,
            borderRadius: 200,
            borderWidth: 3,
            borderColor: 'black',
            alignSelf: 'center',
            marginTop: '5%',
          }}
        />
        <TextInput
          value={this.state.name}
          autoCapitalize="characters"
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
          value={this.state.number}
          keyboardType="numeric"
          placeholder={
            this.props.lang == 'en' ? 'Mobile Number' : 'मोबाइल नंबर'
          }
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
          onChangeText={number => {
            this.setState({number});
          }}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '50%',
              height: '50%',
              borderColor: 'black',
              borderWidth: 2,
              opacity: this.state.avatar == null ? 0.75 : 1,
              marginRight: 30,
              alignSelf: 'center',
            }}>
            <Image
              style={{
                resizeMode: 'contain',
                height: '100%',
                width: '100%',
              }}
              source={
                this.state.avatar == null
                  ? this.state.lang == 'en'
                    ? require('./../assets/placeholder-en.png')
                    : require('./../assets/placeholder-hi.png')
                  : {
                      uri: this.state.avatar,
                    }
              }
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Button title="Gallery" onPress={() => this.addavatar('gallery')} />
            <Text> </Text>
            <Button
              title="Camera"
              onPress={() => this.addavatar('camera')}
              style={{marginLeft: 10}}
            />
            <Text> </Text>
            <Button
              title="Remove Image"
              onPress={() => this.removeimage()}
              style={{marginLeft: 10}}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d6fff2',
            height: 50,
            width: '80%',
            alignSelf: 'center',
            borderRadius: 30,
            elevation: 10,
          }}
          onPress={this.signUp}>
          <Text style={{fontSize: 25}}> Register </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
  };
};

export default connect(mapStateToProps, {register})(SignupScreen);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingBottom: 20,
  },
});
