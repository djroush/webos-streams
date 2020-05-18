import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Tabs from './Tabs';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
		    <Tabs/>
      </div>
    );
  }
}

export default App;