import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

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

class TickerItem extends Component {
  myStyles = {display: "inline-block",
              "padding-top":".25em",
              "padding-bottom":".25em",
              "padding-right":"1em",
              "padding-left":"1em",
              margin: ".5em",
              "background-color": "#c5cce2",
              "border-radius": ".45em",
              border: "1px solid #343b49"
            }

  render() {
    return (
      <li style={this.myStyles}>
                  <p>{this.props.symbol}</p>
                  <p>{this.props.value}</p>
                </li>
    )
  }
} // End component TickerItem

class TickerItemList extends Component {
  tickerItems = [];
  render () {
    if (this.props.items) {
      this.tickerItems = this.props.items.map( (item, ndx) => {
        return (
          <TickerItem key={item.symbol} symbol={item.symbol} value={item.currentValue} />
        );
      } );
    }

    return (
      <div>
        <ul>
          {this.tickerItems}
        </ul>
      </div>
    );
  }
} // End class TickerItemList

class SearchBar extends Component {

  handleUserInput = (event) => {
    if((event.keyCode === 13) && (event.target.value.length > 1)) {
      this.props.getUserInput(event.target.value);
      // alert("New ticker symbol: " + event.target.value);
      event.target.value = "";
    }
  }

  render () {
    return (
      <div style={{"margin-top": ".5em", padding: ".5em"}}>
        <label name="add-symbol">Add Another Symbol: </label>
        <input name="add-symbol" type="text" size="4" maxLength="4"
               placeholder="Symbol" onKeyDown={this.handleUserInput}/>
      </div>
    );
  };
} // End class SearchBar

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
    let update = this.state.stockItems.concat([{symbol: item, currentValue: "?"}]);
    this.setState({stockItems: update});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SearchBar getUserInput={this.addNewStockSymbol}/>
        {/* <TickerItemList items={ this.state.serverData.stockItems }/> */}
        {/* <TickerItemList items={ this.state.serverData &&
                                this.state.serverData.stockItems}/> */}
        {this.state.serverData &&
          <TickerItemList items={ this.state.serverData.stockItems }/>}
      </div>
    );
  }
}

export default App;


// bottomline
