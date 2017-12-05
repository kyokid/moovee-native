//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MovieCard from './MovieCard.js'

// create a component
class MovieList extends Component {

    render() {

        const { movies, handleRefresh, handleLoadmore, isRefreshing, navigate, hasMore } = this.props;

        return (
            <FlatList
                data={movies}
                keyExtractor={(movie) => movie.id}
                renderItem={(movie) => <MovieCard movie={movie.item} loadDetail={() => {
                    navigate("MovieDetail", { movie: movie.item })
                }} />}
                onRefresh={handleRefresh}
                refreshing={isRefreshing}
                onEndReached={handleLoadmore}
                onEndReachedThreshold={0.05}
                ListFooterComponent={() => {
                    if (hasMore)
                        return <ActivityIndicator size="large" />
                    else
                        return null
                }}>
            </FlatList>
        );
    }
}

//make this component available to the app
export default MovieList;