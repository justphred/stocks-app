import React from "react";
import TickerItem from "./TickerItem";

class TickerItemList extends React.Component {
  containerStyles =  {
     display: "inline-block",
     padding: ".1em",
     border: "1px solid #778096",
     "borderRadius": ".4em"
  };

  // itemClicked = (ev) => {
  //   console.log(ev);
  // }

  render () {
    let tickerItems = [];

    if (this.props.items) {
      tickerItems = this.props.items.map( (item, ndx) => {
        return (
          <TickerItem key={item.symbol}
                      symbol={item.symbol}
                      value={item.currentValue}
                      getUserSelection={this.props.getUserSelection}/>
        );
      } );
    }

    return (
      <div style={this.containerStyles}>
        <ul>
          {tickerItems}
        </ul>
      </div>
    );
  }
} // End class TickerItemList

export default TickerItemList;
