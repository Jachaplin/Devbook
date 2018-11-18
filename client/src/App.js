import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/layout/component_Navbar'
import Footer from './components/layout/component_Footer'
import Landing from './components/layout/component_Landing'
import Register from './components/auth/component_Register'
import Login from './components/auth/component_Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
        
