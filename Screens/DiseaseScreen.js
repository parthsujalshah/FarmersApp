import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Card, Button} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const serverUrl = 'http://192.168.137.1:5000';

class DiseaseCheckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      healthy: null,
      isUploading: false,
    };
  }

  addImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.showImagePicker(response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            this.setState({imagedata: response.data, image: response.uri});
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  uploadButton = () => {
    if (!this.state.isLoading) {
      return (
        <View style={{marginTop: 1, width: '100%'}}>
          <Button
            onPress={() => {
              this.setState({
                isLoading: !this.state.isLoading,
              });
              this.UploadImage();
            }}
            light
            block>
            <Text
              style={{
                fontSize: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              Upload Image
            </Text>
          </Button>
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

  UploadImage = () => {
    console.log('uploading');
    const http = axios.create({
      baseURL: serverUrl,
      headers: {
        'x-access-token': this.state.token,
      },
    });
    http
      .post('/disease_check', {
        image: this.state.imagedata,
      })
      .then(res => {
        console.log(res.data.healthy);
        this.setState({
          healthy: res.data.healthy,
          isLoading: !this.state.isLoading,
        });
        alert('Uploaded');
      })
      .catch(err => {
        console.log(err);
      });
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('Token');
      if (value !== null) {
        this.setState({token: value});
        console.log(this.state.token);
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          alignItems: 'center',
          marginTop: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width,
            //borderColor: 'black',
            //marginBottom: 30,
          }}>
          <Image
            style={{
              resizeMode: 'stretch',
              height: '100%',
              width: '100%',
            }}
            source={
              this.state.image == null
                ? require('./../assets/upload.png')
                : {
                    uri: this.state.image,
                  }
            }
          />
        </View>
        <Button
          onPress={() => {
            // alert('hi')
            this.addImage();
          }}
          light
          block>
          <Text
            style={{
              fontSize: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Click here to choose Image
          </Text>
        </Button>
        {/* <Button
          onPress={() => {
            // alert('hi')
            this.UploadImage();
          }}
          light
          block>
          <Text
            style={{
              fontSize: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Upload Image
          </Text>
        </Button> */}
        {this.uploadButton()}
        <View style={{flex: 1, marginTop: 40}}>
          <ScrollView
            style={{flex: 1, marginBottom: 30, alignContent: 'center'}}>
            <Card style={styles.card}>
              <Text style={styles.text}>Disease</Text>
              <Text style={styles.text}>
                {this.state.healthy == false
                  ? 'Not Healty'
                  : this.state.healthy == true
                  ? 'Healthy'
                  : 'Not Uploaded'}
              </Text>
            </Card>

            <Card
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                alignSelf: 'center',
                alignContent: 'center',
              }}>
              <Text style={styles.text}>Suggestions</Text>

              <Text style={styles.text}>
                Sint amet labore et ex adipisicing. Exercitation voluptate
                consectetur elit amet ea do velit eu. Anim eu pariatur fugiat
                mollit incididunt ullamco ipsum ipsum ut excepteur amet. Dolor
                deserunt exercitation esse labore dolore do exercitation.
                Aliquip elit aliquip nulla elit nulla. Duis esse incididunt
                eiusmod do. Ut laborum labore nulla est ea aliquip sunt
                incididunt magna enim dolor laboris duis.
              </Text>
            </Card>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default DiseaseCheckScreen;
