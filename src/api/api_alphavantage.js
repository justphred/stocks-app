// api_alphavantage.js

let rawWeeklyData = require("../dev-data/weeklydata.js").data;

// MDN Reference On Promise constructor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

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

let alphavantageAPIKey = "S6ZCCR85WHEGSM8Z";
let baseBatchFetchUrl = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=";
// let baseDailySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
let baseWeeklySeriesFetchUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=";

//.............................................................................
let buildBatchRequestURL = (symbols) => {
  let url =  `${baseBatchFetchUrl}${symbols}&apikey=${alphavantageAPIKey}`;

  return url;
};

//.............................................................................
let buildWeeklySeriesRequestURL = (symbol) => {
  console.log("Symbol = " + symbol);

  let url = `${baseWeeklySeriesFetchUrl}${symbol}&apikey=${alphavantageAPIKey}`;

  return url;
};

//.............................................................................
let fetchChartData = (symbol) => {

  let url = buildWeeklySeriesRequestURL(symbol);

  console.log(url);

  return new Promise( (resolve, reject) => {
    fetch(url)
      .then( (resp) => resp.json())
      .then( (data) => {
        console.log("fetchChartData(): ", data);

        resolve(data);
      }
    ); // End .then( (data) => {
  });

};

//.............................................................................
let fetchBatchData = (symbols) => {

  let url = buildBatchRequestURL(symbols);
  console.log("Batch data url: ", url);

  return new Promise( (resolve, reject) => {
  //   fetch(url)
  //     .then( (resp) => resp.json())
  //     .then( (data) => {
  //       // this.extractBatchData(data);
  //       console.log("fetchBatchData(): ", data);
  //       resolve(data);
  //     }
  //   ); // End .then( (data) => {

    resolve(fakeBatchFetchResponse);
  });

} // End api_fetchBatchData()


//+++++++++++++++++++++++++++++++++++++++++++++
module.exports = {
  fetchChartData,
  fetchBatchData
}






// bottomline
