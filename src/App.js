import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';

import TeslaBattery from './components/tesla-battery/tesla-battery';

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <img src={logo} alt="" />
        </header>
        <div className="wrapper">
          <TeslaBattery></TeslaBattery>
        </div>
      </div>
    );
  }
}

export default App;
