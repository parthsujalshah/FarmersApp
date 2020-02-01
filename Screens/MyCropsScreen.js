import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Header, Title, Left, Body} from 'native-base';
import {
  Autocomplete,
  withKeyboardAwareScrollView,
} from 'react-native-dropdown-autocomplete';
import {List} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const serverUrl = 'http://192.168.137.1:5000';

class CropListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      token: '',
      cropList: [],
      data: [
        'Rice',
        'Jowar',
        'Bajra',
        'Wheat',
        'Pulses',
        'Cotton',
        'Sugarcane',
        'Paddy',
        'Potatoes',
      ],
    };
  }

  showCrops = item => {
    const http = axios.create({
      baseURL: serverUrl,
      headers: {
        'x-access-token': this.state.token,
      },
    });
    http
      .post('/show_crops')
      .then(res => {
        console.log(res.data.crops_list);
        this.setState({cropList: res.data.crops_list});
      })
      .catch(err => console.log('error ', err));
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
    this.showCrops();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          androidStatusBarColor="rgba(0, 0, 0, 1)"
          style={{backgroundColor: '#9ca9a9', elevation: 10}}>
          <Left>
            <MaterialIcons
              name="arrow-back"
              size={25}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Title
              style={{
                fontFamily: 'serif',
                color: 'black',
                fontSize: 28,
                textAlign: 'center',
              }}>
              {this.props.lang == 'en' ? `My Crops` : 'फसलों की सूची'}
            </Title>
          </Body>
        </Header>
        <View style={{flex: 1}}>
          {/* <SafeAreaView
            style={{width: '100%', alignSelf: 'center', zIndex: 99}}>
            <Autocomplete
              data={this.state.data}
              minimumCharactersCount={0}
              style={styles.input}
              placeholder={'Search For Crops'}
              inputContainerStyle={styles.inputContainer}
              containerStyle={{marginTop: 10, width: '90%'}}
              spinnerStyle={{
                position: 'absolute',
                marginTop: 10,
                marginRight: '5%',
                zindex: 10,
                marginLeft: 'auto',
              }}
              pickerStyle={{width: '100%', marginLeft: 0, zIndex: 99}}
              handleSelectItem={item => {
                this.setState({search: item});
                this.setState({data: [item]});
              }}
              onChangeText={item => {
                if (item == '') {
                  this.setState({data: this.state.cropList});
                }
              }}
              valueExtractor={item => item}
            />
          </SafeAreaView> */}
          <ScrollView style={{marginTop: 20}}>
            <FlatList
              data={this.state.cropList}
              renderItem={({item}) => {
                return (
                  <Text style={{alignSelf: 'center', fontSize: 20, margin: 10}}>
                    {item.crop_name}
                  </Text>
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
    token: state.data.token,
  };
};

export default connect(mapStateToProps)(CropListScreen);

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 8,
  },
  input: {maxHeight: 80},
  inputContainer: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#c7c6c1',
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: '5%',
    width: '100%',
    justifyContent: 'flex-start',
  },
});
