//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieList from './MovieList'

// create a component
class Movies extends Component {
    render() {
        const screenProps = this.props.screenProps;
        const { movies, handleRefresh, loading, handleLoadmore, isRefreshing, hasMore } = screenProps;
        const navigate = this.props.navigation.navigate;

        return (
            <MovieList movies={movies}
                handleRefresh={handleRefresh}
                loading={loading}
                handleLoadmore={handleLoadmore}
                isRefreshing={isRefreshing}
                navigate={navigate}
                hasMore={hasMore}/>
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
export default Movies;