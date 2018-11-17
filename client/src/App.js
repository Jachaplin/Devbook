import React, { Component } from 'react';
import Navbar from './components/layout/component_Navbar'
import Footer from './components/layout/component_Footer'
import Landing from './components/layout/component_Landing'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
