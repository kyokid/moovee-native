import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ListItem, StatusBar } from 'react-native';
import MovieList from './MovieList.js';
import { Expo, Font, AppLoading } from 'expo'
import { Container, Content, Spinner } from 'native-base'
import AppHeader from './Header.js'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MovieDetail from './MovieDetail.js'
import { title } from 'change-case';
import { MovieTabs, Drawer } from './Routes'

const Roboto_font = require('native-base/Fonts/Roboto.ttf');
const Roboto_medium_font = require('native-base/Fonts/Roboto_medium.ttf');
// const FontAwesome = require('./fontawesome-webfont.ttf');

const api_key = '09e4cc13c99312bf18cad8339e83bc82';
const lang = 'en-US';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      movies: [],
      page: 1,
      loading: true,
      isRefreshing: false,
      hasMore: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_font,
      Roboto_medium_font,
      // FontAwesome
    }).then(() => {
      this.setState({
        ready: true
      })
    });

    await this.fetchMovie(this.state.page).then((movies) => {
      this.setState({
        movies,
        loading: false
      })
    });
  }

  async fetchMovie(page) {
    const now_playing_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=${lang}&page=${page}`;
    let data = await fetch(now_playing_url);
    let dataObj = await data.json();

    if (dataObj.total_pages == page) {
      this.setState({
        hasMore: false
      })
    }

    return dataObj.results;
  }

  async handleRefresh() {
    const page = 1;
    this.setState({
      isRefreshing: true,
      movies: []
    })
    await this.fetchMovie(page).then((movies) => {
      this.setState({
        page,
        movies,
        isRefreshing: false
      })
    });
  }

  async handleLoadmore() {
    if (this.state.hasMore) {
      const page = this.state.page + 1;
      this.setState({
        loading: true
      })

      await this.fetchMovie(page).then((movies) => {
        this.setState({
          page,
          movies: this.state.movies.concat(movies),
          loading: false
        })
      });
    }
  }

  render() {
    if (!this.state.ready) {
      return <Spinner color='blue' />;
    }
    return (
      <Container>
        <StatusBar hidden />
        <Drawer
          screenProps={{
            movies: this.state.movies,
            handleRefresh: this.handleRefresh.bind(this),
            loading: this.state.loading,
            isRefreshing: this.state.isRefreshing,
            handleLoadmore: this.handleLoadmore.bind(this),
            hasMore: this.state.hasMore
          }} />
      </Container>
    );
  }
}