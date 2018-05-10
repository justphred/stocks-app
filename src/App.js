import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TickerItemList from "./components/TickerItemList"
import SearchBar from "./components/SearchBar";

let fakeServerData = {
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
}

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // serverData: {}
    };
  }

  // componentWillMount() {
  //   this.setState({serverData: fakeServerData});
  // }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 3000);
  }

  addNewStockSymbol = (item) => {
    let update = this.state.serverData.stockItems.concat([{symbol: item, currentValue: "?"}]);
    // this.setState({stockItems: update});
    this.setState({serverData: {stockItems: update}});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reactive Stocks</h1>
        </header>
        <SearchBar getUserInput={this.addNewStockSymbol}/>
        {/* {this.state.serverData &&
          <TickerItemList items={ this.state.serverData.stockItems }/>} */}
        <TickerItemList items={ this.state.serverData && this.state.serverData.stockItems }/>
      </div>
    );
  }
}

export default App;


// bottomline
