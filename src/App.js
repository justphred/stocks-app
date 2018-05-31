import React, { Component } from 'react';
import './App.css';
import TickerItemList from "./components/TickerItemList";
import SearchBar from "./components/SearchBar";
import SourceCite from "./components/SourceCite";
import SelectedItemOptions from "./components/SelectedItemOptions";
import ChartComponent from "./components/ChartComponent";
import AV_api from "./api/api_alphavantage";

let rawWeeklyData = require("./dev-data/weeklydata.js").data;

//==============================================================================
// let testURL = "https://www.alphavantage.co/query?
//                function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey=demo";
//https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey=S6ZCCR85WHEGSM8Z
// https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=demo
//https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=S6ZCCR85WHEGSM8Z
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
// baseWeeklySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=";
// baseDailySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
//==============================================================================

let fakeUserData = {
  name: "Matt Dillon",
  symbols: ["MSFT", "FB", "AAPL"]
};

// let alphavantageAPIKey = "S6ZCCR85WHEGSM8Z";
//
// //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// // $-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$
// let api_fetchChartData = (url) => {
//   console.log(url);
//
//   return new Promise( (resolve, reject) => {
//     fetch(url)
//       .then( (resp) => resp.json())
//       .then( (data) => {
//         console.log("fetchChartData(): ", data);
//         // this.extractChartData(data);
//         resolve(data);
//       }
//     ); // End .then( (data) => {
//   });
//
//   // this.extractChartData(rawWeeklyData);
// };
// // $-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$
//
// // $-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$
// let api_fetchBatchData = (url) => {
//
//   return new Promise( (resolve, reject) => {
//     fetch(url)
//       .then( (resp) => resp.json())
//       .then( (data) => {
//         // this.extractBatchData(data);
//         console.log("fetchBatchData(): ", data);
//         resolve(data);
//       }
//     ); // End .then( (data) => {
//
//     // let data = fakeBatchFetchResponse;
//     // this.extractBatchData(data);
//   });
//
// } // End api_fetchBatchData()
// // $-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$


class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // serverData: {}
      // chartData: {}
    };
  }

  // baseBatchFetchUrl = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=";
  // baseDailySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  // baseWeeklySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=";
  //
  // buildBatchRequestURL = (symbols) => {
  //   let url =  `${this.baseBatchFetchUrl}${this.state.userData.symbols}&apikey=${alphavantageAPIKey}`;
  //
  //   return url;
  // };
  //
  // buildWeeklySeriesRequestURL = (symbol) => {
  //   console.log("Symbol = " + symbol);
  //
  //   let url = `${this.baseWeeklySeriesFetchUrl}${symbol}&apikey=${alphavantageAPIKey}`;
  //
  //   return url;
  // };

  // ----------------------------------------------------------------------------
  extractBatchData = (apiData) => {
    let metaData = apiData["Meta Data"];
    let sourceLabel = metaData["2. Notes"];
    let batchData = apiData["Stock Quotes"]
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
  }

  //---------------------------------------------------------------------
  componentWillMount() {
    this.setState({userData: fakeUserData});
  };

  //---------------------------------------------------------------------
  componentDidMount() {
    // let url = this.buildBatchRequestURL();

    // this.state.userData.symbols
    AV_api.fetchBatchData(this.state.userData.symbols).then((data) => {
      this.extractBatchData(data);
    });

  } // End componentDidMount()

  //---------------------------------------------------------------------
  addNewStockSymbol = (item) => {
    let update = this.state.userData;
    update.symbols.push(item);
    this.setState({userData: update});
  }

  //---------------------------------------------------------------------
  getSelectedItem = (targetItem) => {
    console.log ("getSelectedItem():" + targetItem);
    this.setState({selectedItem: targetItem});
  }

  //---------------------------------------------------------------------
  extractChartData = (rawData) => {
    let dates   = [];
    let highs   = [];
    let lows    = [];
    let closings  = [];
    let volumes = [];

    let errorMsg = rawData["Error Message"];

    if(!errorMsg) {
      let wklyData = rawData["Weekly Time Series"];
      // The key for a weekly data object has the form "2018-04-26"
      let wklyKeys =  Object.keys(wklyData);
      // wklyKeys.forEach((key, indx) => {
      wklyKeys.some((key, indx) => {
        let dateArray = key.trim().split("-");
        let yrChars = dateArray[0];
        let yr10s = [yrChars[2], yrChars[3]];
        let betterDateArray = [dateArray[1], dateArray[2], yr10s.join("")];
        let betterDateStr = betterDateArray.join("/");
        let item = wklyData[key];
        dates.push(betterDateStr);
        highs.push(item["2. high"]);
        lows.push(item["3. low"]);
        closings.push(item["4. close"]);
        volumes.push(item["5. volume"]);

        // When the function invoked by array.some() (the one we're executing
        // here) returns a truthy value, array.some() stops processing the array
        // its operating on.  So, this statment stops the accumulation of date
        // from the data that was returned by the server.
        return indx >= 25;
      });

      this.setState(
        {
          chartData: {dates, highs, lows, closings, volumes}
        } );
    } // End if(!errorMsg) {}
    else {
      // There was an error fetching data for the target symbol.
      // Assume that the symbol was un recognized.
    }

  }

  //---------------------------------------------------------------------
  operateOnSelectedItem = (action) => {
    // action can be "chart", "delete" or "edit"

    // We won't do anything here if the user hasn't actually selected
    // an item to do something to.
    if(this.state.selectedItem) {
      if (action === "chart") {
        // If there is already a chart displayed, let's cause it to be removed.
        if(this.state.chartData) {
          this.setState({chartData : undefined});
        }

        // let myUrl = this.buildWeeklySeriesRequestURL(this.state.selectedItem);

        AV_api.fetchChartData(this.state.selectedItem).then( (data) => {
          this.extractChartData(data);
        });
      }
      else if (action === "delete") {
        // Update the serverData list of stock symbols
        let newStockItems = this.state.serverData.stockItems.filter( (item) => {
          return item.symbol !== this.state.selectedItem
        });
        let serverData2 = this.state.serverData;
        serverData2.stockItems = newStockItems;

        // Update the user's list of stock symbols
        let newUserSymbols = this.state.userData.symbols.filter( (symb) => {
          return symb !== this.state.selectedItem;
        });
        let userData2 = this.state.userData;
        userData2.symbols = newUserSymbols;

        this.setState({
          serverData: serverData2,
          userData: userData2,
          selectedItem: undefined});
      }
      else if (action === "edit") {

      }
    }
    else {
      console.log("No item selected");
    }
  } // End operateOnSelectedItem = (action) => {}

  //---------------------------------------------------------------------
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reactive Stocks Status</h1>
        </header>
        <SearchBar getUserInput={ this.addNewStockSymbol }/>

        <TickerItemList getUserSelection={ this.getSelectedItem }
            items={ this.state.serverData && this.state.serverData.stockItems }/>

        <SelectedItemOptions selected={this.state.selectedItem} handleOptions={this.operateOnSelectedItem} />

        { this.state.chartData &&
          <ChartComponent data={this.state.chartData}
            symbol={this.state.selectedItem}
            chartType={"Weekly Closings"}
            ></ChartComponent> }

        { this.state.serverData && this.state.serverData.sourceLabel &&
            <SourceCite citation={ this.state.serverData.sourceLabel } /> }
      </div>
    );
  }
}

export default App;

// bottomline ------------------------------------------------------------
