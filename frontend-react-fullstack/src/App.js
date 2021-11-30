import React, { Component } from 'react';
import './App.css';
import UserApp from './component/BookApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        <UserApp />
      </div>
    );
  }
}

export default App;
