import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Title,
  Right,
  Thumbnail,
} from 'native-base';
import {
  Autocomplete,
  withKeyboardAwareScrollView,
} from 'react-native-dropdown-autocomplete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

class CropListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      cropList: [
        {
          name: 'Rice',
          uri:
            'https://foodexpo.vn/image/data/Tin%20tuc%20(News)/white-rice-on-a-table.jpg',
        },
        {
          name: 'Jowar',
          uri:
            'https://i0.wp.com/www.smartfood.org/wp-content/uploads/2018/07/1531628535-jowar.jpg?fit=600%2C450&ssl=1',
        },
        {
          name: 'Bajra',
          uri:
            'https://5.imimg.com/data5/DB/XP/MY-24461174/bajra-2f-millet-500x500.jpg',
        },
        {
          name: 'Wheat',
          uri:
            'https://cdn.britannica.com/80/157180-050-7B906E02/Heads-wheat-grains.jpg',
        },
        {
          name: 'Pulses',
          uri:
            'https://5.imimg.com/data5/AJ/XR/JP/SELLER-27156131/pulses-or-lentils-500x500.JPG',
        },
        {
          name: 'Cotton',
          uri:
            'https://cdn.farmjournal.com/s3fs-public/675b41d63e974ae0b65ca7ac7fae991e1.jpg',
        },
        {
          name: 'Sugarcane',
          uri:
            'https://m.timesofindia.com/thumb/msid-69095049,width-800,height-600,resizemode-4/69095049.jpg',
        },
      ],
      cropList2: [
        {
          name: 'Rice',
          uri:
            'https://foodexpo.vn/image/data/Tin%20tuc%20(News)/white-rice-on-a-table.jpg',
        },
        {
          name: 'Jowar',
          uri:
            'https://i0.wp.com/www.smartfood.org/wp-content/uploads/2018/07/1531628535-jowar.jpg?fit=600%2C450&ssl=1',
        },
        {
          name: 'Bajra',
          uri:
            'https://5.imimg.com/data5/DB/XP/MY-24461174/bajra-2f-millet-500x500.jpg',
        },
        {
          name: 'Wheat',
          uri:
            'https://cdn.britannica.com/80/157180-050-7B906E02/Heads-wheat-grains.jpg',
        },
        {
          name: 'Pulses',
          uri:
            'https://5.imimg.com/data5/AJ/XR/JP/SELLER-27156131/pulses-or-lentils-500x500.JPG',
        },
        {
          name: 'Cotton',
          uri:
            'https://cdn.farmjournal.com/s3fs-public/675b41d63e974ae0b65ca7ac7fae991e1.jpg',
        },
        {
          name: 'Sugarcane',
          uri:
            'https://m.timesofindia.com/thumb/msid-69095049,width-800,height-600,resizemode-4/69095049.jpg',
        },
      ],
      data: [],
      data2: [],
    };
  }

  componentDidMount() {
    this.state.cropList.map(item => {
      // var joined =
      this.state.data.push(item.name);
      // console.log(joined);
      // this.setState({data: joined, data2: joined});
      console.log(this.state.data);
    });
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
              }}>
              {this.props.lang == 'en' ? `List of Crops` : 'फसलों की सूची'}
            </Title>
          </Body>
        </Header>
        <View style={{flex: 1}}>
          <SafeAreaView
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
              handleSelectItem={val => {
                this.setState({search: val});
                var result = this.state.cropList.filter(
                  item => item.name == val,
                );
                this.setState({cropList: result});
              }}
              onChangeText={item => {
                if (item == '') {
                  this.setState({
                    data: this.state.data2,
                    cropList: this.state.cropList2,
                  });
                }
              }}
              valueExtractor={item => item}
            />
          </SafeAreaView>
          <ScrollView style={{marginTop: 20}}>
            <FlatList
              data={this.state.cropList}
              renderItem={({item}) => {
                return (
                  <List>
                    <ListItem avatar>
                      <Left>
                        <Thumbnail source={{uri: item.uri}} />
                      </Left>
                      <Body>
                        <Text
                          onPress={() =>
                            this.props.navigation.navigate(
                              'CropDetailsScreen',
                              {
                                cropName: item.name,
                                cropImage: item.uri,
                              },
                            )
                          }
                          style={{
                            alignSelf: 'center',
                            fontSize: 25,
                            marginRight: '50%',
                          }}>
                          {item.name}
                        </Text>
                      </Body>
                    </ListItem>
                  </List>
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
