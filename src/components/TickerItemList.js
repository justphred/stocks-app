import React from "react";
import TickerItem from "./TickerItem";
import "./TickerItemList.css";

class TickerItemList extends React.Component {

  render () {
    let tickerItems = [];

    if (this.props.items) {
      tickerItems = this.props.items.map( (item, ndx) => {
        return (
          <TickerItem key={item.symbol}
                      symbol={item.symbol}
                      value={item.currentValue}
                      timestamp={item.timestamp}
                      getUserSelection={this.props.getUserSelection}/>
        );
      } );
    }

    return (
      <div className="til-container">
        <ul>
          {tickerItems}
        </ul>
      </div>
    );
  }
} // End class TickerItemList

export default TickerItemList;

// bottomline
