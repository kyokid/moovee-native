//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {RkStyleSheet} from 'react-native-ui-kitten';

// create a component
class MovieReview extends Component {
    render() {
        const {review} = this.props;
        return (
            <View style={styles.border}>
                <Text style={styles.author}>{review.author}</Text>
                <Text>"{review.content}"</Text>
            </View>
        );
    }
}

// define your styles
const styles = RkStyleSheet.create(theme => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    border: {
        borderBottomWidth: 1.5,
        borderColor: theme.colors.border.base,
        marginBottom: 5
    },
    author:{
        fontWeight: 'bold',
        fontSize: 16
    }
}));

//make this component available to the app
export default MovieReview;