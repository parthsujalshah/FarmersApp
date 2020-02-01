import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Title, Left, Body } from 'native-base'; import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { SearchBar, Card, ListItem, Button, Icon } from 'react-native-elements';



class DiscussSreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    androidStatusBarColor="rgba(0, 0, 0, 1)"
                    style={{ backgroundColor: '#9ca9a9', elevation: 10 }}>
                    <Left>
                        <MaterialIcons
                            name="arrow-back"
                            size={25}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </Left>
                    <Body style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <Title
                            style={{
                                fontFamily: 'serif',
                                color: 'black',
                                fontSize: 28,
                            }}>
                            {this.props.lang == 'en' ? `Disscuss` : 'चर्चा करें'}
                        </Title>
                    </Body>
                </Header>
                <SearchBar
                    placeholder={this.props.lang == 'en' ? "Type Here..." : 'यहा लिखो...'}
                    onChangeText={(search) => { this.setState({ search }) }}
                    value={this.state.search}
                    cancelIcon={true}
                    lightTheme={true}
                    containerStyle={{ backgroundColor: '#9ca9a9', marginTop: 0 }}
                    inputContainerStyle={{ backgroundColor: '#dedede' }}
                />
                <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                    <Card
                        title='HELLO WORLD'
                        style={{ marginBottom: 10 }}
                        containerStyle={{ backgroundColor: '#c2fff9', elevation: 10 }}
                        image={{ uri: "https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png" }}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                    <Card
                        title='HELLO WORLD'
                        style={{ marginBottom: 10 }}
                        containerStyle={{ backgroundColor: '#c2fff9', elevation: 10 }}
                        image={{ uri: "https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png" }}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                    <Card
                        title='HELLO WORLD'
                        style={{ marginBottom: 10 }}
                        containerStyle={{ backgroundColor: '#c2fff9', elevation: 10 }}
                        image={{ uri: "https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png" }}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                </ScrollView>
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.data.lang,
    };
};

export default connect(mapStateToProps)(DiscussSreen);
