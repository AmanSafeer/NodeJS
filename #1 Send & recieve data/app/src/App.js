import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Registration from './components/registration'
import Users from './components/users'
import './App.css';


class App extends Component {
 
  render() {
    return (
      <Router>
      <div className="App">
        <div className="header">
        <hgroup>
          <h1 className="heading">Users Registration & Records Using Nodejs Server</h1>
          <h3 className="heading">(Sending, Getting, Updating & Deleting Data)</h3>  
        </hgroup>  
          <div className="nav">
            <Link to="/">Registration</Link>
            <Link to="/users">Users</Link>
          </div>
        </div>
        <Route exact path="/" component={Registration}/>
        <Route path="/users" component={Users}/>
      </div>
      </Router>
    );
  }
}

export default App;
