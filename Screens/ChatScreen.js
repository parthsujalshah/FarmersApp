
import {Button, Icon, Header, Title, Left, Body, Right} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Dialogflow_V2} from 'react-native-dialogflow';

import {dialogflowConfig} from './env';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar:
    'https://img.favpng.com/15/24/10/smiley-discord-computer-icons-emoticon-internet-bot-png-favpng-DUm3SZxQcb1zyth6GG3VRVXWP.jpg',
};

class App extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi!\nWelcome to Farmer's Friend app.\nHow may I help you?`,
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  handleGoogleResponse(result) {
    console.log(result.queryResult);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./../assets/bg.jpg')}>
          <Header
            androidStatusBarColor="rgba(0, 0, 0, 1)"
            style={{backgroundColor: '#000', elevation: 10}}>
            <Left>
              <MaterialIcons
                name="arrow-back"
                size={25}
                color='white'
                onPress={() => this.props.navigation.goBack()}
              />
            </Left>
            <Body style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <Title
                style={{
                  fontFamily: 'serif',
                  color: 'white',
                  fontSize: 28,
                  textAlign: 'center',
                }}>
                {this.props.lang == 'en' ? `Chat with us` : 'हम से बात करे'}
              </Title>
            </Body>
          </Header>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.data.lang,
  };
};

export default connect(mapStateToProps)(App);
