//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { RkStyleSheet } from 'react-native-ui-kitten';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Badge, H3 } from 'native-base';
import MovieReviewsList from './MovieReviewList'

const image_path = 'https://image.tmdb.org/t/p/w780';
const api_key = '4d88b953b70c08814373723637099542';
const lang = 'en-US';

// create a component
class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.movie = this.props.navigation.state.params.movie;
        this.state = {
            movie: {},
            loading: true,
        }
    }

    async fetchDetails(id) {
        const details_api = `https://api.themoviedb.org/3/${id}?api_key=${api_key}&language=${lang}`;
        let data = await fetch(details_api);
        let result = await data.json();

        return result;
    }

    async componentWillMount() {
        await this.fetchDetails(this.movie.id).then((details) => {
            this.setState({
                movie: details,
                loading: false
            })
        })
    }

    render() {
        let movieObj = {
            title: this.movie.title,
            rate: this.movie.vote_average,
            overview: this.movie.overview,
            date: this.movie.release_date,
            backdrop_path: this.movie.backdrop_path,
        }
        let Content = (props) => {
            if (!this.state.loading) {
                return (
                    <View>
                        <View style={styles.border}>
                            <View style={[styles.info]}>
                                <Text>
                                    <FontAwesome >
                                        {Icons.calendar + '   '}
                                    </FontAwesome>
                                    {movieObj.date}
                                </Text>
                                <Text>
                                    <FontAwesome >
                                        {Icons.thumbsOUp + '   '}
                                    </FontAwesome>
                                    {movieObj.rate}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.headerView]}>
                            <H3 style={[styles.headerText]}>Overview</H3>
                        </View>
                        <View style={styles.border}>
                            <View style={styles.info}>
                                <Text style={styles.tagline}>
                                    {this.state.movie.tagline}
                                </Text>
                                <Text>{movieObj.overview}</Text>
                            </View>
                        </View>
                        <Reviews />
                    </View>
                )
            } else {
                return <ActivityIndicator size="large" />;
            }
        }

        let Reviews = () => {
            
                return (
                    <View>
                        <View style={[styles.headerView]}>
                            <H3 style={[styles.headerText]}>Reviews</H3>
                        </View>
                        <View style={styles.border}>
                            <View style={styles.info}>
                                <MovieReviewsList movieId={this.movie.id} />
                            </View>
                        </View>
                    </View>
                )
        }

        return (
            <ScrollView>
                <View style={[styles.header, styles.border]}>
                    <Image source={{ uri: image_path.concat(movieObj.backdrop_path) }}
                        resizeMode="contain" resizeMethod='scale'
                        style={styles.image} />
                    <View style={styles.title_background}>
                        <Text style={styles.title}>{movieObj.title}</Text>
                    </View>
                </View>
                <Content />
            </ScrollView>

        );
    }
}

// define your styles
const screenWidth = Dimensions.get('window').width;
const styles = RkStyleSheet.create(theme => ({
    header: {
        alignItems: 'center',
    },
    border: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.base
    },
    image: {
        width: screenWidth * 1.3,
        height: 300
    },
    title_background: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 15
    },
    rate: {
        color: '#ffffff'
    },
    info: {
        margin: 16,
    },
    tagline: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    headerView: {
        backgroundColor: '#c9c9c9'
    },
    headerText: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    }
}));

//make this component available to the app
export default MovieDetail;