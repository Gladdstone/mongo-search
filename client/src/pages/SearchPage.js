import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BTable from  '../components/BTable';
import DetailPage from './DetailPage';
import {
  Button,
  Fade
} from 'reactstrap';

import '../App.css';

export default class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
    this.state = {
      query: '',
      results: []
    };
  }
    
  searchData = () => {
    axios({
      method: 'POST',
      url: `http://localhost:3000/search?siteName=${this.state.query}`,
    }).then(({ data }) => {
        this.setState({
          results: data.data                
        });
      });
  }

  queryDescriptions = () => {
    axios({
      method: 'POST',
      url: `http://localhost:3000/description?siteName=${this.state.query}`,
    }).then(({ data }) => {
        this.setState({
          results: data.hits                      
        });
      });
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      query: this.searchInput.current.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.searchData();
        }
      }
    });
  }

  render() {
    return (
      
      <div>
        <h1 class="p-4 h1  text-center font-weight-light" >NYC Locations Providing Seasonal Flu Vaccinations</h1>
        {/* Search Bar */}
        <div class="search mt-5 px-5">
          <input type="text" class="searchBar mt-4" placeholder="Search" ref={this.searchInput} onChange={this.handleSearch}/>
        </div>

        <BTable results={this.state}/>
          
      </div>
      
    );
  }


}
