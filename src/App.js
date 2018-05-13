import React, { Component } from 'react';
import './App.css';
import TickerItemList from "./components/TickerItemList"
import SearchBar from "./components/SearchBar";

let fakeBatchFetchResponse = {
    "Meta Data": {
        "1. Information": "Batch Stock Market Quotes",
        "2. Notes": "IEX Real-Time Price provided for free by IEX (https://iextrading.com/developer/).",
        "3. Time Zone": "US/Eastern"
    },
    "Stock Quotes": [
        {   "1. symbol": "MSFT",
            "2. price": "94.6200",
            "3. volume": "--",
            "4. timestamp": "2018-04-26 16:53:10"
        },
        {   "1. symbol": "FB",
            "2. price": "175.2700",
            "3. volume": "--",
            "4. timestamp": "2018-04-26 16:04:41"
        },
        {   "1. symbol": "AAPL",
            "2. price": "164.2300",
            "3. volume": "--",
            "4. timestamp": "2018-04-26 15:59:57"
        }
    ]
};

// let fakeServerData = {
//   stockItems: [
//     { symbol: "ABC",
//       currentValue: 123 },
//     { symbol: "DEF",
//       currentValue: 345 },
//     { symbol: "HIJK",
//       currentValue: 7 },
//     { symbol: "LOM",
//       currentValue: 1123 },
//     { symbol: "FRT",
//       currentValue: 23 }
//   ]
// }

// let testURL = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey=demo";

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // serverData: {}
    };
  }

  // componentWillMount() {
  //   // fetch(testURL)
  //   //   .then((resp) => resp.json())
  //   //   .then((data) => {
  //   //     console.log(data);
  //   // });
  //   // let data = fakeBatchFetchResponse;
  //   let batchData = fakeBatchFetchResponse["Stock Quotes"]
  //     .map((item) => {
  //       let dateTime = item["4. timestamp"].trim().split(' ');
  //       return (
  //         {
  //           symbol: item["1. symbol"],
  //           price:  item["2. price"],
  //           timestamp: {date: dateTime[0], time: dateTime[1]}
  //         }
  //       )
  //     }
  //   ); // end map((item => {...}))
  //
  //   console.log(batchData);
  //
  // } // End componentWillMount()

  componentDidMount() {
    setTimeout(() => {
      let data = fakeBatchFetchResponse;
      let metaData = data["Meta Data"];
      let sourceLabel = metaData["2. Notes"];
      let batchData = data["Stock Quotes"]
        .map((item) => {
          let dateTime = item["4. timestamp"].trim().split(' ');
          return (
            {
              symbol: item["1. symbol"],
              currentValue:  item["2. price"],
              timestamp: {date: dateTime[0], time: dateTime[1]}
            }
          )
        }
      ); // end map((item => {...}))

      console.log (batchData);

      // this.setState({serverData: fakeServerData});
      // this.setState({serverData: {stockItems: batchData, sourceLabel: data["Meta Data"].["3. Notes"]}});
      this.setState({serverData: {stockItems: batchData, sourceLabel: sourceLabel } });
    }, 1500);
  }

  addNewStockSymbol = (item) => {
    let update = this.state.serverData.stockItems.concat([{symbol: item, currentValue: "?"}]);
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
