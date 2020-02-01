import React, {Component} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
import Home from './Screens/index';
import 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';

console.disableYellowBox = true;

const slides = [
  {
    key: 'somethun',
    title: "Welcome To Farmer's Friend App",
    text: 'Description.\nSay something cool',
    image: require('./assets/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Lets Learn about Crop Farming !!!',
    text: 'And Also About ',
    image: require('./assets/3.jpeg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'And Provide Them With Organic Fertilizers',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('./assets/2.jpeg'),
    backgroundColor: '#22bcb5',
  },
];

export default class App extends Component {
  state = {
    showRealApp: false,
  };

  getMyValue = async () => {
    try {
      const value = await AsyncStorage.getItem('Intro');
      console.log(value);
      if (value == null) {
        AsyncStorage.setItem('Intro', 'notDone');
      } else if (value == 'Done') {
        this.setState({showRealApp: true});
      }
    } catch (e) {
      console.log(e);
      console.log('error');
    }
  };

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Farmer's Friend",
          message: 'This App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the location');
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {
            console.log(done);
          })
          .catch(err => {
            this.requestLocationPermission();
          });
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async componentDidMount() {
    await this.requestLocationPermission();
    this.getMyValue();
  }

  _renderItem = ({item}) => {
    return (
      <ImageBackground source={item.image} style={styles.image}>
        <View style={styles.mainContent}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </ImageBackground>
    );
  };
  _onDone = async () => {
    this.setState({showRealApp: true});
    await AsyncStorage.setItem('Intro', 'Done');
  };

  returnType = () => {
    if (this.state.showRealApp) {
      return <Home />;
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          onDone={this._onDone}
        />
      );
    }
  };

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        {this.returnType()}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    bottom: 0,
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    width: '80%',
    bottom: '20%',
  },
});
