import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Text, List, Button} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const routes = ['Home', 'Settings', 'My Crops'];
export default class SideBar extends React.Component {
  render() {
    return (
      <LinearGradient colors={['#DECBA4', '#3E5151']} style={{flex: 1}}>
        <ImageBackground
          source={{
            uri:
              'https://indiaclimatedialogue.net/wp-content/uploads/2018/09/Millet01.jpg',
          }}
          style={{
            height: 180,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <List
          dataArray={routes}
          renderRow={data => {
            return (
              <Button
                transparent
                style={{marginTop: 20}}
                onPress={() => {
                  data == 'Home'
                    ? this.props.navigation.navigate(
                        data,
                        {},
                        this.props.navigation.navigate({
                          routeName: 'HomeScreen',
                        }),
                      )
                    : data == 'My Crops'
                    ?  this.props.navigation.navigate(
                      data,
                      {},
                      this.props.navigation.navigate({
                        routeName: 'MyCropsScreen',
                      }),
                    )
                    : this.props.navigation.navigate(data);
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: 'black',
                    fontFamily: 'monospace',
                  }}>
                  {data}
                </Text>
              </Button>
            );
          }}
        />
      </LinearGradient>
    );
  }
}
