import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';


class App extends Component {
  state = {
    avatar: null,
  };


  addavatar = async type => {

    if (type === "gallery") {

      ImagePicker.launchImageLibrary({ allowsEditing: true }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({ avatar: response.uri });
        }
      });
    }
    if (type === "camera") {

      ImagePicker.launchCamera({ allowsEditing: true }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({ avatar: response.uri });
        }
      });
    }


  };

  removeimage = () => {
    this.setState({
      avatar: null
    });
  };

  render() {
    return (

      <View style={styles.container}>
        <Image
          source={{
            uri:
              this.state.avatar == null
                ? "https://designshack.net/wp-content/uploads/placeholder-image.png"
                : this.state.avatar
          }}
          resizeMode="contain"
          a
          style={styles.img}
        />
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Use Gallery"
            onPress={() => this.addavatar("gallery")}
          />
          <Text> </Text>
          <Button
            title="Use Camera"
            onPress={() => this.addavatar("camera")}
            style={{ marginLeft: 10 }}
          />
          <Text> </Text>
          <Button
            title="Remove Image"
            onPress={() => this.removeimage()}
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  img: {
    margin: 10,
    width: '100%',
    height: 300,
    borderColor: "black",
    borderWidth: 2,
    marginTop: 20
  }
});

