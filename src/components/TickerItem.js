import React from "react";

class TickerItem extends React.Component {
  myStyles = {display: "inline-block",
              "paddingTop":".25em",
              "paddingBottom":".25em",
              "paddingRight":"1em",
              "paddingLeft":"1em",
              margin: ".5em",
              "backgroundColor": "#c5cce2",
              "borderRadius": ".45em",
              border: "1px solid #343b49"
            }

  itemClicked = (ev) => {
    let ti = undefined;
    ti = ev.target.className.includes("TickerItem") ? ev.target : ev.target.parentNode;
    ti.parentNode.querySelectorAll(".TickerItem-selected")
        .forEach(i => i.classList.remove("TickerItem-selected"));
    ti.classList.add("TickerItem-selected");
    
    let symbol = ti.getAttribute("data-symbol");
    // console.log("TickerItem: symbol = " + symbol);

    this.props.getUserSelection(symbol);
  }

  render() {
    return (
      <li className={"TickerItem"}
          style={this.myStyles}
          onClick={this.itemClicked}
          data-symbol={this.props.symbol}>
            <p >{this.props.symbol}</p>
            <p>{this.props.value}</p>
      </li>
    )
  }
} // End component TickerItem

export default TickerItem;








//bottomline
