//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Movies from './Movies'
import TopRated from './TopRated'
import MovieDetail from './MovieDetail'
import Search from './Search'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export const TabBars = TabNavigator({
    NowPlaying: {
        screen: Movies,
        navigationOptions: {
            tabBarLabel: 'Now Playing',
            tabBarIcon: <FontAwesome style={{ color: "#fc0d1d", fontSize: 20}}>{Icons.play}</FontAwesome>
        }
    },
    TopRated: {
        screen: TopRated,
        navigationOptions: {
            tabBarLabel: 'Top Rated',
            tabBarIcon: <FontAwesome style={{ color: "#F5A623", fontSize: 20}}>{Icons.star}</FontAwesome>
        }
    }
}, {
        tabBarOptions: {
            style: {
                backgroundColor: '#ffffff',
            },
            activeTintColor: '#008742',
            inactiveTintColor: '#BCBEC0'
        }
    })

export const StackRoute = StackNavigator({
    MovieList: {
        screen: TabBars,
        navigationOptions: ({ navigation }) =>
            ({
                title: "Moovee",
                headerLeft: <Icon name='menu' style={styles.menu} onPress={() => { navigation.navigate('DrawerOpen') }} />,
                headerRight: <Icon name='search' style={styles.search} onPress={() => { navigation.navigate('Search') }} />,
                headerStyle: {
                    backgroundColor: '#008742'
                },
                headerTintColor: '#ffffff'

            })
    },
    MovieDetail: {
        screen: MovieDetail,
        navigationOptions: ({ navigation }) =>
            ({
                title: `${navigation.state.params.movie.title}`,
                headerStyle: {
                    backgroundColor: '#008742'
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
                    backgroundColor: '#008742'
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

const styles = StyleSheet.create({
    menu: {
        marginLeft: 15,
        color: '#ffffff'
    },
    search: {
        marginRight: 15,
        color: '#ffffff'
    },
    playing: {
        color: "#fc0d1d", 
        fontSize: 20
    },
    topRated: {
        color: "#FFEB3B", 
        fontSize: 20
    }
})