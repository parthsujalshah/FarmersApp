import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Button, Card, H1} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const serverUrl = 'http://192.168.137.1:5000';

class SellProducts extends Component {
  state = {
    image: null,
    token: '',
    name: '',
    price: '',
    quantity: '',
    image64: '',
    expPrice: '',
  };

  uploadProduct = () => {
    console.log('uploading');
    const http = axios.create({
      baseURL: serverUrl,
      headers: {
        'x-access-token': this.state.token,
      },
    });
    http
      .post('/sell', {
        crop_name: this.state.name,
        price_per_kg: this.state.price,
        selling_crop_kg: this.state.quantity,
        selling_crop_image_base64: this.state.image64,
        added: false,
      })
      .then(async res => {
        console.log(res.data.message);
        alert(res.data.message);
        this.setState({
          image: null,
          token: '',
          name: '',
          price: '',
          quantity: '',
          image64: '',
          expPrice: '',
        });
      })
      .catch(err => console.log(err));
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

  addImage = async type => {
    if (type === 'gallery') {
      ImagePicker.launchImageLibrary({allowsEditing: true}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({
            image: response.uri,
            image64: response.data,
            expPrice: ' (Expected Price : Rs. 25/ kg)',
          });
        }
      });
    } else if (type === 'camera') {
      ImagePicker.launchCamera({allowsEditing: true}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({
            image: response.uri,
            image64: response.data,
            expPrice: ' (Expected Price : Rs. 25/ kg)',
          });
        }
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('./../assets/background2.jpg')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <ScrollView
            style={{width: '100%', height: '100%'}}
            contentContainerStyle={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flex: 1}}>
              <View
                style={{
                  alignItems: 'stretch',
                  marginTop: 20,
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name="arrow-back"
                  size={25}
                  style={{
                    marginRight: 50,
                    left: 0,
                  }}
                  onPress={() => this.props.navigation.goBack()}
                />
                <H1 style={{alignSelf: 'center', marginBottom: 20}}>
                  Add Product Details
                </H1>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 250,
                  height: 200,
                  borderColor: 'black',
                  borderWidth: 2,
                }}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: '100%',
                    width: '100%',
                  }}
                  source={{uri: this.state.image}}
                />
              </View>
              <View style={{flexDirection: 'row', width: '80%'}}>
                <Button
                  style={styles.button}
                  onPress={() => this.addImage('camera')}>
                  <Text style={{color: 'white'}}>Camera</Text>
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => this.addImage('gallery')}>
                  <Text style={{color: 'white'}}>Gallery</Text>
                </Button>
              </View>
              <Card
                style={{paddingHorizontal: 20, borderRadius: 5, opacity: 0.85}}>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 15}}>Name:</Text>
                  <View
                    style={{
                      width: 300,
                      borderBottomColor: 'black',
                      borderBottomWidth: 2,
                    }}>
                    <TextInput
                      value={this.state.name}
                      style={{paddingHorizontal: 5, fontSize: 15}}
                      onChangeText={name => {
                        this.setState({name});
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: 10, marginBottom: 30}}>
                  <Text style={{fontSize: 18}}>
                    Price: {this.state.expPrice}
                  </Text>
                  <View
                    style={{
                      width: 300,
                      borderBottomColor: 'black',
                      borderBottomWidth: 2,
                    }}>
                    <TextInput
                      value={this.state.price}
                      style={{paddingHorizontal: 5, fontSize: 15}}
                      onChangeText={price => {
                        this.setState({price});
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: 1, marginBottom: 30}}>
                  <Text style={{fontSize: 15}}>Quantity:</Text>
                  <View
                    style={{
                      width: 300,
                      borderBottomColor: 'black',
                      borderBottomWidth: 2,
                    }}>
                    <TextInput
                      value={this.state.quantity}
                      style={{paddingHorizontal: 5, fontSize: 15}}
                      onChangeText={quantity => {
                        this.setState({quantity});
                      }}
                    />
                  </View>
                </View>
              </Card>
              <Button
                onPress={() => {
                  this.uploadProduct();
                }}
                style={{
                  backgroundColor: '#d9ca23',
                  width: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                  marginBottom: 'auto',
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 20}}>Upload</Text>
              </Button>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageView: {
    height: 300,
    width: 300,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#0c5e05',
    margin: 10,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default SellProducts;
