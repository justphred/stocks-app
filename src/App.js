import React, { Component } from 'react';
import './App.css';
import TickerItemList from "./components/TickerItemList";
import SearchBar from "./components/SearchBar";
import SourceCite from "./components/SourceCite";

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

let fakeUserData = {
  name: "Matt Dillon",
  symbols: ["MSFT", "FB", "AAPL"]
};

let alphavantageAPIKey = "S6ZCCR85WHEGSM8Z";

// let testURL = "https://www.alphavantage.co/query?
//                function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey=demo";

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // serverData: {}
    };
  }

  baseBatchFetchUrl = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=";

  buildBatchRequestURL = (symbols) => {
    let url =  `${this.baseBatchFetchUrl}${this.state.userData.symbols}&apikey=${alphavantageAPIKey}`;

    return url;
  };

  componentWillMount() {
    this.setState({userData: fakeUserData});
  };

  componentDidMount() {
    let url = this.buildBatchRequestURL();
    console.log(url);

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

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

        this.setState(
          {
            serverData: {
              stockItems: batchData,
              sourceLabel: sourceLabel
            }
          }
        );
    } ); // End .then((data) => {})

  } // End componentDidMount()

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
        <SearchBar getUserInput={ this.addNewStockSymbol }/>
        <TickerItemList items={ this.state.serverData && this.state.serverData.stockItems }/>
        { this.state.serverData && this.state.serverData.sourceLabel &&
          <SourceCite citation={ this.state.serverData.sourceLabel } /> }
      </div>
    );
  }
}

export default App;

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

// componentDidMount() {
//   console.log(this.buildBatchRequestURL());
//
//   setTimeout(() => {
//     let data = fakeBatchFetchResponse;
//     let metaData = data["Meta Data"];
//     let sourceLabel = metaData["2. Notes"];
//     let batchData = data["Stock Quotes"]
//       .map((item) => {
//         let dateTime = item["4. timestamp"].trim().split(' ');
//         return (
//           {
//             symbol: item["1. symbol"],
//             currentValue:  item["2. price"],
//             timestamp: {date: dateTime[0], time: dateTime[1]}
//           }
//         )
//       }
//     ); // end map((item => {...}))
//
//     console.log (batchData);
//
//     this.setState(
//       {
//         serverData: {
//           stockItems: batchData,
//           sourceLabel: sourceLabel
//         }
//       }
//     );
//
//   }, 1500);
// } // End componentDidMount()

// bottomline
