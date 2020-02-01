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

const schemes = [
  {
    name: 'ICICI Bank (Agri Term Loan)	',
    details:
      '10.00% - 15.33% p.a. \n\n Up to 2% of sanction limit at the time of disbursement ',
  },
  {
    name: 'Central Bank of India (Cent Kisan Tatkal Scheme)	',
    details:
      '8.70% p.a. onwards \n\n Up to Rs.25,000 – Nil Above Rs.25,000 - Rs.120/- per lakh or part thereof Maximum: Rs.20,000',
  },
  {
    name: 'IndusInd Bank (Crop Loan)	',
    details: '10.15% - 14.75% p.a. \n\n Up to 1% plus service tax',
  },
  {
    name: 'HDFC Bank (Retail Agri Loans)	',
    details: '9.10% - 20.00% p.a.	\n\n 2% to 4% or Rs.2,500',
  },
];

class LoanScreen extends Component {
  state = {
    isVisible: false,
    name: '',
    details: '',
  };
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
            <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>
              {this.props.lang == 'en' ? `Agriculture Loan` : 'योजनाएं'}
            </Text>
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
        <Text style={{marginTop: 10, alignSelf: 'center', fontSize: 20}}>
          Types of Agricultural Loans in India
        </Text>
        <FlatList
          style={{flex: 1, marginBottom: 10}}
          data={schemes}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
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

export default connect(mapStateToProps)(LoanScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
});
