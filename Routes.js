//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Movies from './Movies'
import TopRated from './TopRated'
import MovieDetail from './MovieDetail'
import Search from './Search'

export const MovieTabs = TabNavigator({
    NowPlaying: {
        screen: Movies,
        navigationOptions: {
            tabBarLabel: 'movies',
        }
    },
    TopRated: {
        screen: TopRated,
        navigationOptions: {
            tabBarLabel: 'Tv Shows',
        }
    }
}, {
        tabBarOptions: {
            style: {
                backgroundColor: '#395c93',
            },
        }
    })

export const StackRoute = StackNavigator({
    MovieList: {
        screen: MovieTabs,
        navigationOptions: ({ navigation }) =>
            ({
                title: "Flixie",
                headerLeft: <Icon name='menu' style={{ marginLeft: 15, color: '#ffffff' }} onPress={() => { navigation.navigate('DrawerOpen') }} />,
                headerRight: <Icon name='search' style={{ marginRight: 15, color: '#ffffff' }} onPress={() => { navigation.navigate('Search') }}/>,
                headerStyle: {
                    backgroundColor: '#395c93'
                },
                headerTintColor: '#ffffff'

            })
    },
    MovieDetail: {
        screen: MovieDetail,
        navigationOptions: ({ navigation }) =>
            ({
                title: `${navigation.state.params.type === 'movie' ? navigation.state.params.movie.title : navigation.state.params.movie.name}`,
                headerStyle: {
                    backgroundColor: '#395c93'
                },
                headerTintColor: '#ffffff'
            })
    },
    Search: {
        screen: Search,
        navigationOptions: ({ navigation }) =>
            ({
                title: 'Search',
                headerStyle: {
                    backgroundColor: '#395c93'
                },
                headerTintColor: '#ffffff'
            })
    }
})

export const Drawer = DrawerNavigator({
    Movies: {
        screen: StackRoute,
        path: '/'
    },
    TopRated: {
        screen: TopRated,
        path: '/topRated'
    }
}, {
        initialRouteName: 'Movies',
        drawerPosition: 'left'
    })