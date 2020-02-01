import React, {Component} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Fontisto from 'react-native-vector-icons/Fontisto';

class RegionChatGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      API_KEY: 'ELQs2wAVyLFF5Ptyn8zEkVu3AwneGktg',
      weatherData: {},
      isLoading: true,
      wall: null,
      color: '',
    };
  }
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log('You can use the location');
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            this.fetchWeather(
              position.coords.latitude,
              position.coords.longitude,
            );
            this.setState({
              location:
                position.coords.latitude + ',' + position.coords.longitude,
            });
            console.log();
          },
          error => {
            alert('Error', JSON.stringify(error));
            console.log(error);
          },
          {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
        );
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  fetchWeather(lat = 25, lon = 25) {
    // fetch(
    //   `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${this.state.API_KEY}&units=metric`,
    // )
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json);
    //     this.setState({
    //       weatherData: json,
    //       isLoading: !this.state.isLoading,
    fetch(
      `https://api.darksky.net/forecast/2b556a45d3044fab0b56f0fc3099f8c3/${lat},${lon}?units=si`,
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.currently.icon == 'clear-day') {
          this.setState({
            wall: require('./../assets/clear.jpg'),
            color: 'black',
          });
        } else if (json.currently.icon == 'rain') {
          this.setState({
            wall: require('./../assets/rain.jpg'),
            color: 'black',
          });
        } else if (json.currently.icon == 'clear-night') {
          this.setState({
            wall: require('./../assets/clear-night.jpg'),
            color: 'white',
          });
        } else if (json.currently.icon == 'snow') {
          this.setState({
            wall: require('./../assets/snow.jpg'),
            color: 'white',
          });
        } else if (json.currently.icon == 'partly-cloudy-night') {
          this.setState({
            wall: require('./../assets/partly-cloudy-night.jpg'),
            color: 'white',
          });
        } else if (json.currently.icon == 'partly-cloudy-day') {
          this.setState({
            wall: require('./../assets/partly-cloudy-day.jpg'),
            color: 'white',
          });
        } else if (json.currently.icon == 'partly-cloudy') {
          this.setState({
            wall: require('./../assets/partly-cloudy.jpg'),
            color: 'white',
          });
        }
        this.setState({
          weatherData: json,
          isLoading: !this.state.isLoading,
        });
      })
      .catch(err => console.log(err));

    // fetch(
    //   `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=ELQs2wAVyLFF5Ptyn8zEkVu3AwneGktg&q=${lat}%2C${lon}`,
    // )
    //   .then(res => res.json())
    //   .then(json => {
    //     //console.log(json.Key);
    //     fetch(
    //       `http://dataservice.accuweather.com/currentconditions/v1/${json.Key}?apikey=ELQs2wAVyLFF5Ptyn8zEkVu3AwneGktg&language=en-us&details=true&metric=true`,
    //     )
    //       .then(res => res.json())
    //       .then(data => {
    //         console.log(
    //           data[0]
    //           );
    //         this.setState({
    //           weatherData: data[0],
    //           isLoading: !this.state.isLoading,
    //         });
    //       })
    //       .catch(err => console.log(err));
    //   })
    //   .catch(err => console.log(err));
  }

  async componentDidMount() {
    await this.requestLocationPermission();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'black',
          }}>
          <StatusBar backgroundColor="black" />
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <StatusBar backgroundColor="black" />
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={this.state.wall}>
          <View
            style={{
              left: 10,
              bottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                bottom: 20,
              }}>
              <Text
                style={{
                  color: this.state.color,
                  fontSize: 75,
                  alignSelf: 'flex-end',
                }}>
                {this.state.weatherData.currently.apparentTemperature}
              </Text>
              <Text style={{color: this.state.color, fontSize: 50}}>º</Text>
              <Text
                style={{
                  color: this.state.color,
                  fontSize: 50,
                  alignSelf: 'flex-end',
                  marginBottom: 13,
                }}>
                C
              </Text>
            </View>
            <Text style={{color: this.state.color, fontSize: 20}}>
              Max. Temprature :{' '}
              {this.state.weatherData.daily.data[1].apparentTemperatureHigh}ºC
            </Text>
            <Text style={{color: this.state.color, fontSize: 20}}>
              Min. Temprature :{' '}
              {this.state.weatherData.daily.data[1].apparentTemperatureLow}ºC
            </Text>
            <Text style={{color: this.state.color, fontSize: 20}}>
              Chances Of Rain :{' '}
              {this.state.weatherData.currently.precipProbability * 100} %
            </Text>
            <Text style={{color: this.state.color, fontSize: 18}}>
              {'\n'}
              {this.state.weatherData.daily.summary}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default RegionChatGroupScreen;
