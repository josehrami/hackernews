import React, { Component, PropTypes } from 'react';
import './App.css';
import Table from './Table';
import Search from './Search';
import Button from './Button';
import SelectedItem from './SelectedItem';

const DEFAULT_QUERY = 'react';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '20';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchKey : '',
      searchTerm: DEFAULT_QUERY,
      selected: null
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopstories = this. needsToSearchTopstories.bind(this);
    this.onSelectedItem = this.onSelectedItem.bind(this);
  }

  onSelectedItem(item){
    this.setState({
      ...this.state,
    selected:item})
  }

  componentDidMount() {
  const { searchTerm } = this.state;
  this.setState({searchKey : searchTerm});
  this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  onSearchSubmit(event) {
  const { searchTerm } = this.state;
  this.setState({searchKey : searchTerm});
  if (this.needsToSearchTopstories(searchTerm)) {
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }
  event.preventDefault();
  }

  needsToSearchTopstories(searchTerm) {
  return !this.state.results[searchTerm];
  }

  onDismiss(id){
    const {searchKey, results} = this.state;
    const {hits, page, nbPages} = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    console.log(updatedHits);
    this.setState({
    results: {
      ...results,
      [searchKey]: {hits: updatedHits, page, nbPages }
    }
    });
  }

  onSearchChange(event) {
  this.setState({ searchTerm: event.target.value });
  }

  fetchSearchTopstories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
  .then(response => response.json())
  .then(result => this.setSearchTopstories(result));
  }

  setSearchTopstories(result) {
    const { hits, page, nbPages } = result;
    const {searchKey, results} = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      //...oldHits,
      ...hits
    ];

    this.setState({
    results: {
      ...results,
      [searchKey] : {hits:updatedHits, page, nbPages }
    }});
  }

  render() {
    const { searchTerm, searchKey, results, selected } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const nbPages = (results && results[searchKey] && results[searchKey].nbPages) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    const item = selected || [];
    return (
      <div className="page">
        <div className="interactions">
          <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          ><b>Enter search term here</b></Search>
        </div>
        <Table
        list={list}
        onDismiss={this.onDismiss}
        onSelectedItem={this.onSelectedItem}
        />
        <SelectedItem item={item} />
        <div className="interactions">
          { page > 0 ?
          <Button onClick={() => this.fetchSearchTopstories(searchKey, page - 1)}>
            Prev
          </Button> : ''}
          <span> {page} of {nbPages}</span>
          { page < nbPages ?
          <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
            Next
          </Button> : ''
          }
        </div>
      </div>
    );
  }
}

export default App;
