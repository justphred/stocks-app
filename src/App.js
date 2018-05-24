import React, { Component } from 'react';
import './App.css';
import TickerItemList from "./components/TickerItemList";
import SearchBar from "./components/SearchBar";
import SourceCite from "./components/SourceCite";
import SelectedItemOptions from "./components/SelectedItemOptions";
import ChartComponent from "./components/ChartComponent";

let rawWeeklyData = require("./dev-data/weeklydata.js").data;

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
// https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=demo
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
// baseWeeklySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=";
// baseDailySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // serverData: {}
      // chartData: {}
    };
  }

  baseBatchFetchUrl = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=";
  baseDailySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  baseWeeklySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=";

  buildBatchRequestURL = (symbols) => {
    let url =  `${this.baseBatchFetchUrl}${this.state.userData.symbols}&apikey=${alphavantageAPIKey}`;

    return url;
  };

  buildWeeklySeriesRequestURL = (symbol) => {
    console.log("Symbol = " + symbol);

    let url = `${this.baseWeeklySeriesFetchUrl}${symbol}&apikey=${alphavantageAPIKey}`;

    return url;
  };

  fetchBatchData = (url) => {
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

    this.setState(
      {
        serverData: {
          stockItems: batchData,
          sourceLabel: sourceLabel
        },

        selectedItem: undefined
      }
    );
  } // End fetchBatchData()

  //---------------------------------------------------------------------
  componentWillMount() {
    this.setState({userData: fakeUserData});
  };
  //---------------------------------------------------------------------
  componentDidMount() {
    let url = this.buildBatchRequestURL();
    // console.log(url);

    this.fetchBatchData(url);

  } // End componentDidMount()
  //---------------------------------------------------------------------
  addNewStockSymbol = (item) => {
    let update = this.state.serverData.stockItems.concat([{symbol: item, currentValue: "?"}]);
    this.setState({serverData: {stockItems: update}});
  }
  //---------------------------------------------------------------------
  getSelectedItem = (targetItem) => {
    console.log (targetItem);

    this.setState({selectedItem: targetItem});
  }
  //---------------------------------------------------------------------
  extractChartData = (rawData) => {
    let dates   = [];
    let highs   = [];
    let lows    = [];
    let closes  = [];
    let volumes = [];

    let wklyData = rawData["Weekly Time Series"];
    let wklyKeys =  Object.keys(wklyData);
    wklyKeys.forEach((key, indx) => {
      let item = wklyData[key];
      dates.push(key);
      highs.push(item["2. high"]);
      lows.push(item["3. low"]);
      closes.push(item["4. close"]);
      volumes.push(item["5. volume"]);
    });

    this.setState({chartData: {dates, highs, lows, closes, volumes} } );
  }
  //---------------------------------------------------------------------
  fetchChartData = (symbol) => {
    let url = this.buildWeeklySeriesRequestURL(symbol);
    console.log(url);

    // fetch(url)
    //   .then( (resp) => resp.json())
    //   .then( (data) => {
    //     console.log(data);
    //     this.extractChartData(data);
    //   }
    // ); // End .then( (data) => {

    this.extractChartData(rawWeeklyData);
  }
  //---------------------------------------------------------------------
  operateOnSelectedItem = (action) => {
    // action can be "chart", "delete" or "edit"
    if(this.state.selectedItem) {
      if (action === "chart") {
        this.fetchChartData(this.state.selectedItem);
      }
      else if (action === "delete") {

      }
      else if (action === "edit") {

      }
    }
    else {
      console.log("No item selected");
    }
  }
  //---------------------------------------------------------------------
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reactive Stocks</h1>
        </header>
        <SearchBar getUserInput={ this.addNewStockSymbol }/>

        <TickerItemList getUserSelection={ this.getSelectedItem }
            items={ this.state.serverData && this.state.serverData.stockItems }/>

        <SelectedItemOptions selected={this.state.selectedItem} handleOptions={this.operateOnSelectedItem} />

        { this.state.serverData && this.state.serverData.sourceLabel &&
            <SourceCite citation={ this.state.serverData.sourceLabel } /> }
        { this.state.chartData &&
          <ChartComponent data={this.state.chartData}></ChartComponent>
          // <div>{`CHART DATA IS HERE ${this.state.chartData.dates}`}</div>
        }
      </div>
    );
  }
}

export default App;

// bottomline
