import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {Header, Left, Body, Button, Title} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {Overlay} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const serverUrl = 'http://192.168.137.1:5000';

class GovSchemesScreen extends Component {
  state = {
    isVisible: false,
    name: '',
    details: '',
    schemes: [],
    token: '',
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

    const http = axios.create({
      baseURL: serverUrl,
      headers: {
        'x-access-token': this.state.token,
      },
    });
    http
      .post('/show_schemes')
      .then(async res => {
        console.log('doing');
        console.log(res.data.schemes);
        this.setState({schemes: res.data.schemes});
        console.log(this.state.schemes);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          androidStatusBarColor="rgba(0, 0, 0, 1)"
          style={{backgroundColor: '#9ca9a9', elevation: 10}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" size={30} style={{color: 'black'}} />
            </Button>
          </Left>
          <Body style={{alignSelf: 'center', marginLeft: 55}}>
            <Title style={{color: 'black', fontSize: 20, textAlign: 'center'}}>
              {this.props.lang == 'en' ? `Schemes` : 'योजनाएं'}
            </Title>
          </Body>
        </Header>
        <Overlay
          isVisible={this.state.isVisible}
          height={'auto'}
          windowBackgroundColor="rgba(0, 0, 0, .8)"
          onBackdropPress={() => this.setState({isVisible: false})}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: 'monospace',
              borderBottomColor: 'black',
              borderBottomWidth: 2,
            }}>
            {this.state.name}
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 15,
              fontFamily: 'serif',
              marginTop: 20,
            }}>
            {this.state.details}
          </Text>
        </Overlay>
        <FlatList
          style={{flex: 1, marginBottom: 10}}
          data={this.state.schemes}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log('done', item.name);
                  this.setState({
                    isVisible: true,
                    name: item.name,
                    details: item.details,
                  });
                }}>
                <Card
                  title={item.name}
                  containerStyle={{
                    elevation: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                    backgroundColor: '#e3b862',
                  }}
                  dividerStyle={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                  }}>
                  <Text numberOfLines={2}>{item.details}</Text>
                  <Text> </Text>
                  <Text style={{color: 'blue'}}>Read More</Text>
                </Card>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
  };
};

export default connect(mapStateToProps)(GovSchemesScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
});
