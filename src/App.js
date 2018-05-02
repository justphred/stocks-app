import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TickerItem extends Component {
  render() {
    return (
      <li style={{display: "inline-block",
                  padding:"1em",
                  margin: ".5em",
                  "background-color": "#c5cce2",
                  "border-radius": ".45em",
                }}>Ticker Value</li>
    )
  }
}

class TickerItemList extends Component {
  render () {
    return (
      <div>
        <ul>
          <TickerItem />
          <TickerItem />
          <TickerItem />
          <TickerItem />
          <TickerItem />
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TickerItemList />
      </div>
    );
  }
}

export default App;


// bottomline
