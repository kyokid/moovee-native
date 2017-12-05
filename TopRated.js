//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieList from './MovieList'

const api_key = '09e4cc13c99312bf18cad8339e83bc82';
const lang = 'en-US';
const DEFAULT_URL = 'https://api.themoviedb.org/3'

// create a component
class TopRated extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topRateds: [],
            loading: true,
            page: 1,
            isRefreshing: false,
        }
    }

    async fecthTvShows(page) {
        const tvshow_uri = `${DEFAULT_URL}/movie/top_rated?api_key=${api_key}&language=${lang}&page=${page}`;
        let data = await fetch(tvshow_uri);
        let result = await data.json();

        return result.results;
    }

    handleLoadmore = async () => {
        const page = this.state.page + 1;
        this.setState({
            loading: true
        })
        await this.fecthTvShows(page).then((toprated) => {
            this.setState({
                topRateds: this.state.topRateds.concat(toprated),
                page,
                loading: false
            })
        })
    }

    handleRefresh = async () => {
        const page = 1;
        this.setState({
            topRateds: [],
            isRefreshing: true
        })
        await this.fecthTvShows(page).then((topRateds) => {
            this.setState({
                topRateds,
                page,
                isRefreshing: false
            })
        })
    }

    async componentWillMount() {
        await this.fecthTvShows(this.state.page).then((topRateds) => {
            this.setState({
                topRateds,
                loading: false
            })
        })
    }

    render() {
        return (
            <MovieList movies={this.state.topRateds}
                handleRefresh={this.handleRefresh}
                loading={this.state.loading}
                handleLoadmore={this.handleLoadmore}
                isRefreshing={this.state.isRefreshing}
                navigate={this.props.navigation.navigate}
                />
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
export default TopRated;