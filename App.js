import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ListItem, StatusBar } from 'react-native';
import MovieList from './MovieList.js';
import { Expo, Font, AppLoading } from 'expo'
import { Container, Content, Spinner } from 'native-base'
import AppHeader from './Header.js'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MovieDetail from './MovieDetail.js'
import { title } from 'change-case';
import { TabBars, Drawer } from './Routes'

const Roboto_font = require('native-base/Fonts/Roboto.ttf');
const Roboto_medium_font = require('native-base/Fonts/Roboto_medium.ttf'); 
const FontAwesome = require('./fontawesome-webfont.ttf');
const api_key = '4d88b953b70c08814373723637099542';
const lang = 'en-US';
const DEFAULT_URL = `https://api.themoviedb.org/3`

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      movies: [],
      page: 1,
      loading: true,
      isRefreshing: false,
      hasMore: true,
      errorMessage: ''
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_font,
      Roboto_medium_font,
      FontAwesome
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
    })
  }

  async fetchMovie(page) {
    const now_playing_url = `${DEFAULT_URL}/movie/now_playing?api_key=${api_key}&page=${page}&include_adult=false`;
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
    console.warn(this.state.errorMessage)
    if (this.state.errorMessage) {
      return <div>
        {this.state.errorMessage}
      </div>
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