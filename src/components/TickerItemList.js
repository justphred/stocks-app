import React from "react";
import TickerItem from "./TickerItem";

class TickerItemList extends React.Component {
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
      <div style={{padding: ".1em",
                   border: "1px solid #fff",
                   "margin-right": "20%",
                   "margin-left": "20%"
                 }}>
        <ul>
          {this.tickerItems}
        </ul>
      </div>
    );
  }
} // End class TickerItemList

export default TickerItemList;
