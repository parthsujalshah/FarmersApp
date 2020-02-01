import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LangSelected, LangSetup} from './../src/actions/index';
import {connect} from 'react-redux';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  handleOpen = () => {
    this.setState({show: true});
  };

  handleClose = () => {
    this.setState({show: false});
  };

  getMyValue = async () => {
    try {
      const value = await AsyncStorage.getItem('Language');
      const type = await AsyncStorage.getItem('Type');
      if (value !== null) {
        await this.props.LangSetup(value, type);
        console.log(type);
        if (type == 'Farmer') {
          this.props.navigation.navigate(
            'Home',
            {},
            this.props.navigation.navigate({routeName: 'HomeScreen '}),
          );
        } else if (type == 'Buyer') {
          this.props.navigation.navigate('BuyHome');
        } else {
          this.props.navigation.navigate('Login');
        }
      } else {
        console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getMyValue();
    console.log(this.props.type, 'of');
  }

  storeData = async lan => {
    try {
      await AsyncStorage.setItem('Language', lan);
      const type = await AsyncStorage.getItem('Type');
      await this.props.LangSelected(lan);
      if (type == 'Farmer') {
        this.props.navigation.navigate(
          'Home',
          {},
          this.props.navigation.navigate({routeName: 'HomeScreen '}),
        );
      } else if (type == 'Buyer') {
        this.props.navigation.navigate('BuyHome');
      } else {
        this.props.navigation.navigate('Login');
      }
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: Height * 0.3,
            alignContent: 'center',
          }}>
          Select Language
        </Text>
        <View
          style={{
            backgroundColor: '#78d6d6',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            borderRadius: 20,
            elevation: 20,
            height: 80,
            shadowColor: 'black',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.handleOpen();
              this.storeData('en');
            }}>
            <Text style={{fontSize: 30, fontWeight: '600'}}>English</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#78d6d6',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            borderRadius: 20,
            elevation: 20,
            height: 80,
            shadowColor: 'black',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.storeData('hi');
              this.handleOpen();
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '600',
                marginTop: 30,
                marginBottom: 30,
              }}>
              हिंदी
            </Text>
          </TouchableOpacity>
        </View>
        <SCLAlert
          theme="success"
          show={this.state.show}
          title="Successfully changed"
          titleStyle={{fontSize: 20}}
          //subtitle="Lorem ipsum dolor"
        >
          <SCLAlertButton theme="info" onPress={this.handleClose}>
            Done
          </SCLAlertButton>
        </SCLAlert>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
    type: state.data.type,
  };
};

export default connect(mapStateToProps, {LangSelected, LangSetup})(App);

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});
