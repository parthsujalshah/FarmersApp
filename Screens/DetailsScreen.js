import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  TextInput,
  Picker,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import axios from 'axios';
import {register} from './../src/actions/index';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';

axios.defaults.baseURL = 'http://192.168.137.1:5000';

class DetailsScreen extends Component {
  state = {
    soil_quality: '',
    location: '',
    field_area: '',
    machine_list: [
      '',
      'Tractor',
      'Cultivator',
      'Chisel Plow',
      'Roller',
      'Rotator',
    ],
    machine_no: [1, 1],
    quantity: [],
    machine_selected: [],
    pass: '',
    avatar: null,
  };

  getNotification = async () => {
    PushNotification.localNotification({
      /* Android Only Properties */
      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText:
        ' Your Username:  ' +
        this.props.name +
        '\n' +
        ' Your Password : ' +
        this.state.pass, // (optional) default: "message" prop
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      finish: {
        finish() {
          console.log('finish');
        },
      },
      /* iOS and Android properties */
      title: 'Login Successful', // (optional)
      message:
        ' Your Username:  ' +
        this.props.name +
        '\n' +
        ' Your Password : ' +
        this.state.pass, // (required)
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  };

  profileDone = () => {
    var machines = '';
    this.state.machine_no.map((item, index) => {
      machines = machines.concat(this.state.machine_selected[index]);
      machines = machines.concat(':');
      machines = machines.concat(this.state.quantity[index]);
      machines = machines.concat(',');
    });
    axios
      .post('/sign_up', {
        name: this.props.name,
        phone_number: this.props.number,
        pan_image_base64: this.props.image64,
        soil_card_image_base64: this.state.soil_quality,
        location: this.state.location,
        field_area: this.state.field_area,
        machinery: machines,
      })
      .then(res => {
        console.log(res.data.password);
        this.setState({pass: res.data.password});
        this.getNotification();
        this.props.navigation.navigate('Login', {}, 'Loginscreen');
      })
      .catch(err => {
        console.log(err);
      });
  };

  list = item => {
    let self = this;
    console.log(this.state.machine_selected);
    return (
      <View style={{flexDirection: 'row'}}>
        <Picker
          selectedValue={self.state.machine_selected[item.index]}
          prompt="    Select Machinery Type"
          style={{width: '60%'}}
          itemStyle={{alignSelf: 'center', marginLeft: 50}}
          onValueChange={(itemValue, itemIndex) => {
            var joined = this.state.machine_selected;
            joined[item.index] = itemValue;
            this.setState({machine_selected: joined});
          }}>
          <Picker.Item label="Select Machine" value={null} />
          <Picker.Item label="Tractor" value="Tractor" />
          <Picker.Item label="Cultivator" value="Cultivator" />
          <Picker.Item label="Rotator" value="Rotator" />
          <Picker.Item label="Roller" value="Roller" />
          <Picker.Item label="Chisel Plow" value="Chisel Plow" />
        </Picker>
        <TextInput
          value={this.state.quantity}
          keyboardType="number-pad"
          placeholder={this.props.lang == 'en' ? 'Quantity' : 'मोबाइल नंबर'}
          style={{color: 'black', fontSize: 18, justifyContent: 'flex-start'}}
          onChangeText={quantity => {
            var joined = this.state.quantity;
            joined[item.index] = quantity;
            this.setState({quantity: joined});
          }}
        />
      </View>
    );
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
          this.setState({avatar: response.uri, soil_quality: response.data});
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
          this.setState({avatar: response.uri, soil_quality: response.data});
        }
      });
    }
  };

  removeimage = () => {
    this.setState({
      avatar: null,
    });
  };

  onItemSelected = quantity => {
    this.setState({quantity});
  };

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
        // console.log('You can use the location');
        Geolocation.getCurrentPosition(
          position => {
            const initialPosition = JSON.stringify(position);
            console.log(
              'latitude: ' +
                position.coords.latitude +
                ' longitude: ' +
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

  async componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
    });
    await this.requestLocationPermission();
  }

  render() {
    return (
      <LinearGradient
        colors={['#dec400', '#db8307', '#b54f05']}
        style={styles.linearGradient}>
        <Image
          source={require('./../assets/logo.jpg')}
          //source={{ uri: `data:image/gif;base64,${this.props.image64.slice(2)}` }}
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
        <ScrollView style={{flex: 1, height: '100%'}}>
          <TextInput
            value={this.state.field_area}
            keyboardType="number-pad"
            placeholder={this.props.lang == 'en' ? 'Field Area' : 'मोबाइल नंबर'}
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
            onChangeText={field_area => {
              this.setState({field_area});
            }}
          />
          <View
            style={{flexDirection: 'row', marginTop: 30, alignSelf: 'center'}}>
            <Text
              style={{
                marginTop: 20,
                color: 'black',
                fontSize: 18,
                width: '60%',
                marginBottom: 20,
              }}>
              Add Machines
            </Text>
            <Icon
              type="MaterialIcons"
              name="add"
              style={{marginTop: 20}}
              onPress={() => {
                var joined = this.state.machine_no.concat(1);
                this.setState({machine_no: joined});
              }}
            />
          </View>
          <FlatList
            data={this.state.machine_no}
            renderItem={item => this.list(item)}
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
                      ? require('./../assets/placeholder2.png')
                      : require('./../assets/placeholder2.png')
                    : {
                        uri: this.state.avatar,
                      }
                }
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Button
                title="Gallery"
                onPress={() => this.addavatar('gallery')}
              />
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
        </ScrollView>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d6fff2',
            height: 50,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 30,
            elevation: 10,
            marginTop: 30,
          }}
          onPress={this.profileDone}>
          <Text style={{fontSize: 25}}> Done </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
    name: state.data.name,
    number: state.data.number,
    image64: state.data.image64,
  };
};
export default connect(mapStateToProps, {})(DetailsScreen);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
