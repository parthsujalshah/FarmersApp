import React, { Component } from 'react';
import { View, Text } from 'react-native';

class new extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}> Based On your Soil Card </Text>
      </View>
    );
  }
}

export default new;
