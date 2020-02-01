import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { Header, Left, Body, Button, Title } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import ActionButton from 'react-native-action-button';
import AutoTypingText from 'react-native-auto-typing-text';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: '',
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
  }

  handleBackButtonPressAndroid = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    } else {
      return true;
    }
  };

  async componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );

    try {
      const value = await AsyncStorage.getItem('AddedToGroup');
      if (value !== null) {
        this.setState({ added: value });
        console.log(this.state.token);
      }
    } catch (e) {
      console.log(e);
    }
  }

  autotype = () => {
    return (
      <AutoTypingText
        text={
          this.props.lang == 'en'
            ? `Welcome to Farmer's Friend App !`
            : 'किसान मित्र ऐप में आपका स्वागत है !'
        }
        charMovingTime={80}
        delay={0}
        style={{
          width: 'auto',
          fontSize: 30,
          color: 'rgba(0,0,0,1)',
          margin: 20,
          left: 0,
          alignSelf: 'center',
          textAlign: 'center',
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('./../assets/background_new.jpg')}>
          <Header
            androidStatusBarColor="rgba(0, 0, 0, 1)"
            style={{ backgroundColor: '#000', elevation: 10 }}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" size={30} style={{ color: 'white' }} />
              </Button>
            </Left>
            <Body style={{ alignSelf: 'center', marginLeft: 55 }}>
              <Title style={{ color: 'white', fontSize: 20 }}>
                {this.props.lang == 'en' ? `CDK GLOBAL` : 'सी.डी.के ग्लोबल '}
              </Title>
            </Body>
          </Header>
          {this.autotype()}
          <View
            style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              top: Width * 0.5,
              position: 'absolute',
              justifyContent: 'center',
            }}>
            <Button
              transparent
              block
              style={styles.btn}
              onPress={() => {
                this.props.navigation.navigate('CropListScreen');
              }}>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Search` : 'फसलों '}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `for` : 'की'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Crops` : 'खोज'}
              </Text>
            </Button>
            <Button
              transparent
              block
              style={styles.btn}
              onPress={() => {
                this.props.navigation.navigate('SellProductScreen');
              }}>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Sell` : 'अपने '}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Your` : 'उत्पाद'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Products` : 'बेचें'}
              </Text>
            </Button>
            <Button
              transparent
              block
              style={styles.btn}
              onPress={() => {
                this.props.navigation.navigate('FinanceScreen');
              }}>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Finance` : 'बीमारी'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Related` : 'के लिए'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Details` : 'जाँच करें'}
              </Text>
            </Button>
            <Button
              transparent
              block
              style={styles.btn}
              onPress={() => {
                this.props.navigation.navigate('DiseaseScreen');
              }}>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Check` : 'ऋण के'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `For` : 'लिए'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Disease` : 'आवेदन करें'}
              </Text>
            </Button>
            <Button
              transparent
              block
              style={styles.btn}
              onPress={() => {
                console.log(this.state.added);
                if (this.state.added == 'added')
                  this.props.navigation.navigate('RegionChatGroupScreen');
                else this.props.navigation.navigate('GroupFormScreen');
              }}>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Farmer's` : 'किसान'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Groups` : 'समूह'}
              </Text>
            </Button>
            {/* <Button
              transparent
              block
              style={styles.btn}
              onPress={() => {
                this.props.navigation.navigate('WeatherScreen');
              }}>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Weather` : 'मौसम'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Forecast` : 'पूर्वानुमान'}
              </Text>
            </Button> */}
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('WeatherScreen');
              }}
            >
              <Image source={require('./../assets/Cloud.jpg')} />
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Weather` : 'मौसम'}
              </Text>
              <Text style={styles.txt}>
                {this.props.lang == 'en' ? `Forecast` : 'पूर्वानुमान'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <ActionButton buttonColor="#2C6700" style={{ marginTop: 'auto' }}>
            <ActionButton.Item
              buttonColor="#2C6700"
              title={
                this.props.lang == 'en'
                  ? `Discuss With Others`
                  : 'दूसरों के साथ चर्चा करें'
              }
              onPress={() => this.props.navigation.navigate('DiscussSreen')}>
              <Octicons
                name="comment-discussion"
                size={30}
                style={{ color: 'white' }}
              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#2C6700"
              title={this.props.lang == 'en' ? `Chat with us` : 'हम से बात करे'}
              onPress={() => this.props.navigation.navigate('ChatScreen')}>
              <MaterialCommunityIcons
                name="robot"
                size={30}
                style={{ color: 'white' }}
              />
            </ActionButton.Item>
          </ActionButton>
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

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  btn: {
    width: Width * 0.3,
    backgroundColor: '#FFCF79',
    height: Width * 0.3,
    margin: 15,
    borderTopLeftRadius: Width * 0.15,
    borderTopRightRadius: Width * 0.15,
    borderBottomRightRadius: Width * 0.15,
    borderBottomLeftRadius: Width * 0.02,
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'column',
  },

  txt: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
  },
});
