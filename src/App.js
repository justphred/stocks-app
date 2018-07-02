import React, { Component } from 'react';
import './App.css';
import TickerItemList from "./components/TickerItemList";
import SearchBar from "./components/SearchBar";
import SourceCite from "./components/SourceCite";
import SelectedItemOptions from "./components/SelectedItemOptions";
import ChartComponent from "./components/ChartComponent";
import MessagePane from "./components/MessagePane";
import AV_api from "./api/api_alphavantage";


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
  // symbols: ["MSFT", "FB", "AAPL"]
  symbols: ["GE", "BAC", "NOC"]
};

// ----------------------------------------------------------------------------
// let reformatRawBatchTimestamp = (dateStr) => {
//   let dateTime = dateStr.split(' ');    // ["2018-04-26", "15:59:57"]
//   let dateArray = dateTime[0].split('-'); // ['2018', "04", "26"]
//   let yrArray = dateArray[0].split('');   // ['2','0','1','8']
//   let yr10s = [yrArray[2],yrArray[3]];    // ['1','8']
//   let betterDateStr = [dateArray[1], dateArray[2], yr10s.join('')].join('/'); // "04/26/18"
//   let betterTimestamp = [dateTime[1], betterDateStr].join(' '); // "15:59:57 04/26/18"
//   // console.log (betterTimestamp);
//   return betterTimestamp;
// }
let reformatRawBatchDateStr = (dateStr) => {
  let dateArray = dateStr.split('-'); // ['2018', "04", "26"]
  let yrArray = dateArray[0].split('');   // ['2','0','1','8']
  let yr10s = [yrArray[2],yrArray[3]];    // ['1','8']
  let betterDateStr = [dateArray[1], dateArray[2], yr10s.join('')].join('/'); // "04/26/18"

  return betterDateStr;
}

// =============================================================================
class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // serverData: {}
      // chartData: {}
      statusMessage: ""
    };
  }

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
            timestamp: {date: reformatRawBatchDateStr(dateTime[0]), time: dateTime[1]}
          }
        )
      }
    ); // end map((item => {...}))

    console.log (batchData);

    return({
      stockItems: batchData,
      sourceLabel: sourceLabel
    });
  }

  //---------------------------------------------------------------------
  componentWillMount() {
    this.setState({userData: fakeUserData});
  };

  //---------------------------------------------------------------------
  componentDidMount() {
    // let url = this.buildBatchRequestURL();

    AV_api.fetchBatchData(this.state.userData.symbols).then((data) => {
      let extractedData = this.extractBatchData(data);

      if(extractedData.stockItems && (extractedData.stockItems.length) > 0) {
        this.setState(
          {
            serverData: extractedData,
            selectedItem: undefined
          }
        );
      }
    }); // End AV_api.fetchBatchData(this.state.userData.symbols).then((data) => {

  } // End componentDidMount()

  //---------------------------------------------------------------------
  addNewStockSymbol = (newItem) => {

    newItem = newItem.toUpperCase();

    this.setState({selectedItem: undefined});

    // Make sure that the user didn't just try to "add" a stock/symbol
    // that's already in the list.
    let itemIsRepeat = this.state.serverData.stockItems.filter( (currItem) => {

      return currItem.symbol === newItem;
    });

    // console.log("newItem: " + newItem + " type = " + typeof newItem);
    // console.log("Is a copy: " + itemIsRepeat);

    if(itemIsRepeat.length === 0) {
      // A new symbol has been entered by user

      // Make sure that the user has entered a valid symbol before we add it.
      AV_api.fetchBatchData(newItem).then((data) => {
        let extractedData = this.extractBatchData(data);

        if(extractedData.stockItems && (extractedData.stockItems.length) > 0) {
          let tempStockItems =
            this.state.serverData.stockItems.concat(extractedData.stockItems);
          let newServerData = Object.assign({}, this.state.serverData);
          newServerData.stockItems = tempStockItems;

          let newUserData = this.state.userData;
          newUserData.symbols.push(newItem);

          this.setState(
            { serverData: newServerData,
              userData: newUserData
            }
          );

          this.setState({statusMessage: ""});
        } else {
          // The user just tried to add a stock that doesn't exist.
          this.setState({statusMessage: `${newItem} is not a recognized stock symbol`})
        }
      }); // End AV_api.fetchBatchData(this.state.userData.symbols).then((data) => {

    } else {
      // The user just tried to add another copy of a stock/symbol that is already in his/her list
      this.setState({statusMessage: `${newItem} is already in your list`})
    }

  } // End addNewStockSymbol()

  //---------------------------------------------------------------------
  getUserSelection = (targetItem) => {
    console.log ("getUserSelection():" + targetItem);
    
    this.setState({
      selectedItem: targetItem
    });

    this.setState({statusMessage: ""});
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
        // its operating on.  So, this statment stops the accumulation of data
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

  } // End extractChartData()

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

      this.setState({statusMessage: ""});
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

        <TickerItemList getUserSelection={ this.getUserSelection }
            items={ this.state.serverData && this.state.serverData.stockItems }/>

        <SelectedItemOptions selected={this.state.selectedItem} handleOptions={this.operateOnSelectedItem} />

        { this.state.statusMessage && (this.state.statusMessage !== "") &&
          <MessagePane message={this.state.statusMessage}></MessagePane>
        }

        { this.state.chartData &&
          <ChartComponent data={this.state.chartData}
            symbol={this.state.selectedItem}
            chartType={"Weekly Closing"}
            ></ChartComponent> }

        { this.state.serverData && this.state.serverData.sourceLabel &&
            <SourceCite citation={ this.state.serverData.sourceLabel } /> }
      </div>
    );
  }
}

export default App;

// bottomline ------------------------------------------------------------
