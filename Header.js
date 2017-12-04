//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Left, Body, Right, Button, Icon, Title, Header } from 'native-base';

// create a component
class AppHeader extends Component {
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
            </Header>
        );
    }
}

//make this component available to the app
export default AppHeader;