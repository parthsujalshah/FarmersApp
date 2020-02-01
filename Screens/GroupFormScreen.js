import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import {Card, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

class GroupScreenIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedToGroup: false,
    };
  }

  addToGroup = async () => {
    try {
      await AsyncStorage.setItem('AddedToGroup', 'added');
      this.props.navigation.navigate('RegionChatGroupScreen');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
        <View
          style={{
            width: '90%',
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: '100%',
              width: '100%',
              // borderRadius: 800,
              borderColor: 'black',
              borderWidth: 1,
              zIndex: 10,
            }}
            source={require('./../assets/connect.jpg')}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            zIndex: 0,
          }}>
          <Card
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '95%',
              paddingHorizontal: 10,
              paddingBottom: 5,
              elevation: 10,
            }}>
            <View style={{marginBottom: 15}}>
              <Text style={{color: '#048bcf', fontSize: 30}}>Why Join Now</Text>
            </View>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              Esse aliqua dolore aliqua aliquip. Enim enim nisi laborum do culpa
              duis pariatur voluptate commodo fugiat aute. Sunt ad culpa esse
              amet. Eiusmod laboris adipisicing exercitation culpa quis
              adipisicing ullamco ipsum. Id est nisi incididunt enim aute veniam
              occaecat aute aliqua sint aute eiusmod non. Commodo mollit
              exercitation nulla cupidatat dolor aliqua velit nulla. Non
              pariatur aliqua pariatur anim.
            </Text>
          </Card>
          <Button
            full
            rounded
            success
            onPress={() => {
              this.addToGroup();
            }}
            style={{elevation: 10, padding: 10, marginTop: 20, elevation: 10}}>
            <Text style={{fontSize: 18}}>
              Join Farmers Group of Your Locality
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default GroupScreenIntro;
