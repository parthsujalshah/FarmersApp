import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  FlatList,
  BackHandler,
  ImageBackground,
} from 'react-native';
import {Button, Icon, Header, Title, Left, Body, Right} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import AutoScroll from 'react-native-auto-scroll';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const serverUrl = 'http://192.168.137.1:5000';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      input: '',
      messages: [],
    };
  }

  showMessage = () => {
    const http = axios.create({
      baseURL: serverUrl,
      headers: {
        'x-access-token': this.state.token,
      },
    });

    http
      .post('/show_messages/machinery')
      .then(async res => {
        console.log('doing');
        console.log(res.data.message_list);
        this.setState({
          messages: res.data.message_list,
        });
      })
      .catch(err => console.log(err));
  };

  handleBackButtonPressAndroid = () => {
    this.props.navigation.navigate(
      'Home',
      {},
      this.props.navigation.navigate({routeName: 'HomeScreen '}),
    );
  };

  async componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
    try {
      const value = await AsyncStorage.getItem('Token');
      if (value !== null) {
        this.setState({token: value});
        console.log('token msg : ', this.state.token);
      }
    } catch (e) {
      console.log(e);
    }
    this.showMessage();
  }

  messageType = item => {
    if (item.is_sender) {
      return (
        <View style={{flexDirection: 'row-reverse', padding: 5}}>
          <TextInput
            multiline={true}
            value={item.message}
            editable={false}
            style={styles.infoText}
          />
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', padding: 5}}>
          <TextInput
            multiline={true}
            value={item.message}
            editable={false}
            style={styles.infoText2}
          />
        </View>
      );
    }
  };

  addMessage = () => {
    if (this.state.input.trim() !== '') {
      const http = axios.create({
        baseURL: serverUrl,
        headers: {
          'x-access-token': this.state.token,
        },
      });
      console.log('msg sending');

      http
        .post('/add_message', {
          message: this.state.input.trim(),
          group_type: 'machinery',
        })
        .then(async res => {
          console.log('msg sent');
          console.log(res.data.message);
          this.showMessage();
          this.setState({
            input: '',
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/1.jpg')}
          style={{width: '100%', flex: 1}}>
          <View style={{flex: 16}}>
            <Header
              transparent
              androidStatusBarColor="rgba(0, 0, 0, 1)"
              //style={{ backgroundColor: '#9ca9a9', elevation: 10 }}
            >
              <Left>
                <MaterialIcons
                  name="arrow-back"
                  size={30}
                  onPress={() => this.props.navigation.goBack()}
                />
              </Left>
              <Body>
                <Title
                  style={{
                    fontFamily: 'serif',
                    color: 'black',
                    fontSize: 23,
                    textAlign: 'center',
                  }}>
                  {this.props.lang == 'en'
                    ? `Connect To Others`
                    : 'हम से बात करे'}
                </Title>
              </Body>
            </Header>
            <AutoScroll style={{flex: 15, margin: 10}}>
              <FlatList
                data={this.state.messages}
                renderItem={({item}) => this.messageType(item)}
              />
            </AutoScroll>
          </View>
          <KeyboardAvoidingView
            keyboardVerticalOffset={30}
            //behavior="padding"
            style={{
              flexDirection: 'row',
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0)',
              justifyContent: 'center',
              alignContent: 'center',
              marginBottom: 25,
            }}>
            <TouchableOpacity
              onPress={this._showDialog}
              style={styles.attachBtn}>
              <Entypo name="attachment" size={28} />
            </TouchableOpacity>
            <TextInput
              value={this.state.input}
              onChangeText={input => {
                this.setState({input});
              }}
              multiline={true}
              placeholder={'ADD MESSAGE'}
              placeholderTextColor="#5e5554"
              style={styles.textinput}
              textAlignVertical="auto"
            />
            <TouchableOpacity
              onPress={() => this.addMessage()}
              style={styles.sendBtn}>
              <Feather name="send" size={28} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
  };
};

export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
  notch: {
    backgroundColor: '#000',
    paddingTop: StatusBar.currentHeight,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
    padding: 5,
  },
  infoText: {
    height: 'auto',
    backgroundColor: '#bdff59',
    width: 'auto',
    maxWidth: '85%',
    fontSize: 15,
    borderRadius: 10,
    borderTopRightRadius: -200,
    color: 'black',
    padding: 5,
    marginRight: 5,
    alignSelf: 'flex-end',
  },
  userIcon2: {
    width: 40,
    height: 40,
    borderRadius: 25,
    padding: 5,
  },
  infoText2: {
    height: 'auto',
    backgroundColor: '#69fff2',
    width: 'auto',
    maxWidth: '85%',
    fontSize: 15,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    color: 'black',
    padding: 5,
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
  textinput: {
    marginTop: 'auto',
    marginBottom: 10,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#eaeaea',
    width: '75%',
    fontSize: 18,
  },
  sendBtn: {
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 10,
    alignItems: 'center',
    height: 50,
    width: '10%',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#eaeaea',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  attachBtn: {
    marginLeft: 10,
    marginTop: 'auto',
    marginBottom: 10,
    alignItems: 'center',
    height: 50,
    width: '10%',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#eaeaea',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    zIndex: 99,
  },
});
