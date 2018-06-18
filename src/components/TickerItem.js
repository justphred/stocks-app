import React from "react";
import "./TickerItem.css";

class TickerItem extends React.Component {

  itemClicked = (ev) => {
    let ti = undefined;
    ti = ev.target.className.includes("tickerItem") ? ev.target : ev.target.parentNode;
    ti.parentNode.querySelectorAll(".itemSelected")
        .forEach(i => i.classList.remove("itemSelected"));
    ti.classList.add("itemSelected");

    let symbol = ti.getAttribute("data-symbol");
    // console.log("TickerItem: symbol = " + symbol);

    this.props.getUserSelection(symbol);
  }

  render() {
    return (
      <li className={"tickerItem"}
          onClick={this.itemClicked}
          data-symbol={this.props.symbol}>
            <p >{this.props.symbol}</p>
            <p>{this.props.value}</p>
            <p style={{fontSize:".65em", fontWeight:"bold"}}>
              {this.props.timestamp.date}, {this.props.timestamp.time}
            </p>
      </li>
    )
  }
} // End component TickerItem

export default TickerItem;








//bottomline
