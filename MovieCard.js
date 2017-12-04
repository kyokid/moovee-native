import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
    RkCard,
    RkText,
    RkStyleSheet
} from 'react-native-ui-kitten';

const image_path = 'https://image.tmdb.org/t/p/w500';
// create a component
class MovieCard extends Component {
    render() {
        const { movie, loadDetail, type } = this.props;
        const image = {
            uri: image_path.concat(movie.poster_path)
        }

        let movieObj = {
            title: type === 'movie' ? movie.title : movie.name,
            rate: movie.vote_average,
            overview: movie.overview,
            date: type === 'movie' ? movie.release_date.split('-')[0] : movie.first_air_date.split('-')[0]
        }

        return (
            <TouchableOpacity onPress={loadDetail}
                delayPressIn={70}
                activeOpacity={0.8}>

                <RkCard style={styles.card} style={styles.image}>
                    <Image rkCardImg source={image} />
                    <View style={styles.footer} rkCardFooter>
                        <View >
                            <RkText style={styles.title}>{movieObj.title}</RkText>
                            <RkText style={styles.time}>{movieObj.date}</RkText>
                        </View>
                    </View >
                </RkCard>

            </TouchableOpacity>
        );
    }
}


let styles = RkStyleSheet.create(theme => ({
    card: {
        marginVertical: 8
    },
    footer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    time: {
        marginTop: 5
    },
    image:{
        height: 500,
        
    },
    title: {
        color: 'rgb(200, 200, 200)',
        fontSize: 18,
        fontWeight: '600'
    },
    time: {
        color: 'rgb(200, 200, 200)'
    },
}));

//make this component available to the app
export default MovieCard;