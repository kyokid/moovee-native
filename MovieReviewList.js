//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MovieReview from './MovieReview';

const api_key = '09e4cc13c99312bf18cad8339e83bc82';
const lang = 'en-US';

// create a component
class MovieReviewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            loading: true,
            page: 1,
            hasMore: true,
        }
        this.movieId = this.props.movieId;
        this.handleLoadmore = this.handleLoadmore.bind(this);
    }

    async fetchReviews(id, page) {
        const reviews_api = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=${lang}&page=${page}`
        let data = await fetch(reviews_api);
        let result = await data.json();

        if (result.page == result.total_pages || result.results.length == 0) {
            this.setState({
                hasMore: false
            })
        }


        return result.results;
    }

    async componentWillMount() {
        await this.fetchReviews(this.movieId, this.state.page).then((reviews) => {
            this.setState({
                reviews,
                loading: false
            })
        })
    }

    async handleLoadmore() {
        if (this.state.hasMore) {
            const page = this.state.page + 1;
            await this.fetchReviews(this.movieId, page).then((reviews) => {
                this.setState({
                    reviews: this.state.reviews.concat(reviews),
                    loading: false,
                    page,
                })
            })
        }
    }



    render() {
        let Content = () => {
            if (!this.state.loading) {
                if (this.state.reviews.length == 0) {
                    return <Text>No review for this film yet !</Text>
                } else {
                    return (
                        <FlatList
                            data={this.state.reviews}
                            keyExtractor={(review) => review.id}
                            renderItem={(review) => <MovieReview review={review.item} />}
                            onEndReached={this.handleLoadmore}
                            onEndReachedThreshold={0.05}
                            ListFooterComponent={() => {
                                if (this.state.hasMore) {
                                    return <ActivityIndicator size="large" />
                                } else {
                                    return null
                                }
                            }}>
                        </FlatList>
                    )
                }
            }
            else {
                return <ActivityIndicator size="large" />
            }
        }
        return (
            <Content />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MovieReviewsList;