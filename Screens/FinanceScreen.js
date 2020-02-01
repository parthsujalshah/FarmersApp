import React, { Component } from 'react';
import {
    SafeAreaView, View, FlatList, StyleSheet, Text, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { Header, Left, Body, Button, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Overlay } from 'react-native-elements';

const list = ['Loans', 'Insurance']

class FinanceScreen extends Component {

    state = {
        isVisible: false,
        name: '',
        details: ''
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    androidStatusBarColor="rgba(0, 0, 0, 1)"
                    style={{ backgroundColor: '#9ca9a9', elevation: 10, }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" size={30} style={{ color: 'black' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignSelf: 'center', marginLeft: 55 }}>
                        <Title style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
                            {this.props.lang == 'en' ? `Finance` : 'वित्त'}
                        </Title>
                    </Body>
                </Header>
                <Overlay
                    isVisible={this.state.isVisible}
                    height={'auto'}
                    windowBackgroundColor='rgba(0, 0, 0, .8)'
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    <Text
                        style={{ textAlign: 'center', fontSize: 18, fontFamily: 'monospace', borderBottomColor: 'black', borderBottomWidth: 2 }}
                    >{this.state.name}</Text>
                    <Text
                        style={{ textAlign: 'justify', fontSize: 15, fontFamily: 'serif', marginTop: 20 }}
                    >{this.state.details}</Text>
                </Overlay>
                <ScrollView >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigation.navigate('LoanScreen')
                        }}
                    >
                        <Card
                            title={'Loans'}
                            containerStyle={{
                                elevation: 0, marginBottom: 10, borderRadius: 10, backgroundColor: '#e3b862'
                            }}
                            dividerStyle={{
                                borderBottomColor: 'black', borderBottomWidth: 2
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>Check for Loan details for different types of crops.</Text>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigation.navigate('GovSchemesScreen')
                        }}>
                        <Card
                            title={'Schemes'}
                            containerStyle={{
                                elevation: 0, marginBottom: 10, borderRadius: 10, backgroundColor: '#e3b862'
                            }}
                            dividerStyle={{
                                borderBottomColor: 'black', borderBottomWidth: 2
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>Check for Different Types of Schemes Provided by the Government.</Text>
                        </Card>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.data.lang,
    };
};

export default connect(mapStateToProps)(FinanceScreen);


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    }
})



