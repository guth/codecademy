import React from 'react';
import './App.css';

import BusinessList from '../BusinessList/BusinessList'
import SearchBar from '../SearchBar/SearchBar'

// Check out solution code: C:\Users\guthr\Downloads\bwa_u2_ravenous_solution_1

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList />
      </div>
    );
  }
}

export default App;
