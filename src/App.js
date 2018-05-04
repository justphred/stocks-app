import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class TickerItem extends Component {
  render() {
    return (
      <li style={{display: "inline-block",
                  "padding-top":".25em",
                  "padding-bottom":".25em",
                  "padding-right":"1em",
                  "padding-left":"1em",
                  margin: ".5em",
                  "background-color": "#c5cce2",
                  "border-radius": ".45em",
                  border: "1px solid #343b49"
                }}>
                  <p>{this.props.symbol}</p>
                  <p>{this.props.value}</p>
                </li>
    )
  }
} // End component TickerItem

class TickerItemList extends Component {
  render () {
    let tickerItems = this.props.items.map( (item, ndx) => {
      return (
        <TickerItem key={item.symbol} symbol={item.symbol} value={item.currentValue} />
      );
    } );
    return (
      <div>
        <ul>
          {tickerItems}
        </ul>
      </div>
    );
  }
} // End class TickerItemList

class SearchBar extends Component {
  render () {
    return (
      <div style={{"margin-top": ".5em", padding: ".5em"}}>
        <input type="text" size="30" placeholder="Enter A Stock Symbol Here"/>
      </div>
    );
  };
} // End class SearchBar

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      stockItems: [
        { symbol: "ABC",
          currentValue: 123 },
        { symbol: "DEF",
          currentValue: 345 },
        { symbol: "HIJK",
          currentValue: 7 },
        { symbol: "LOM",
          currentValue: 1123 },
        { symbol: "FRT",
          currentValue: 23 }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SearchBar />
        <TickerItemList items={ this.state.stockItems }/>
      </div>
    );
  }
}

export default App;


// bottomline
