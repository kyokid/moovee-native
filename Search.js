import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Input, Container, Header, Item, Button, Icon } from 'native-base';
import MovieList from './MovieList';


const api_key = '09e4cc13c99312bf18cad8339e83bc82';
const lang = 'en-US';

// create a component
class Search extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.handleLoadmore = this.handleLoadmore.bind(this)
        this.timeOutId = '';

        this.state = {
            keyword: '',
            results: [],
            page: 1,
            loading: false,
            hasMore: true,
            isSearching: false
        }
    }

    async fetchMovies(value, page) {
        const search_api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=${lang}&page=${page}&query=${value}&include_adult=false`
        let data = await fetch(search_api);
        let result = await data.json();
        if (result.total_pages == page) {
            this.setState({
                hasMore: false
            })
        }
        return result.results;
    }

    handleSearch(value) {
        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }
        this.timeOutId = setTimeout(async () => {
            this.setState({
                loading: true,
                keyword: value
            })
            await this.fetchMovies(value, this.state.page).then((results) => {
                this.setState({
                    results,
                    loading: false,
                    isSearching: true,
                })
            });
        }, 1500)
    }

    async handleLoadmore() {
        if (this.state.hasMore) {
            const page = this.state.page + 1;
            this.setState({
                loading: true
            })
            await this.fetchMovies(this.state.keyword, page).then((results) => {
                this.setState({
                    results: this.state.results.concat(results),
                    page,
                    loading: false
                })
            });
        }
    }


    render() {
        const { handleSearch } = this.props;
        let Content = () => {
            if (this.state.loading) {
                return <ActivityIndicator size="large" />
            } else if (this.state.isSearching) {
                return <MovieList movies={this.state.results}
                    handleLoadmore={this.handleLoadmore}
                    hasMore={this.state.hasMore}
                    navigate={this.props.navigation.navigate}
                    type='movie'
                    loading={this.state.loading} />
            } else {
                return null;
            }
        }
        return (
            <Container>
                <Header style={styles.searchBox} searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={(text) => this.handleSearch(text)} />
                    </Item>
                </Header>
                <Content />

            </Container>
        );
    }
}

// define your styles
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    searchBox: {
        backgroundColor: '#ffffff'
    }
});

//make this component available to the app
export default Search;